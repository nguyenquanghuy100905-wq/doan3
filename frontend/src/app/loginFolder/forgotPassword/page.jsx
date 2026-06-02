"use client";
import styles from "@/styles/forgotPassword.module.css";
import { useRouter } from "next/navigation"; // Sử dụng useRouter cho điều hướng
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import axios from "axios";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { Password } from 'primereact/password';
import { Toast } from "primereact/toast";
import Link from "next/link";
import "@/styles/forgetPassword.css";

export default function ForgotPassword() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const toast = useRef(null);
    const router = useRouter();
    const emailSubmit = async () => {
        if (!email) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Vui lòng nhập email!',
            });
            return;
        }

        try {
            await axios.post("http://localhost:3000/login/forgotPasswordByEmail", {
                email: email
            });
            toast.current.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Tạo mã OTP thành công',
            });
            setActiveIndex(1);
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Email không tồn tại',
            });
        }
    };

    // Xử lý xác thực OTP
    const otpSubmit = async () => {
        if (!otp) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Vui lòng nhập mã OTP!',
            });
            return;
        }
        try {
            await axios.post("http://localhost:3000/login/verifyOTP", {
                otp: otp
            })
            setActiveIndex(2);
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Có lỗi xảy ra',
            });
        }
    };

    // Xử lý cập nhật mật khẩu
    const passwordSubmit = (e) => {
        e.preventDefault();
        if (!password || !newPassword) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Vui lòng nhập đầy đủ mật khẩu mới!',
            });
            return;
        }
        if (password !== newPassword) {
            toast.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Mật khẩu mới không khớp!',
            });
            return;
        }

        alert("Cập nhật mật khẩu thành công");
        router.push('/loginFolder/login'); 
    };

    return (
        <div className="relative">
            <Toast ref={toast} position="top-right" />
            <div className={`${styles.background} w-full h-screen flex justify-center items-center`}>
                {activeIndex === 0 && (
                    <div className={`${styles.formContainer} bg-gradient-to-r from-violet-100 to-white`}>
                        <div className={`${styles.logoContainer} text-purple-600`}>Send Email</div>
                        <FloatLabel>
                            <InputText value={email} className="w-full" id="email" onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                        <Button label="Submit" icon="pi pi-check" onClick={emailSubmit} iconPos="right" />
                        <p className={styles.signupLink}>
                            Don't have an account?
                            <a href="#" className="text-purple-600 hover:text-red-500"> Sign up now</a>
                        </p>
                    </div>
                )}

                {activeIndex === 1 && (
                    <div className={`${styles.formContainer} bg-gradient-to-r from-violet-100 to-white`}>
                        <div className={`${styles.logoContainer} text-purple-600`}>Send OTP</div>
                        <div className="mx-auto">
                            <InputOtp
                                value={otp}
                                length={6}
                                onChange={(e) => setOTP(e.value)}
                                integerOnly
                            />
                        </div>
                        <Button label="Submit" icon="pi pi-check" severity="success" onClick={otpSubmit} iconPos="right" />
                        <p className={styles.signupLink}>
                            Don't have an account?
                            <a href="#" className="text-purple-600 hover:text-red-500"> Sign up now</a>
                        </p>
                    </div>
                )}

                {activeIndex === 2 && (
                    <div className={`${styles.formContainer} bg-gradient-to-r from-violet-100 to-white`}>
                        <div className={`${styles.logoContainer} text-purple-600`}>Cập Nhật Mật Khẩu Mới</div>
                        <div className="w-full">
                            <Password value={password} className="w-full" onChange={(e) => setPassword(e.target.value)} toggleMask />
                        </div>
                        <div className="w-full">
                            <Password value={newPassword} className="w-full" onChange={(e) => setNewPassword(e.target.value)} toggleMask />
                        </div>
                        <Button label="Cập Nhật" icon="pi pi-check" severity="secondary" onClick={passwordSubmit} iconPos="right" />
                        <p className={styles.signupLink}>
                            Don't have an account?
                            <a href="#" className="text-purple-600 hover:text-red-500"> Sign up now</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
