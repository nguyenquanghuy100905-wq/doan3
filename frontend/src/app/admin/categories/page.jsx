"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { FileUpload } from "primereact/fileupload";
const infor = {
    id: "",
    name: "",
    description: "",
    image: null,
};

export default function Page() {
    const [dataCategories, setDataCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItem, setSearchItem] = useState("");
    const [categories, setCategories] = useState(infor);
    const [form, setForm] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [title, setTitle] = useState("");
    const fileUploadRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const msgs = useRef(null);
    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setCategories({ ...categories, image: file });
        }
    };

    const imageTemplate = (rowData) => (
        <img
            src={`http://localhost:3000${rowData.image}`}
            alt="content"
            className="w-30 h-30 object-cover border"
        />
    );
    const resetForm = () => {
        setCategories(infor);
        setAddCategory(false);
        setEditCategory(false);
        setPreviewImage(null);
    };

    const handleChange = (e, field) => {
        const { name, value } = e.target;
        setCategories((prevState) => ({
            ...prevState,
            [field]: value,
            [name]: value.trimStart()
        }));
    };


    useEffect(() => {
        const dataCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/categories/getAllCategories");
                setDataCategories(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        dataCategories();
    }, []);

    const handleEdit = (rowData) => {
        setTitle("Cập Nhật Thông Tin DANH MỤC SẢN Phẩm");
        setCategories(rowData);
        setForm(true);
        setEditCategory(true);
        setAddCategory(false);
        setPreviewImage(rowData.image ? `http://localhost:3000${rowData.image}` : null);
    };

    const handleAdd = () => {
        setTitle("Nhập Thông Tin DANH MỤC SẢN Phẩm")
        resetForm();
        setForm(true);
        setAddCategory(true);
        setEditCategory(false)
    };
    const checknull = (data) => {
        const name = data.name?.trim();
        if (!name) {
            msgs.current.show([
                {
                    severity: 'warn',
                    summary: 'Cảnh báo',
                    detail: 'Tên DANH MỤC SẢN phẩm không được để trống',
                    life: 3000
                }
            ]);
            return true;
        }
        return false;
    };

    const btnAdd = async (e) => {
        e.preventDefault();

        const data = {
            ...categories,
            name: categories.name.trim(),
            description: categories.description.trim()
        };

        if (checknull(data)) return;

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "image" && categories.image instanceof File) {
                formData.append("file", categories.image);
            } else {
                formData.append(key, data[key]);
            }
        });

        try {
            await axios.post("http://localhost:3000/categories/createCategories", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            msgs.current.show([
                {
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Thêm danh mục sản phẩm thành công',
                    life: 3000
                }
            ]);
            window.location.reload();
            setForm(false);
            resetForm();
        } catch (error) {
            console.error('Lỗi:', error);
            msgs.current.show([
                {
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Thêm danh mục thất bại',
                    life: 3000
                }
            ]);
        }
    };

    const btnUpdate = async (e) => {
        e.preventDefault();

        const data = {
            ...categories,
            name: categories.name.trim(),
            description: categories.description.trim()
        };

        if (checknull(data)) return;

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "image" && data.image instanceof File) {
                formData.append("file", data.image);
            } else {
                formData.append(key, data[key]);
            }
        });

        try {
            const res = await axios.put("http://localhost:3000/categories/updateCategories", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: { id: data.id }
            });

            msgs.current.show([
                {
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Cập nhật danh mục sản phẩm thành công',
                    life: 3000
                }
            ]);

            window.location.reload();
            setForm(false);
            resetForm();
        } catch (error) {
            console.error('Lỗi:', error);
            msgs.current.show([
                {
                    severity: 'error',
                    summary: 'Thất bại',
                    detail: 'Cập nhật danh mục thất bại',
                    life: 3000
                }
            ]);
        }
    };

    const btnDelete = async (rowData) => {
        if (confirm("Bạn có chắc muốn xóa DANH MỤC SẢN phẩm này?")) {
            try {
                await axios.delete(`http://localhost:3000/categories/deleteCategories`, {
                    params: { id: rowData.id }
                });
                setDataCategories(dataCategories.filter((item) => item.id !== rowData.id));
                msgs.current.show([
                    {
                        severity: 'success',
                        summary: 'Xóa Thành Công',
                        detail: `Xóa danh mục sản phẩm: " ${rowData.name} " thành công`,
                        life: 3000
                    }
                ]);
            } catch (error) {
                alert("Lỗi khi xóa danh mục sản phẩm: " + error.message);
            }
        }
    }
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={msgs} />
            <div className="flex w-full my-3 justify-between">
                <div className="flex flex-1 max-w-lg relative">
                    <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục sản phẩm..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                    />
                </div>
                <Button label="Thêm danh mục sản phẩm" icon="pi pi-plus" className="p-button-success" onClick={handleAdd} />
            </div>
            <Dialog
                visible={form}
                style={{ width: '60vw', maxHeight: '90vh' }}
                modal
                draggable
                onHide={() => setForm(false)}
            >
                <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold text-center text-orange-600">{title}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText
                                    id="id"
                                    name="id"
                                    value={categories.id}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="id">Id Danh Mục Sản Phẩm</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={categories.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="name">Tên Danh Mục Sản Phẩm</label>
                            </FloatLabel>
                        </div>
                    </div>

                    <div className="mb-4 w-full">
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                name="description"
                                value={categories.description}
                                onChange={handleChange}
                                rows={5}
                                cols={30}
                                className="w-full text-gray-700"
                            />
                            <label htmlFor="description">Mô Tả</label>
                        </FloatLabel>
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
                                        className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                        onClick={() => {
                                            setPreviewImage(null);
                                            setCategories({ ...categories, image: null });
                                            fileUploadRef.current.clear();
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2">
                        {editCategory && (
                            <Button
                                type="button"
                                label="Cập nhật"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                onClick={btnUpdate}
                            />
                        )}
                        {addCategory && (
                            <Button
                                type="submit"
                                label="Thêm"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                onClick={btnAdd}
                            />
                        )}
                    </div>
                </div>
            </Dialog>
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">DANH MỤC SẢN PHẨM</h2>

            <div className="card mt-6">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <DataTable
                    value={dataCategories.filter((p) =>
                        (p.name || "").toLowerCase().includes((searchItem || "").toLowerCase())
                    )}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    tableStyle={{ minWidth: "85rem" }}
                    loading={loading}
                >
                    <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "5%" }} />
                    <Column field="name" header="Tên Danh Mục Sản Phẩm" style={{ width: "30%" }} />
                    <Column field="description" header="Mô Tả Danh Mục Sản Phẩm" style={{ width: "30%" }} />
                    <Column header="Image" body={imageTemplate} style={{ width: "15%" }} />
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
