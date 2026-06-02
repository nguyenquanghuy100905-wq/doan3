'use client'

import { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Calendar } from 'primereact/calendar'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css'
import axios from 'axios'
import "@/styles/user.css"
import styleLogin from '@/styles/login.module.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

export default function Page() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        name: '',
        birthday: null,
        address: '',
        email: '',
        phone: ''
    })

    const toast = useRef(null)

    const handleChange = (e, field) => {
        const value = e.target ? e.target.value : e
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Kiểm tra thông tin bắt buộc
        if (!form.username || !form.password || !form.name || !form.email || !form.phone) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Thông báo',
                detail: 'Vui lòng điền đầy đủ thông tin bắt buộc!'
            })
            return
        }
        const formattedBirthday = form.birthday
        ? new Date(form.birthday).toISOString().split('T')[0] 
        : null
        try {
            await axios.post('http://localhost:3000/login/register', {
                ...form,
                birthday: formattedBirthday
            })
            toast.current?.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đăng ký thành công!'
            })

            setForm({
                username: '',
                password: '',
                name: '',
                birthday: null,
                address: '',
                email: '',
                phone: ''
            })

        } catch (err) {
            console.error(err)
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: `Có lỗi xảy ra trong quá trình đăng ký!`
            })
        }
    }

    return (
        <div className={`${styleLogin.background} min-h-screen flex items-center justify-center`}>
            <div className="max-w-xl w-full p-5 shadow-lg rounded-2xl bg-white">
                <Toast ref={toast} />
                <h2 className="text-2xl font-semibold mb-5 text-center">Đăng ký tài khoản</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <span className="p-float-label">
                        <InputText id="username" value={form.username} onChange={(e) => handleChange(e, 'username')} className="w-full" />
                        <label htmlFor="username">Tên đăng nhập *</label>
                    </span>

                    <span className="p-float-label">
                        <Password id="password" value={form.password} onChange={(e) => handleChange(e, 'password')} className="w-full" toggleMask />
                        <label htmlFor="password">Mật khẩu *</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="name" value={form.name} onChange={(e) => handleChange(e, 'name')} className="w-full" />
                        <label htmlFor="name">Họ tên *</label>
                    </span>

                    <span className="p-float-label">
                        <Calendar id="birthday" value={form.birthday} onChange={(e) => handleChange(e, 'birthday')} className="w-full" dateFormat="dd/mm/yy" showIcon />
                        <label htmlFor="birthday">Ngày sinh</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="email" type="email" value={form.email} onChange={(e) => handleChange(e, 'email')} className="w-full" />
                        <label htmlFor="email">Email *</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="phone" value={form.phone} onChange={(e) => handleChange(e, 'phone')} className="w-full" />
                        <label htmlFor="phone">Số điện thoại *</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="address" value={form.address} onChange={(e) => handleChange(e, 'address')} className="w-full" />
                        <label htmlFor="address">Địa chỉ</label>
                    </span>

                    <Button label="Đăng ký" icon="pi pi-user-plus" type="submit" className="w-full" />
                </form>
            </div>
        </div>
    )
}
