"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { Search } from "lucide-react";
import { Toast } from "primereact/toast";
import '@/styles/user.css';
import { Dialog } from 'primereact/dialog';

const infor = {
    id: "",
    username: "",
    password: "",
    name: "",
    birthday: null,
    sex: "",
    address: "",
    email: "",
    phone: "",
    image: null,
    role_user: 1,
    ban: false,
    created_at: "",
    updated_at: ""
}
export default function UsersPage() {
    const [dataUsers, setDataUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [addUsers, setAddUsers] = useState(false);
    const [editUsers, setEditUsers] = useState(false);
    const [title, setTitle] = useState("");
    const [token, setToken] = useState("");
    const [searchUsers, setsearchUsers] = useState("");
    const [user, setUser] = useState(infor)
    const fileUploadRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const toast = useRef(null);
    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setUser({ ...user, image: file });
        }
    };

    const sexOptions = [
        { label: "Nam", value: "Nam" },
        { label: "Nữ", value: "Nữ" },
        { label: "Khác", value: "Khác" }
    ];

    const roleOptions = [
        { label: "Admin", value: 3 },
        { label: "Nhân Viên", value: 2 },
        { label: "User", value: 1 },
    ];

    const imageTemplate = (rowData) => (
        <img
            src={`http://localhost:3000${rowData.image}`}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border"
        />
    );

    //getToken
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            setToken(data.token);
        } else {
            alert("bạn không có quyền truy cập !");
        }
    }, []);


    //getAllUsers
    useEffect(() => {
        if (!token) return;

        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users/getAllUsers", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDataUsers(response.data);
            } catch (error) {
                setError("Token của bạn đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    //resetForm
    const resetForm = () => {
        setUser(infor);
        setAddUsers(false);
        setEditUsers(false);
        setPreviewImage(null);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    };

    //handleChange
    const handleChange = (e, field) => {
        const { value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split("T")[0];
    };

    const btnAddUsers = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                if (key === "image" && user.image instanceof File) {
                    formData.append("file", user.image);
                } else if (key === "birthday") {
                    formData.append(key, formatDate(user.birthday));
                } else if (key === "ban") {
                    formData.append(key, user.ban ? 1 : 0);
                } else {
                    formData.append(key, user[key]);
                }
            });

            await axios.post("http://localhost:3000/users/createUsers", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.current.show([
                {
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thêm người dùng thành công!',
                    life: 3000
                }
            ]);
            window.location.reload();
            setShowForm(false);
            resetForm();
        } catch (error) {
            toast.current.show([
                {
                    severity: 'error',
                    summary: 'Lỗi',
                    detail: 'Thêm người dùng thất bại: ' + (error.response?.data?.message || error.message),
                    life: 3000
                }
            ]);
        }
    };


    const btnDelete = async (user) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${user.username}?`)) return;
        try {
            await axios.delete(`http://localhost:3000/users/deleteUsers`, {
                params: { id: user.id },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.current.show([
                {
                    severity: 'success',
                    summary: 'Thành công',
                    detail: `Xóa ${user.name} thành công!`,
                    life: 3000
                }
            ]);
            setDataUsers(dataUsers.filter((u) => u.id !== user.id));
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error.response?.data || error.message);
            alert("Lỗi khi xóa người dùng: " + JSON.stringify(error.response?.data || error.message));
        }
    };
    const btnUpdateUsers = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                if (key === "image" && user.image instanceof File) {
                    formData.append("file", user.image);
                } else if (key === "birthday") {
                    formData.append(key, formatDate(user.birthday));
                } else if (key === "ban") {
                    formData.append(key, user.ban ? 1 : 0);
                } else {
                    formData.append(key, user[key]);
                }
            });

            await axios.put(`http://localhost:3000/users/updateUsers`, formData, {
                params: { id: user.id },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Cập nhật người dùng thành công!",
                life: 3000,
            });

            setShowForm(false);
            resetForm();
            window.location.reload();
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: `Cập nhật người dùng thất bại: ${err.response?.data?.message || err.message}`,
                life: 3000,
            });
        }
    };

    const filteredUsers = dataUsers.filter(
        (us) =>
            us.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
            us.phone.includes(searchUsers)
    )

    // --------------------------------------------------
    const handleAdd = () => {
        setTitle("Nhập Thông Tin Người Dùng")
        resetForm();
        setShowForm(true);
        setAddUsers(true);
        setEditUsers(false)
    };
    const handleEdit = (rowData) => {
        setTitle("Cập Nhật Thông Tin Người Dùng");
        setUser({
            ...rowData,
            password: "",
            birthday: rowData.birthday ? new Date(rowData.birthday) : null,
            created_at: rowData.created_at ? new Date(rowData.created_at) : null,
            updated_at: rowData.updated_at ? new Date(rowData.updated_at) : null
        });
        setPreviewImage(rowData.image ? `http://localhost:3000${rowData.image}` : null);
        setShowForm(true);
        setEditUsers(true);
        setAddUsers(false);
    };
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={toast} />
            <div className="flex w-full my-3 justify-between">
                <div className="flex flex-1 max-w-lg relative">
                    <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search or type command..."
                        value={searchUsers}
                        onChange={(e) => setsearchUsers(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                    />
                </div>
                <Button icon="pi pi-user" rounded outlined onClick={handleAdd} severity="info" aria-label="User" />
            </div>
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">Users</h2>
            <Dialog
                visible={showForm}
                style={{ width: '60vw', maxHeight: '90vh' }}
                modal
                draggable
                onHide={() => setShowForm(false)}
            >
                <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold text-center text-orange-600">{title}</h2>
                    <form className="grid grid-cols-2 gap-4 mb-4">
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="id" value={user.id} disabled className="w-full" onChange={(e) => handleChange(e, "id")} />
                                <label htmlFor="id">ID</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="username" value={user.username} className="w-full" onChange={(e) => handleChange(e, "username")} />
                                <label htmlFor="username">Username</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Password inputId="password" value={user.password} className="" onChange={(e) => handleChange(e, "password")} toggleMask />
                                <label htmlFor="password">Password</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="name" value={user.name} className="w-full" onChange={(e) => handleChange(e, "name")} />
                                <label htmlFor="name">Name</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4 text-black">
                            <FloatLabel>
                                <Calendar inputId="birth_date" value={user.birthday} className="w-full" onChange={(e) => setUser({ ...user, birthday: e.value })} />
                                <label htmlFor="birth_date">Birth Day</label>
                            </FloatLabel>
                        </div>

                        <div className="mb-4">
                            <Dropdown value={user.sex} options={sexOptions} onChange={(e) => setUser({ ...user, sex: e.value })} placeholder="Chọn giới tính" className="w-full" />
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="address" value={user.address} className="w-full" onChange={(e) => handleChange(e, "address")} />
                                <label htmlFor="address">Address</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="email" value={user.email} className="w-full" onChange={(e) => handleChange(e, "email")} />
                                <label htmlFor="email">Email</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText id="phone" value={user.phone} className="w-full" onChange={(e) => handleChange(e, "phone")} />
                                <label htmlFor="phone">Phone</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <Dropdown value={user.role_user} options={roleOptions} onChange={(e) => setUser({ ...user, role_user: e.value })} placeholder="Chọn quyền" className="w-full" />
                        </div>
                        <div className="mb-4 col-span-2">
                            <div className="col-span-2 flex items-center space-x-4">
                                <FileUpload
                                    ref={fileUploadRef}
                                    mode="basic"
                                    name="image"
                                    accept="image/*"
                                    maxFileSize={5 * 1024 * 1024}
                                    customUpload
                                    onSelect={handleFileUpload}
                                />


                                {previewImage && (
                                    <div className="relative">
                                        <img src={previewImage} alt="Preview" className="w-20 h-20 rounded-md border object-cover" />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setUser({ ...user, image: null });
                                                fileUploadRef.current.clear();
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4 col-span-2">
                            <div className="col-span-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id="ban"
                                    checked={user.ban === 1}
                                    onChange={(e) => setUser({ ...user, ban: e.target.checked ? 1 : 0 })}
                                    className="mr-2"
                                />
                                <label htmlFor="ban">Bị cấm</label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Calendar inputId="created_at" value={user.created_at} className="w-full" onChange={(e) => setUser({ ...user, created_at: e.value })} />
                                <label htmlFor="created_at">Created At</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Calendar inputId="updated_at" value={user.created_at} className="w-full" onChange={(e) => setUser({ ...user, updated_at: e.value })} />
                                <label htmlFor="updated_at">Updated At</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4 col-span-2">
                            <div className="col-span-2">
                                {editUsers && (
                                    <Button
                                        type="button"
                                        label="Cập nhật"
                                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                        onClick={btnUpdateUsers}
                                    />
                                )}
                                {addUsers && (
                                    <Button
                                        type="submit"
                                        label="Thêm"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                        onClick={btnAddUsers}
                                    />
                                )}

                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
            <div className="card">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <DataTable
                    value={filteredUsers}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    tableStyle={{ minWidth: "85rem" }}
                    loading={loading}
                >
                    <Column
                        header="STT"
                        body={(rowData, { rowIndex }) => rowIndex + 1}
                        style={{ width: "5%" }}
                    />
                    <Column field="name" header="Name" style={{ width: "15%" }} />
                    <Column header="Image" body={imageTemplate} style={{ width: "10%" }} />
                    <Column field="birthday" body={(rowData) => new Date(rowData.birthday).toLocaleDateString('vi-VN')} header="Birthday" style={{ width: "15%" }} />
                    <Column field="sex" header="Sex" style={{ width: "8%" }} />
                    <Column field="address" header="Address" style={{ width: "20%" }} />
                    <Column field="email" header="Email" style={{ width: "20%" }} />
                    <Column field="phone" header="Phone" style={{ width: "15%" }} />
                    <Column field="role_user" header="Role" style={{ width: "10%" }} />
                    <Column header="Sửa" body={(rowData) => (
                        <Button
                            label="Sửa"
                            icon="pi pi-pencil"
                            className="p-button-rounded p-button-info"
                            onClick={() => handleEdit(rowData)}
                        />
                    )} style={{ width: "5%" }} />
                    <Column header="Xóa" body={(rowData) => (
                        <Button
                            label="Xóa"
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-danger"
                            onClick={() => btnDelete(rowData)}
                        />
                    )} style={{ width: "5%" }} />
                </DataTable>
            </div>
        </div>
    );
}
