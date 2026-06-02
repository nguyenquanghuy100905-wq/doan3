"use client";
import { useState, useMemo, startTransition } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "@/ImageJeepBicycle/TrangChu03.png";
import { PanelMenu } from "primereact/panelmenu";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();
    const items = useMemo(() => [
        { label: "Dashboard", icon: "pi pi-home", command: () => router.push("/admin/dashboard") },
        { label: "User", icon: "pi pi-users", command: () => router.push("/admin/users") },
        {
            label: "Products",
            icon: "pi pi-box",
            items: [
                { label: "Products", icon: "pi pi-list", command: () => router.push("/admin/products") },
                { label: "Categories", icon: "pi pi-tags", command: () => router.push("/admin/categories") },
                { label: "Types", icon: "pi pi-th-large", command: () => router.push("/admin/type") },
            ],
        },
        {
            label: "Information",
            icon: "pi pi-info-circle",
            items: [
                { label: "Contacts", icon: "pi pi-align-left", command: () => router.push("/admin/contacts") },
                { label: "Content Types", icon: "pi pi-align-left", command: () => router.push("/admin/contents") },
                { label: "News", icon: "pi pi-book", command: () => router.push("/admin/news") },
                { label: "Feedbacks", icon: "pi pi-comments", command: () => router.push("/admin/feedbacks") },
                { label: "Banners", icon: "pi pi-image", command: () => router.push("/admin/banners") },
                { label: "Images", icon: "pi pi-image", command: () => router.push("/admin/images") }
            ],
        },
        { label: "Orders", icon: "pi pi-shopping-cart", command: () => router.push("/admin/order") },
        { label: "Thống Kê", icon: "pi pi-chart-pie", command: () => router.push("/admin/thongke") },
        { label: "Promotions", icon: "pi pi-gift", command: () => router.push("/admin/promotions") },
        { label: "Settings", icon: "pi pi-cog", command: () => router.push("/admin/settings") },
    ], [router]);

    function handleLogout() {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            localStorage.removeItem("data");
            startTransition(() => router.push("/loginFolder/login"));
        }
    }

    return (
        <div className="flex flex-col h-full text-black bg-white">
        <button
            className="m-4 flex items-center z-50 absolute justify-center p-3 w-12 h-12 text-white bg-orange-500 border border-orange-600 hover:bg-orange-600 rounded-full transition"
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
            <div
                className={`mt-2 p-4 flex flex-col transition-all duration-300 h-full overflow-y-auto shadow-xl rounded-2xl bg-white border border-gray-300 overflow-hidden 
                ${isCollapsed ? "w-20 items-center" : "w-64"}`}
            >

                <div className={`flex justify-center py-4 transition-all ${isCollapsed ? "hidden" : "block"}`}>
                    <Image src={logo} alt="logo" className="w-32 h-auto" />
                </div>

                <div className="w-full flex flex-col items-center flex-grow">
                    <div className="bg-white shadow-md rounded-lg p-3 w-full">
                        <PanelMenu model={items} className="w-full" />
                    </div>
                </div>

                
            </div>
            <div className="mt-auto p-4">
                    <button
                        className="w-full flex items-center justify-center gap-2 p-3 bg-gray-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} /> {isCollapsed ? "" : "Log out"}
                    </button>
                </div>
        </div>
    );
}
