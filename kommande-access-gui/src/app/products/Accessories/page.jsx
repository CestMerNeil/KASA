'use client';

import ListCard from "@/components/ListCard";
import { useData } from "@/components/DataContext";

export default function Accessories() {

    const products = useData().products;

    return (
        <ListCard
            type="accessory"
            products={products}
        />
    );
}