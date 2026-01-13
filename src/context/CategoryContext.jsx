import React, { createContext, useState, useEffect, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8082/api/v1/categories");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Помилка завантаження категорій:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};


export const useCategories = () => useContext(CategoryContext);