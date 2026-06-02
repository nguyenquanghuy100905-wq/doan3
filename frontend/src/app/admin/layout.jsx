import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
export default function layout({ children }) {
    return (
        <>
            <div className="flex h-screen w-screen overflow-hidden">
                <div className="h-screen overflow-y-auto flex-shrink-0">
                    <Sidebar />
                </div>
                <main className="flex flex-col w-full h-screen">
                    <Header />
                    <div className="border-2 m-2 p-4 border-gray-300 rounded-2xl flex-1 overflow-hidden overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
};
