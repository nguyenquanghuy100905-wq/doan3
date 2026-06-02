"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Camera, User, Phone, Mail, MapPin, Calendar, Heart, Shield, Lock } from "lucide-react";
import axios from "axios";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

export default function AccountPage() {
    const [user, setUser] = useState({
        username: "",
        name: "",
        birthday: "",
        sex: "",
        address: "",
        email: "",
        phone: "",
        image: "",
        role_user: 1,
        ban: 0
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const toast = useRef(null);

    // Load auth and user info
    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                if (parsed && parsed.token && parsed.user && parsed.user.id) {
                    setAuth(parsed);
                    fetchUserInfo(parsed.user.id, parsed.token);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("Lỗi khi đọc token đăng nhập:", err);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserInfo = async (userId, token) => {
        try {
            const response = await axios.get("http://localhost:3000/users/getUsersById", {
                params: { id: userId },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data) {
                const data = response.data;
                // Parse birthday to date string format YYYY-MM-DD
                if (data.birthday) {
                    data.birthday = new Date(data.birthday).toISOString().split("T")[0];
                }
                setUser(data);
                if (data.image) {
                    setPreviewImage(`http://localhost:3000${data.image}`);
                }
            }
        } catch (err) {
            console.error("Không tải được thông tin người dùng:", err);
            toast.current?.show({
                severity: "error",
                summary: "Lỗi hệ thống",
                detail: "Không tải được thông tin tài khoản.",
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validations
        if (!user.name || !user.email || !user.phone || !user.address) {
            toast.current?.show({
                severity: "warn",
                summary: "Cảnh báo",
                detail: "Vui lòng nhập đầy đủ các trường bắt buộc.",
                life: 3000
            });
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(user.phone)) {
            toast.current?.show({
                severity: "warn",
                summary: "Lỗi định dạng",
                detail: "Số điện thoại phải có đúng 10 chữ số.",
                life: 3000
            });
            return;
        }

        if (password) {
            if (password !== confirmPassword) {
                toast.current?.show({
                    severity: "error",
                    summary: "Lỗi xác thực",
                    detail: "Xác nhận mật khẩu mới không khớp.",
                    life: 3000
                });
                return;
            }
            if (password.length < 6) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Mật khẩu yếu",
                    detail: "Mật khẩu mới phải có ít nhất 6 ký tự.",
                    life: 3000
                });
                return;
            }
        }

        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("username", user.username);
            if (password) {
                formData.append("password", password);
            }
            formData.append("name", user.name);
            formData.append("birthday", user.birthday || "");
            formData.append("sex", user.sex || "");
            formData.append("address", user.address);
            formData.append("email", user.email);
            formData.append("phone", user.phone);
            formData.append("role_user", user.role_user);
            formData.append("ban", user.ban);
            
            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:3000/users/updateUsers`,
                formData,
                {
                    params: { id: user.id },
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (response.status === 200) {
                toast.current?.show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Cập nhật hồ sơ thành công.",
                    life: 3000
                });
                setPassword("");
                setConfirmPassword("");
                // Reload user data to fetch new avatar name and update navbar
                await fetchUserInfo(user.id, auth.token);
            }
        } catch (err) {
            console.error("Cập nhật hồ sơ thất bại:", err);
            toast.current?.show({
                severity: "error",
                summary: "Thất bại",
                detail: err.response?.data?.message || "Lỗi cập nhật tài khoản.",
                life: 3000
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex w-full min-h-[60vh] justify-center items-center">
                <i className="pi pi-spin pi-spinner text-4xl text-orange-500"></i>
            </div>
        );
    }

    if (!auth) {
        return (
            <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
                <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị hạn chế</h3>
                <p className="text-gray-600 mb-6">Vui lòng đăng nhập để truy cập và quản lý thông tin tài khoản cá nhân của bạn.</p>
                <Button 
                    label="Đăng nhập ngay" 
                    className="p-button-warning bg-orange-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-orange-600 transition w-full"
                    onClick={() => window.location.href = "/loginFolder"}
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <Toast ref={toast} />
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300">
                {/* Banner gradient */}
                <div className="h-32 bg-gradient-to-r from-orange-500 to-amber-500"></div>

                <div className="px-6 py-8 relative">
                    {/* Avatar upload overlay */}
                    <div className="absolute -top-16 left-6 md:left-10 group">
                        <div 
                            onClick={triggerFileSelect}
                            className="w-28 h-28 rounded-full border-4 border-white bg-gray-100 shadow-md overflow-hidden relative cursor-pointer group-hover:brightness-90 transition-all"
                        >
                            {previewImage ? (
                                <img 
                                    src={previewImage} 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-400">
                                    <User className="w-12 h-12" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            accept="image/*" 
                            className="hidden" 
                        />
                    </div>

                    <div className="ml-0 md:ml-36 pt-12 md:pt-0 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{user.name || "Khách Hàng"}</h2>
                        <p className="text-orange-500 font-medium">{user.role_user === 2 ? "Quản trị viên" : "Thành viên thân thiết"}</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-8">
                        {/* Section: Thông tin cá nhân */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <User className="w-5 h-5 text-orange-500" /> Thông tin cá nhân
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Tên đăng nhập</label>
                                    <div className="relative">
                                        <Shield className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            value={user.username} 
                                            disabled 
                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Họ và tên *</label>
                                    <div className="relative">
                                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            value={user.name} 
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                            placeholder="Nhập họ và tên..."
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Số điện thoại *</label>
                                    <div className="relative">
                                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            value={user.phone} 
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                            placeholder="Nhập số điện thoại..."
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Email *</label>
                                    <div className="relative">
                                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="email"
                                            value={user.email} 
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                            placeholder="Nhập địa chỉ email..."
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Ngày sinh</label>
                                    <div className="relative">
                                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="date"
                                            value={user.birthday || ""}
                                            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Giới tính</label>
                                    <div className="relative">
                                        <Heart className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <select
                                            value={user.sex || ""}
                                            onChange={(e) => setUser({ ...user, sex: e.target.value })}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Địa chỉ */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-orange-500" /> Địa chỉ giao hàng
                            </h3>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-600">Địa chỉ cụ thể *</label>
                                <textarea 
                                    value={user.address} 
                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                    rows={3} 
                                    className="w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none p-3 transition-all duration-200 text-gray-700"
                                    placeholder="Nhập địa chỉ giao hàng chi tiết..."
                                />
                            </div>
                        </div>

                        {/* Section: Đổi mật khẩu */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-orange-500" /> Thay đổi mật khẩu
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Mật khẩu mới (để trống nếu không muốn đổi)</label>
                                    <div className="relative">
                                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="password"
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                            placeholder="Nhập mật khẩu mới..."
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Xác nhận mật khẩu mới</label>
                                    <div className="relative">
                                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="password"
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all duration-200 text-gray-700"
                                            placeholder="Nhập lại mật khẩu mới..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Button submit */}
                        <div className="pt-4 flex justify-end">
                            <Button 
                                type="submit" 
                                label={saving ? "Đang cập nhật..." : "Cập nhật tài khoản"} 
                                icon={saving ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-orange-600 hover:shadow-orange-200 focus:ring-4 focus:ring-orange-300 transition duration-300 w-full md:w-auto"
                                disabled={saving}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
