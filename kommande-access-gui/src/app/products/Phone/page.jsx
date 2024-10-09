'use client';

import ListCard from "@/components/ListCard";
import { useState, useEffect } from "react";
import { useData } from "@/components/DataContext";

export default function Phone() {
    const products = useData().products;

    return (
        <ListCard
            type="phone"
            products={products}
        />
    );
}