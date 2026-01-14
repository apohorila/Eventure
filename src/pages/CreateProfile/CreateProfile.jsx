import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import styles from "./CreateProfile.module.css"
import { useCategories } from '../../context/CategoryContext';
import InterestCheckbox from "../../components/InterestCheckbox/InterestCheckbox";

export default function CreateProfile(){
    const navigate = useNavigate()
    const {categories, loading} = useCategories();
     const [profileData, setProfileData] = useState({
        city: '',
        gender: '',
        aboutMe: ''
    })
    const [previewPic, setPreviewPic] = useState(null)

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [socialLinks, setSocialLinks] = useState([])
    const [currentLink, setCurrentLink] = useState('')
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')){
            const imageUrl= URL.createObjectURL(file)
            setPreviewPic(imageUrl)
        }
    }
    const handleAddLink = () => {
        if (currentLink.trim()) {
            setSocialLinks([...socialLinks, currentLink]);
            setCurrentLink(''); 
        }
    };
    const toggleInterest = (id) => {
    setSelectedInterests(prev => 
        prev.includes(id) 
            ? prev.filter(itemId => itemId !== id) 
            : [...prev, id]                        
    );
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForServer = {
        city: profileData.city,
        gender: profileData.gender,
        about: profileData.aboutMe,
        interests: selectedInterests, 
        socials: socialLinks          
    };

    // const data = new FormData()
    // data.append('city', profileData.city)
    // data.append('gender',profileData.gender)
    // data.append('aboutMe', profileData.aboutMe)

    // if (file)
    //      data.append('profilePhoto',file)
    // selectedInterests.forEach(id=>data.append('interets', id))
    // socialLinks.forEach(link=>data.append('socials',link))

    try {
        const response = await fetch("http://localhost:8082/api/v1/profiles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForServer)
        })
        if (response.ok) {
            const result = await response.json();
            console.log("Сервер повернув:", result);
            navigate("/profile")
        }
    } catch(err){
        console.error("Error",err)
    }
}
    return (
       <section>
        <form className={styles.formContainer} onSubmit={handleSubmit} >
            <h2 className={styles.title}>Додай інформацію про себе</h2>
            <fieldset className={`${styles.photoSelectors} ${styles.fieldset}`}>
                <div className={styles.photoSelectorsContainer}>
                    <label htmlFor="photo-upload">
                         <div className={styles.photoPlaceholder}>
                            {previewPic ? (<img src={previewPic} alt="picture" className={styles.userPic}/>):
                            (
                            <>
                            <img src="src/assets/icons/user.png" alt="" className={styles.userIcon}/>
                            <span className={styles.photoPlaceholderSpan}>Додати фото</span>
                            </>
                        )}
                        </div>
                        <input type="file" id="photo-upload" accept="image/*" style={{display: "none"}} onChange={handleFileChange} />
                    </label>
                
                <div className={styles.selectorsContainer}>
                    <div className={styles.citySelector}>
                    <label htmlFor="city" className={styles.labelText}>Місто</label>
                    <select id="city" name="city" value={profileData.city} required className={`${styles.citySelect} ${styles.selectField}`} onChange={handleChange}  >
                        <option value="" disabled  hidden >Оберіть*</option>
                        <option value="kyiv" className={styles.selectOption}>Київ</option>
                        <option value="lviv" className={styles.selectOption}>Львів</option>
                    </select>
                    </div>
                    <div className={styles.genderSelector}>
                    <label htmlFor="gender" className={styles.labelText}>Стать</label>
                    <select id="gender" name="gender" required value={profileData.gender} onChange={handleChange}  className={`${styles.genderSelect} ${styles.selectField}`} >
                        <option value="" disabled hidden>Оберіть*</option>
                        <option value="female" className={styles.selectOption}>Жіноча</option>
                        <option value="male" className={styles.selectOption}>Чоловіча</option>
                        <option value="none" className={styles.selectOption}>Не хочу вказувати</option>
                    </select>
                    </div>
                    </div>
                </div>
            </fieldset>
            <fieldset className={`${styles.aboutLinksContainer} ${styles.fieldset}`}>
                <div className={styles.aboutMe}>
                <label htmlFor="about-me" className={styles.labelText}>Про себе</label>
                <textarea id="about-me" placeholder="Про себе" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} className={styles.aboutMeField}></textarea> 
                </div>
                <div className={styles.socials}>
                <label htmlFor="socials" className={styles.labelText}>Соціальні мережі</label>
                <input type="url" id="socials" placeholder="Посилання на соц. мережі"  onChange={handleChange} required className={styles.socialsInput}/>
                <button type="button" className={styles.addMoreButton} onClick={handleAddLink}>+ додати ще одне</button>
                </div>
            </fieldset>
            <fieldset className={`${styles.selectInterestsSection} ${styles.fieldset}`}>
            </fieldset>
            <fieldset className={`${styles.selectCategories} ${styles.fieldset}`}>
                <h2 className={styles.title}>Обери інтереси</h2>
                <div className={styles.interestsContainer}>
                        {categories.map(category=>(
                            <InterestCheckbox
                            key={category.id}
                            category={category}
                            isSelected={selectedInterests.includes(category.id)}
                            onToggle={toggleInterest}
                            />
                        ))}
                </div>
            </fieldset>
            <button type="submit" className={styles.buttonLink}>Створити профіль</button>

        </form>
       </section>
    )
}