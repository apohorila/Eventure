import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProfile.module.css";
import { useCategories } from "../../context/CategoryContext";
import { useAuth } from "../../context/AuthContext";
import InterestCheckbox from "../../components/InterestCheckbox/InterestCheckbox";

const MAXAGE = 100
const MINAGE = 16

const MINCITY = 5
const MAXCITY = 27

export default function CreateProfile(){
    const navigate = useNavigate()
    const {categories} = useCategories();
    const { user } = useAuth();
  
    useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
    }, [navigate]);

    const [profileData, setProfileData] = useState({
        location: '',
        gender: '',
        age: '',
        bio: '',
    })

    const [error, setError] = useState(null)
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
            setCurrentLink(' ')
        }
    };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemoveLink = (indexToRemove) => {
    setSocialLinks((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (selectedInterests.length === 0) {
        setError("Будь ласка, оберіть хоча б один інтерес!"); 
        return; 
    }

    if(!profileData.age || !profileData.location || !profileData.gender || !currentLink){
        setError("Будь ласка, заповніть всі обов'язкові поля!")
        return
    }

    if (!user || !user.id) {
      alert("Помилка авторизації. Спробуйте увійти знову.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const socialNetworksMap = {};
    socialLinks.forEach((link, index) => {
      socialNetworksMap[`link_${index}`] = link;
    });

    const dataForServer = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",

      location: profileData.location,
      gender: profileData.gender,
      bio: profileData.bio,
      age: parseInt(profileData.age),
      interests: selectedInterests,

      socialNetworks: socialNetworksMap,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(dataForServer)], {
        type: "application/json",
      }),
    );

    try {
      const token = sessionStorage.getItem("access_token");
      const response = await fetch("http://localhost:8082/api/v1/profiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Profile created:", result);
        navigate("/profile");
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(`Помилка: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      alert("Помилка з'єднання з сервером");
    } finally {
      setIsSubmitting(false);
    }
  };
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
                            <img src="../assets/icons/user.png" alt="" className={styles.userIcon}/>
                            <span className={styles.photoPlaceholderSpan}>Додати фото</span>
                            </>
                        )}
                        </div>
                        <input type="file" id="photo-upload" accept="image/*" style={{display: "none"}} onChange={handleFileChange} />
                    </label>
                
                <div className={styles.selectorsContainer}>
                    <div className={styles.citySelector}>
                    <label htmlFor="city" className={styles.labelText} >Місто*</label>
                    <input type="text" id="city" name="location" value={profileData.location} placeholder="Місто" required className={styles.input} onChange={handleChange} maxLength={MAXCITY} />
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
                        <input type="number" id="age" name="age" value={profileData.age} min={MINAGE} max={MAXAGE} placeholder="Ваш вік" className={styles.input} onChange={handleChange}/>
                    </div>
                    </div>
                </div>
            </fieldset>
            <fieldset className={`${styles.aboutLinksContainer} ${styles.fieldset}`}>
                <div className={styles.aboutMe}>
                <label htmlFor="about-me" className={styles.labelText}>Про себе</label>
                <textarea id="about-me" placeholder="Про себе" name="bio" value={profileData.bio} 
                onChange={(e) => {
                 handleChange(e);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
                }} 
                className={styles.aboutMeField} 
                maxlenght={500}>
                    </textarea> 
                <span className={styles.helper}>
                    {profileData.bio.length}/500
                </span>
                </div>
                <div className={styles.socials}>
                <label htmlFor="socials" className={styles.labelText}>Соціальні мережі*</label>
                <input type="url" id="socials" placeholder="Посилання на соцмережі" value={currentLink} onChange={(e) => {setCurrentLink(e.target.value);}}  className={styles.socialsInput}/>
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
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.buttonLink}>Створити профіль</button>
        </form>
       </section>
    )
}
