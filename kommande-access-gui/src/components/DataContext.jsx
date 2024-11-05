'use client';

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        fetch('/api/data', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <DataContext.Provider value={{ products }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}