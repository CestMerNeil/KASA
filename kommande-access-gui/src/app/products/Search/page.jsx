'use client';

import {useState, useEffect} from "react";
import Fuse from "fuse.js";
import ListCard from "@/components/ListCard";
import {useData} from "@/components/DataContext";

export default function Search() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');

    const products = useData().products;

    const options = {
        findAllMatches: true,
        keys: ['productName', 'brand', 'description'],
        threshold: 0.5,
    };

    const fuse = new Fuse(products, options);

    const handleInput = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log('Searching for:', query);
        if (query.trim() === '') {
            setResults(products);
        } else {
            console.log('Searching: test', query);
            const results = fuse.search(query);
            console.log('Results:', results);
            setResults(results.map((res) => res.item));
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 p-2">
            <div className="card w-[90%] max-w-none shadow-xl bg-base-100 p-6">
                <h1 className="text-3xl font-semibold text-center mb-6">Product Search</h1>
                <div className="form-control mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInput}
                        placeholder="Search for products..."
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="flex justify-center mb-6">
                    <button onClick={handleSearch} className="btn btn-neutral w-full">
                        Search
                    </button>
                </div>
                <ListCard type={'all'} products={results} />
            </div>
        </div>
    );
};