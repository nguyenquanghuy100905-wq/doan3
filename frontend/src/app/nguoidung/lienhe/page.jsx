"use client"
import styleLienHe from "@/styles/lienhe.module.css"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { useState, useRef } from "react";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import axios from "axios";
import { Toast } from "primereact/toast";
export default function lienhe() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        agree: false
    });
    const msgs = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckbox = (e) => {
        setFormData(prev => ({ ...prev, agree: e.checked }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, message, agree } = formData;
    if (!name || !phone || !email || !message) {
        msgs.current.show({
            severity: 'warn',
            summary: 'Thiếu thông tin',
            detail: 'Vui lòng nhập đầy đủ thông tin.',
            life: 3000
        });
        return;
    }

    if (!agree) {
        msgs.current.show({
            severity: 'warn',
            summary: 'Thiếu xác nhận',
            detail: 'Vui lòng chấp nhận điều khoản.',
            life: 3000
        });
        return;
    }

    try {
        await axios.post("http://localhost:3000/contacts/createContacts", formData);
        msgs.current.show({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Gửi liên hệ thành công!',
            life: 3000
        });
        setFormData({ name: '', phone: '', email: '', message: '', agree: false });
    } catch (error) {
        msgs.current.show({
            severity: 'error',
            summary: 'Lỗi',
            detail: error.response?.data?.message || 'Gửi liên hệ thất bại.',
            life: 3000
        });
    }
};

    return (
        <div>
            <Toast ref={msgs} position="top-right" className="w-96" />
            <div className={`${styleLienHe.background} w-full h-55 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleLienHe.title}>Liên Hệ</h2>
                    <p className={styleLienHe.content}><Link href="/nguoidung/trangchu">Trang Chủ</Link> » Liên Hệ về Quang Huy Mobile</p>
                </div>
            </div>
            <div className="w-full max-w-[540px] sm:max-w-[720px] text-center md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto pt-10 pb-5 px-4 flex justify-center">
                <div className="grid grid-cols-3 space-x-8">
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faLocationDot} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Địa Chỉ:</h3>
                        <p className={styleLienHe.text}>Thôn Hoan Ái, xã Tân Việt, huyện Yên Mỹ, tỉnh Hưng Yên</p>
                    </div>  
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faEnvelope} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Email:</h3>
                        <p className={styleLienHe.text}>quanghuymobile@gmail.com</p>
                    </div>
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Phone:</h3>
                        <p className={styleLienHe.text}>19003395 – 0792.66.88.99</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto relative max-w-[540px] sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-4 pb-10 flex justify-center">
                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="shadow-lg shadow-gray-600 h-[450px] md:h-[700px] border-2 border-white rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d286127.6826565675!2d105.88981459067634!3d20.706155008878095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313595dc0a211a01%3A0x98e07e982f7ad098!2zexeBIMSRaeG7h24gSG9hbiBIb2E!5e1!3m2!1svi!2s!4v1742319031798!5m2!1svi!2s"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="rounded-xl h-fit md:h-[700px] shadow-2xl shadow-gray-600 bg-white border-2 border-white">
                        <form onSubmit={handleSubmit} className="mx-auto w-full h-full p-6 rounded-lg shadow-md">
                            <div className="mb-6">
                                <InputText id="name" value={formData.name} onChange={handleChange} placeholder="Doãn Quốc H" className="w-full p-inputtext-sm" required />
                            </div>
                            <div className="mb-6">
                                <InputText id="phone" value={formData.phone} onChange={handleChange} placeholder="09********" className="w-full p-inputtext-sm" required />
                            </div>
                            <div className="mb-6">
                                <InputText id="email" type="email" value={formData.email} onChange={handleChange} placeholder="doanquoch@gmail.com" className="w-full p-inputtext-sm" required />
                            </div>
                            <div className="mb-6">
                                <InputTextarea id="message" value={formData.message} onChange={handleChange} placeholder="Nhập nội dung muốn yêu cầu" className="w-full h-[200px]" />
                            </div>
                            <div className="flex items-center mb-6">
                                <Checkbox inputId="agree" onChange={handleCheckbox} checked={formData.agree} className="mr-2" />
                                <label htmlFor="agree" className="text-sm font-medium text-gray-900 ml-2">Chấp nhận điều khoản và điều kiện</label>
                            </div>
                            <Button label="Submit" type="submit" className="w-1/3 bg-gray-700 hover:bg-black" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
