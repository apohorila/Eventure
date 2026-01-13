import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import "./CreateProfile.css"
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
        <form onSubmit={handleSubmit} >
            <h2>Додай інформацію про себе</h2>
            <fieldset className="photo-selectors">
                <div className="photo-selectors-container">
                    <label htmlFor="photo-upload">
                         <div className="photo-placeholder">
                            {previewPic ? (<img src={previewPic} alt="picture" className="user-pic"/>):
                            (
                            <>
                            <img src="src/assets/icons/user.png" alt="" className="user-icon"/>
                            <span className="photo-placeholder-text">Додати фото</span>
                            </>
                        )}
                        </div>
                        <input type="file" id="photo-upload" accept="image/*" style={{display: "none"}} onChange={handleFileChange} />
                    </label>
                
                <div className="selectors-container">
                    <div className="city-selector">
                    <label htmlFor="city">Місто</label>
                    <select id="city" name="city" value={profileData.city} required className="city-select" onChange={handleChange}  >
                        <option value="" disabled  hidden >Оберіть місто*</option>
                        <option value="kyiv">Київ</option>
                        <option value="lviv">Львів</option>
                    </select>
                    </div>
                    <div className="gender-selector">
                    <label htmlFor="gender">Стать</label>
                    <select id="gender" name="gender" required value={profileData.gender} onChange={handleChange}  className="gender-select" >
                        <option value="" disabled hidden>Оберіть стать*</option>
                        <option value="female">Жіноча</option>
                        <option value="male">Чоловіча</option>
                        <option value="none">Не хочу вказувати</option>
                    </select>
                    </div>
                    </div>
                </div>
            </fieldset>
            <fieldset className="about-links-container">
                <div className="about-me">
                <label htmlFor="about-me">Про себе</label>
                <textarea id="about-me" placeholder="Про себе" name="aboutMe" value={profileData.aboutMe} onChange={handleChange}></textarea> 
                </div>
                <div className="socials">
                <label htmlFor="socials">Соціальні мережі</label>
                <input type="url" id="socials" placeholder="Посилання на соц. мережі"  onChange={handleChange} required/>
                <button type="button" className="add-more-button" onClick={handleAddLink}>+ додати ще одне</button>
                </div>
            </fieldset>
            <fieldset className="select-interests-section">
            </fieldset>
            <fieldset className="select-categories">
                <h2>Обери інтереси</h2>
                <div className="interests-container">
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
            <button type="submit" className="button-link">Створити профіль</button>

        </form>
       </section>
    )
}