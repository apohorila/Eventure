import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import styles from "./CreateProfile.module.css"
import { useCategories } from '../../context/CategoryContext';
import { useRegistration } from "../../context/RegistrationContext";
import InterestCheckbox from "../../components/InterestCheckbox/InterestCheckbox";

export default function CreateProfile(){
    const {registrationData} = useRegistration()
    console.log("Дані користувача з контексту:", registrationData);
    const navigate = useNavigate()
    const {categories, loading} = useCategories();
     const [profileData, setProfileData] = useState({
        location: '',
        gender: '',
        age: '',
        bio: '',
    })
    const [previewPic, setPreviewPic] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

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
            setSelectedFile(file)
            const imageUrl= URL.createObjectURL(file)
            setPreviewPic(imageUrl)
        }
    }
    const handleAddLink = (e) => {
        
        if (currentLink.trim() !== '') {
            const updatedLinks = [...socialLinks, currentLink]
            setSocialLinks(updatedLinks)
            setCurrentLink('')
        }
    };

    const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = socialLinks.filter((_, index) => index !== indexToRemove);
    setSocialLinks(updatedLinks);
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

    if (selectedInterests.length === 0) {
        alert("Будь ласка, оберіть хоча б один інтерес!"); 
        return; 
    }
    const formData = new FormData()
    if (selectedFile) {
        formData.append('file',selectedFile)
    }
    const dataForServer = {
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        email: registrationData.email,
        location: profileData.location,
        gender: profileData.gender,
        bio: profileData.bio,
        age: profileData.age,
        interests: selectedInterests, 
        socials: socialLinks          
    };

    formData.append('data', new Blob([JSON.stringify(dataForServer)], {
        type: 'application/json'
    }));
    
    try {
        const response = await fetch("http://localhost:8082/api/v1/profiles", {
            method: 'POST',
            body:formData
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
                    <label htmlFor="city" className={styles.labelText}>Місто*</label>
                    <input type="text" id="city" name="location" value={profileData.location} placeholder="Місто" required className={styles.input} onChange={handleChange}/>
                    </div>
                    <div className={styles.genderSelector}>
                    <label htmlFor="gender" className={styles.labelText}>Стать*</label>
                    <select id="gender" name="gender" required value={profileData.gender} onChange={handleChange}  className={`${styles.genderSelect} ${styles.selectField}`} >
                        <option value="" disabled hidden>Оберіть</option>
                        <option value="female" className={styles.selectOption}>Жіноча</option>
                        <option value="male" className={styles.selectOption}>Чоловіча</option>
                        <option value="none" className={styles.selectOption}>Не хочу вказувати</option>
                    </select>
                    </div>
                    <div className={styles.ageInput}>
                        <label htmlFor="age" className={styles.labelText} required >Вік*</label>
                        <input type="number" id="age" name="age" value={profileData.age} placeholder="Ваш вік" className={styles.input} onChange={handleChange}/>
                    </div>
                    </div>
                </div>
            </fieldset>
            <fieldset className={`${styles.aboutLinksContainer} ${styles.fieldset}`}>
                <div className={styles.aboutMe}>
                <label htmlFor="about-me" className={styles.labelText}>Про себе</label>
                <textarea id="about-me" placeholder="Про себе" name="bio" value={profileData.bio} onChange={handleChange} className={styles.aboutMeField} maxlenght={500}></textarea> 
                </div>
                <div className={styles.socials}>
                <label htmlFor="socials" className={styles.labelText}>Соціальні мережі*</label>
                <input type="url" id="socials" placeholder="Посилання на соцмережі" value={currentLink}  onChange={(e) => {setCurrentLink(e.target.value);}}  className={styles.socialsInput}/>
                <div className={styles.linksList}>
                        {socialLinks.map((link, index) => (
                            <div key={index} className={styles.linkItem}>
                                <span className={styles.linkText}>{link}</span>
                                <button 
                                    type="button" 
                                    className={styles.removeLinkBtn} 
                                    onClick={() => handleRemoveLink(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                <button type="button" className={styles.addMoreButton} onClick={handleAddLink}>+ додати ще одне</button>
                </div>
            </fieldset>
            <fieldset className={`${styles.selectInterestsSection} ${styles.fieldset}`}>
            </fieldset>
            <fieldset className={`${styles.selectCategories} ${styles.fieldset}`}>
                <h2 className={styles.title}>Обери інтереси*</h2>
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