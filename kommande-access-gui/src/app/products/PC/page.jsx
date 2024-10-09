'use client';

import ListCard from "@/components/ListCard";
import { useState, useEffect } from "react";
import { useData } from "@/components/DataContext";

export default function PC() {
    const products = useData().products;

    return (
        <ListCard
            type="laptop"
            products={products}
        />
    );
}