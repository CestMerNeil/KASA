'use client';

import AdImages from "@/components/AdImages";
import ListCard from "@/components/ListCard";
import {useState, useEffect} from "react";
import {useData} from "@/components/DataContext";

export default function Home() {
    const products = useData().products;

    return (
        <div>
            <AdImages/>
            <div className="flex flex-col items-center min-h-screen bg-base-200 p-1 pt-2">
                <div className="card w-[90%] max-w-none shadow-xl bg-base-100 p-6">
                    <ListCard
                        type="all"
                        products={products}
                    />
                </div>
            </div>
        </div>
    );
}
