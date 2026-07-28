"use client"
import { useState } from "react";
import {Heart, Trash2, Minus, Plus, Star, Pencil,X} from "lucide-react";

import Image from "next/image";
interface Items{
    item:{
        id: number;
        name: string;
        color: string;
        size: string;
        available: number;
        rating: number;
        reviews: number;
        price: number;
        oldPrice: number;
        qty: number;
        image: string
    }
}
const initialItems = [
    {
        id: 1,
        name: "Morning Brew Instant Coffee",
        color: "Black",
        size: "250 ML",
        available: 2,
        rating: 4,
        reviews: 118,
        price: 27.49,
        oldPrice: 29.95,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=200&h=200&fit=crop",
    },
    {
        id: 2,
        name: "Morning Brew Instant Coffee",
        color: "Black",
        size: "250 ML",
        available: 2,
        rating: 4,
        reviews: 118,
        price: 27.49,
        oldPrice: 29.95,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=200&h=200&fit=crop",
    },
    {
        id: 3,
        name: "Morning Brew Instant Coffee",
        color: "Black",
        size: "250 ML",
        available: 2,
        rating: 4,
        reviews: 118,
        price: 27.49,
        oldPrice: 29.95,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
    },
    {
        id: 4,
        name: "Morning Brew Instant Coffee",
        color: "Black",
        size: "250 ML",
        available: 2,
        rating: 4,
        reviews: 118,
        price: 27.49,
        oldPrice: 29.95,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    },
    {
        id: 5,
        name: "Morning Brew Instant Coffee",
        color: "Black",
        size: "250 ML",
        available: 2,
        rating: 4,
        reviews: 118,
        price: 27.49,
        oldPrice: 29.95,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    },
];

function StarRating({ rating, reviews }:{rating:number, reviews: number}) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={
                        i < rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                    }
                />
            ))}
            <span className="ml-1 text-xs text-gray-500">({reviews})</span>
        </div>
    );
}

export default function CartTable() {
    const [items, setItems] = useState(initialItems);

    const updateQty = (id :number, delta :number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.max(1, Math.min(item.available, item.qty + delta)) }
                    : item
            )
        );
    };

    const removeItem = (id :number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (

        <div className="">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl">
                    <strong>Cart (3 item)</strong>
                </h1>

                <button
                    className="cursor-pointer transition flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600"
                >
                    <X size={14} />
                    Remove All
                </button>
            </div>
            <div className="w-full max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white overflow-hidden">


            <div className="overflow-x-auto">
                <table className="w-full min-w-205 text-sm">
                    <thead>
                    <tr className="bg-gray-50 text-gray-600">
                        <th className="px-6 py-4 text-left font-medium">Product</th>
                        <th className="px-4 py-4 text-left font-medium">Price</th>
                        <th className="px-4 py-4 text-left font-medium">Quantity</th>
                        <th className="px-4 py-4 text-left font-medium">Total price</th>
                        <th className="px-6 py-4 text-right font-medium">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item ) => (
                        <tr
                            key={item.id}
                            className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors"
                        >
                            <td className="px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        width={50}
                                        height={50}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-lg object-cover bg-gray-100 shrink-0"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                            <Pencil size={13} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                        </div>
                                        <p className="text-xs text-blue-600 mt-0.5">
                                            Color: {item.color}, Size: {item.size}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Available: {item.available}
                                        </p>
                                        <div className="mt-1">
                                            <StarRating rating={item.rating} reviews={item.reviews} />
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-5 whitespace-nowrap">
                  <span className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>{" "}
                                <span className="text-gray-400 line-through text-sm">
                    ${item.oldPrice.toFixed(2)}
                  </span>
                            </td>

                            <td className="px-4 py-5">
                                <div className="inline-flex items-center rounded-full border border-gray-200 px-2 py-1 gap-3">
                                    <button
                                        onClick={() => updateQty(item.id, -1)}
                                        className="text-gray-500 hover:text-gray-900 disabled:opacity-30"
                                        disabled={item.qty <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-4 text-center font-medium text-gray-900">
                      {item.qty}
                    </span>
                                    <button
                                        onClick={() => updateQty(item.id, 1)}
                                        className="text-gray-500 hover:text-gray-900 disabled:opacity-30"
                                        disabled={item.qty >= item.available}
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </td>

                            <td className="px-4 py-5">
                  <span className="font-semibold text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                            </td>

                            <td className="px-6 py-5">
                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        className="text-gray-500 hover:text-rose-500 transition-colors"
                                        aria-label="Add to wishlist"
                                    >
                                        <Heart size={18} />
                                    </button>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-500 hover:text-red-600 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {items.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                Your cart is empty.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            </div>
        </div>

    );
}