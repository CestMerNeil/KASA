'use client';

import AdImages from "@/components/AdImages";
import ListCard from "@/components/ListCard";
import { useState, useEffect } from "react";
import { useData } from "@/components/DataContext";

export default function Home() {
    const products = useData().products;

    return (
        <div>
            <AdImages/>
            <ListCard
                type="all"
                products={products}
            />
        </div>
    );
}
