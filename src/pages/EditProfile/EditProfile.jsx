import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './EditProfile.module.css';
import InterestCheckbox from '../../components/InterestCheckbox/InterestCheckbox';
import { CategoryProvider, useCategories } from '../../context/CategoryContext';

const EditProfile = () => {
    const {categories} = useCategories()
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(location.state?.initialData || {
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        location: '',
        gender: '',
        age: '',
        social_media_links: [],
        interests_ids: []
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(formData.photoUrl || '');
    const [selectedInterests, setSelectedInterests] = useState(formData.interests_ids)
    const [socialLinks, setSocialLinks] = useState(formData.social_media_links)
    const [currentLink, setCurrentLink] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

     const toggleInterest = (id) => {
    setSelectedInterests(prev => 
        prev.includes(id) 
            ? prev.filter(itemId => itemId !== id) 
            : [...prev, id]                        
    )
}
 const handleAddLink = (e) => {
        if (currentLink.trim() !== '') {
            const updatedLinks = [...socialLinks, currentLink]
            setSocialLinks(updatedLinks)
            // setFormData({...formData, socialLinks})
            setCurrentLink('')
        }
    };

    const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = socialLinks.filter((_, index) => index !== indexToRemove);
    setSocialLinks(updatedLinks);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const dataToSend = new FormData();

    //     const finalProfileData = {
    //     ...formData, // беремо все зі стейту (firstName, location, bio...)
    //     social_media_links: socialLinks, // додаємо масив лінків
    //     interests_ids: selectedInterests // додаємо масив інтересів
    // };
        
    //     if (selectedFile) {
    //         dataToSend.append('file', selectedFile);
    //     }

    //     dataToSend.append('data', new Blob([JSON.stringify(formData)], { type: 'application/json' }));

    //     try {
    //         const response = await fetch(`http://localhost:8082/api/v1/profiles/1`, {
    //             method: 'PUT',
    //             body: dataToSend
    //         });

    //         if (response.ok) {
    //             navigate('/profile'); 
    //         }
    //     } catch (error) {
    //         console.error("Помилка оновлення:", error);
    //     }
    // };
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Збираємо все в один об'єкт
    const finalData = { 
        ...formData, 
        social_media_links: socialLinks,
        interests_ids: selectedInterests 
    };

    try {
        const response = await fetch(`http://localhost:8082/api/v1/profiles/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Важливо для Mirage!
            },
            body: JSON.stringify(finalData)
        });

        if (response.ok) {
            console.log("Профіль оновлено в Mirage");
            navigate('/profile'); 
        }
    } catch (error) {
        console.error("Помилка:", error);
    }
};

    return (
        <main className={styles.mainPage}>
            <form onSubmit={handleSubmit} className={styles.editForm}>
                <section className={styles.profileInfo}>
                    <div className={styles.editPic}>
                    <div className={styles.picContainer}>
                        <img src={previewUrl || `src/assets/icons/user.png`} alt="Preview" className={styles.avatarPreview} />
                        </div>
                        <label className={styles.fileLabel}>
                            Змінити фото
                            <input type="file" onChange={handleFileChange} hidden accept="image/*" />
                        </label>
                        </div>
                    

                    <div className={`${styles.infoContainer} ${styles.container}`}>
                        <div className={styles.row}>
                            <label htmlFor='firstName' className={styles.label}>Ім'я*
                            <input name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Ім'я" className={styles.input} />
                            </label>
                            <label htmlFor='lastName' className={styles.label}>Прізвище*
                            <input name="lastName" id="lastName"value={formData.lastName} onChange={handleChange} placeholder="Прізвище" className={styles.input}/>
                            </label>
                        </div>

                        <div className={`${styles.mailAbout} ${styles.container}`}>
                            <label htmlFor='email' className={styles.label}>Електронна пошта*
                            <input name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" className={styles.input} />
                            </label>
                            <span className={styles.label}>Про себе:</span>
                            <textarea 
                                name="bio" 
                                value={formData.bio} 
                                onChange={handleChange} 
                                className={styles.textarea}
                            />
                        </div>

                        <div className={`${styles.cityGenderAge} ${styles.container}`}>
                            <div className={`${styles.cityGender} ${styles.container}`}>
                                <label htmlFor='location' className={styles.label}>Місто*
                                <input name="location" id="location" value={formData.location} onChange={handleChange} placeholder="Місто" className={styles.input} />
                                </label>
                                <label htmlFor='gender' className={styles.label}>Стать*
                                <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className={`${styles.select} ${styles.selectField}`}>
                                    <option value="">Оберіть стать</option>
                                    <option value="MALE">Чоловік</option>
                                    <option value="FEMALE">Жінка</option>
                                    <option value="OTHER">Інше</option>
                                </select>
                                </label>
                            </div>
                            <label htmlFor='age' className={styles.label}>Вік*
                            <input name="age" id="age"type="number" value={formData.age} onChange={handleChange} placeholder="Вік" className={styles.input} />
                            </label>
                            <label htmlFor='link' className={styles.label}>Соцмережі*
                            <input  type ="url" name="socials" id="link" value={currentLink}  onChange={(e) => {setCurrentLink(e.target.value);}} placeholder="Соцмережі" className={styles.input} />
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
                            </label>
                            <button type="button" className={styles.addMoreButton} onClick={handleAddLink} >+ додати ще одне</button>
                        </div>
                        <div className={styles.interests}>
                            <h3>Інтереси*</h3>
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
                        </div>

                        <div className={styles.buttonsContainer}>
                            <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>Скасувати</button>
                            <button type="submit" className={styles.buttonLink}>Зберегти зміни</button>
                        </div>
                        
                    </div>
                </section>
            </form>
        </main>
    );
};

export default EditProfile;