"use client";
import { useState, useEffect } from "react";
import { Badge } from "primereact/badge";

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
                <div className="card flex flex-wrap justify-content-center gap-4">
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: "2rem" }}>
                        <Badge value="2"></Badge>
                    </i>
                    <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: "2rem" }}>
                        <Badge value="5+" severity="danger"></Badge>
                    </i>
                    <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: "2rem" }}>
                        <Badge severity="danger"></Badge>
                    </i>
                </div>
                {userData ? (
                    <div className="flex items-center space-x-3">
                        <img
                            src={`http://localhost:3000${userData.image}`}
                            alt="User"
                            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
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
