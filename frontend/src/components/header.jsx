"use client";
import { useState, useEffect } from "react";
import imgDefault from "@/ImageJeepBicycle/default.jpeg";

export default function Header() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("data");
            if (storedData) {
                setUserData(JSON.parse(storedData)?.user);
            }
        }
    }, []);

    return (
        <div className="m-2 flex items-center justify-end rounded-2xl border border-gray-300 bg-white dark:bg-gray-900 p-4 shadow-lg transition-all">
            <div className="flex items-center space-x-6">
                {userData ? (
                    <div className="flex items-center space-x-3">
                        <img
                            src={
                                userData.image && userData.image !== "null"
                                    ? `http://localhost:3000${userData.image}`
                                    : imgDefault.src
                            }
                            alt="User"
                            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm object-cover"
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{userData.name}</span>
                    </div>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                )}
            </div>
        </div>
    );
}
