import React, { createContext, useState, useContext } from 'react'

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const updateProfile = (newData) => {
        setProfileData(newData);
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch("")
            const data = res.json()
            setProfileData(data)
        } catch (error) {
            console.error("Помилка завантаження профілю", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProfileContext.Provider value={{ profileData, updateProfile, fetchProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};
export const useProfile = () => useContext(ProfileContext);