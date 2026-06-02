'use client';
import Link from "next/link";
import styleGioiThieu from "@/styles/gioithieu.module.css";
import { Helmet } from "react-helmet";
export default function GioiThieu() {
    function pageLienHe() {
        window.location.href = "/nguoidung/trangchu";
    }
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Trang Tin Tức QuangHuyMobile</title>
            </Helmet>
            <div className={`${styleGioiThieu.background} w-full h-55 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleGioiThieu.title}>Tin Tức</h2>
                    <p className={styleGioiThieu.content}><Link href="/nguoidung/trangchu">Trang Chủ</Link> » Tin Tức về JeepBicycle Việt Nam</p>
                </div>
            </div>
        </div>
    );
}
