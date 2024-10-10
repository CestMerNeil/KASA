'use client';

import ListCard from "@/components/ListCard";
import {useData} from "@/components/DataContext";

export default function Accessories() {

    const products = useData().products;

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 p-2">
            <div className="card w-[90%] max-w-none shadow-xl bg-base-100 p-6">
                <ListCard
                    type="accessory"
                    products={products}
                />
            </div>
        </div>
    );
}