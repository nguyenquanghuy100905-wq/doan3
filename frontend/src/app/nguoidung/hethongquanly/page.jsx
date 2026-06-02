import Image from "next/image"
import style from "@/styles/hethong.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faPhone, faGlobe, faEnvelope, faLocationDot, } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
export default function page() {
    return (
        <>
            <div className={style.background}>
                <h2 className={` ${style.title} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>Hệ thống đại lý</h2>
            </div>
            <main className="grid my-12 grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                <div className="space-y-5">

                    <div className=" text-red-500 flex space-x-8">

                        <FontAwesomeIcon className="text-4xl" icon={faLocationCrosshairs} />

                        <h2 className="text-3xl font-semibold font-mono">BẢN ĐỒ ĐẠI LÝ Quang Huy Mobile 20255</h2>

                    </div>

                    <div className={style.location}></div>

                </div>
                <div className="space-y-5">
                    <div className="text-red-500 flex space-x-8">
                        <FontAwesomeIcon className="text-4xl" icon={faLocationCrosshairs} />
                        <h2 className="text-3xl font-semibold font-mono">THÔNG TIN ĐẠI LÝ TOÀN QUỐC</h2>
                    </div>
                    <div className="w-full p-6 border border-gray-400 rounded-4xl shadow-lg bg-gray-100">
                        <h2 className="text-xl font-bold text-red-600">
                            VĂN PHÒNG ĐIỀU HÀNH KINH DOANH TOÀN QUỐC
                        </h2>
                        <p className="my-2">
                            Tòa nhà VinaHud - 105 Nguyễn Bá Khoản - Phường Trung Hòa - Quận Cầu Giấy - T.P Hà Nội
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 min-h-full">
                            <div className="md:col-span-7 border-r-2 pr-4 space-y-4">
                                <p className="text-lg flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faPhone} /> <span>0978320093</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faGlobe} /> <Link href="/nguoidung/trangchu">QuangHuyMobile.vn</Link>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faEnvelope} /> <span>quanghuymobile@gmail.com</span>
                                </p>
                            </div>
                            <div className="md:col-span-5 flex flex-col justify-center items-center space-y-4">
                                <a
                                    href="https://maps.app.goo.gl/tB32KyVYDGguptkJ7"
                                    className="px-5 py-3 rounded-3xl bg-white text-black hover:bg-orange-700 hover:text-white transition-all"
                                >
                                    Xem bản đồ <FontAwesomeIcon icon={faLocationDot} />
                                </a>
                                <div className="flex justify-center space-x-4">
                                    <a
                                        href="https://www.facebook.com/quochuy.doan.75248"
                                        className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-blue-600 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faFacebook} className="text-2xl text-blue-600 hover:text-white" />
                                    </a>
                                    <a
                                        href="https://www.zalo.me/"
                                        className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-red-600 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faYoutube} className="text-2xl text-red-500 hover:text-white" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/"
                                        className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-black transition-all"
                                    >
                                        <FontAwesomeIcon icon={faTiktok} className="text-2xl text-black hover:text-white" />
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/"
                                        className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-pink-500 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faInstagram} className="text-2xl text-pink-500 hover:text-white" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        <button className="px-5 py-1 rounded-4xl text-red-600 border-red-600 border-2 font-semibold hover:bg-red-600 hover:text-white transition-all">
                            MIỀN BẮC
                        </button>
                        <button className="px-5 py-1 rounded-4xl text-red-600 border-red-600 border-2 font-semibold hover:bg-red-600 hover:text-white transition-all">
                            MIỀN TRUNG
                        </button>
                        <button className="px-5 py-1 rounded-4xl text-red-600 border-red-600 border-2 font-semibold hover:bg-red-600 hover:text-white transition-all">
                            TÂY NGUYÊN
                        </button>
                        <button className="px-5 py-1 rounded-4xl text-red-600 border-red-600 border-2 font-semibold hover:bg-red-600 hover:text-white transition-all">
                            ĐÔNG NAM BỘ
                        </button>
                        <button className="px-5 py-1 rounded-4xl text-red-600 border-red-600 border-2 font-semibold hover:bg-red-600 hover:text-white transition-all">
                            TÂY NAM BỘ
                        </button>
                    </div>
                    <div className="w-full h-[600px] p-6 border border-gray-400 rounded-4xl shadow-lg bg-gray-100">
                        <form className="w-full mx-auto">
                            <div className="flex">
                                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                                <button id="dropdown-button" data-dropdown-toggle="dropdown" className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg></button>
                                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                        </li>
                                        <li>
                                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="relative w-full">
                                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="max-h-[500px] overflow-y-auto scrollbar-hidden">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="border-b-2 border-gray-300 pb-6 my-5">
                                    <h2 className="text-xl font-bold text-red-600">Quang Huy Mobile</h2>
                                    <p className="my-2">
                                        Tòa nhà VinaHud - 105 Nguyễn Bá Khoản - Phường Trung Hòa - Quận Cầu Giấy - T.P Hà Nội
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 h-auto items-center">
                                        <div className="md:col-span-7 border-r-2 pr-6 space-y-4">
                                            <p className="text-lg flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faPhone} /> <span>0978320093</span>
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faGlobe} /> <Link href="/nguoidung/trangchu">QuangHuyMobile.vn</Link>
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faEnvelope} /> <span>quanghuymobile@gmail.com</span>
                                            </p>
                                        </div>
                                        <div className="md:col-span-5 flex flex-col justify-center items-center space-y-4">
                                            <a
                                                href="https://maps.app.goo.gl/tB32KyVYDGguptkJ7"
                                                className="px-5 py-3 rounded-3xl bg-white text-black hover:bg-orange-700 hover:text-white transition-all"
                                            >
                                                Xem bản đồ <FontAwesomeIcon icon={faLocationDot} />
                                            </a>
                                            <div className="flex justify-center space-x-4">
                                                <a
                                                    href="https://www.facebook.com/quochuy.doan.75248"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:bg-blue-600 transition-all"
                                                >
                                                    <FontAwesomeIcon icon={faFacebook} className="text-2xl text-blue-600 hover:text-white" />
                                                </a>
                                                <a
                                                    href="https://www.zalo.me/"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:bg-red-600 transition-all"
                                                >
                                                    <FontAwesomeIcon icon={faYoutube} className="text-2xl text-red-500 hover:text-white" />
                                                </a>
                                                <a
                                                    href="https://www.youtube.com/"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:bg-black transition-all"
                                                >
                                                    <FontAwesomeIcon icon={faTiktok} className="text-2xl text-black hover:text-white" />
                                                </a>
                                                <a
                                                    href="https://www.tiktok.com/"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:bg-pink-500 transition-all"
                                                >
                                                    <FontAwesomeIcon icon={faInstagram} className="text-2xl text-pink-500 hover:text-white" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};
