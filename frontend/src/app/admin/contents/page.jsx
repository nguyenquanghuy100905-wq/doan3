"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from "primereact/fileupload";
import { Search } from "lucide-react";
import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";

const infor = {
    id: "",
    type_id: "",
    title: "",
    content: "",
    image_path: "",
    created_at: "",
    updated_at: ""
}
export default function ContentsPage() {
    const [dataContents, setDataContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [addContents, setAddContents] = useState(false);
    const [editContents, setEditContents] = useState(false);
    const [title, setTitle] = useState("");
    const [searchContents, setsearchContents] = useState("");
    const [contents, setContents] = useState(infor)
    const fileUploadRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const toast = useRef(null);
    const handleFileUpload = (event) => {
        const file = event.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setContents({ ...contents, image_path: file });
        }
    };

    const imageTemplate = (rowData) => (
        <img
            src={`http://localhost:3000${rowData.image_path}`}
            alt="content"
            className="w-30 h-30 object-cover border"
        />
    );

    //getAllContents
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/contenttypes/getAllContenttypes",);
                setDataContents(response.data);
            } catch (error) {
                setError("lỗi lấy dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        fetchContents();
    }, []);

    //getAllType
    const [typeOptions, setTypeOptions] = useState([]);
    useEffect(() => {
        const dataType = async () => {
            try {
                const response = await axios.get("http://localhost:3000/types/getAllTypes",);
                setTypeOptions(response.data.map((type) => ({ label: type.name, value: type.id })));
            } catch (error) {
                setError("lỗi lấy dữ liệu.");
            }
        }
        dataType();
    }, []);

    //resetForm
    const resetForm = () => {
        setContents(infor);
        setAddContents(false);
        setEditContents(false);
        setPreviewImage(null);
        if (fileUploadRef.current) {
            fileUploadRef.current.clear();
        }
    };

    //handleChange
    const handleChange = (e, field) => {
        const { value } = e.target;
        setContents((prevcontent) => ({
            ...prevcontent,
            [field]: value,
        }));
    };

    const btnAddContents = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(contents).forEach((key) => {
                if (key === "image_path" && contents.image_path instanceof File) {
                    formData.append("file", contents.image_path);
                } else {
                    formData.append(key, contents[key]);
                }
            });

            await axios.post("http://localhost:3000/contenttypes/createContenttypes", formData);
            toast.current.show([
                {
                    severity: 'success',
                    summary: 'Thành công',
                    detail: 'Thêm nội dung thành công!',
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
                    detail: 'Thêm nội dung thất bại: ' + (error.response?.data?.message || error.message),
                    life: 3000
                }
            ]);
        }
    };

    const btnDelete = async (content) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa nội dung ${content.title}?`)) return;
        try {
            await axios.delete(`http://localhost:3000/contenttypes/deleteContenttypes`, {
                params: { id: content.id }
            });

            toast.current.show([
                {
                    severity: 'success',
                    summary: 'Thành công',
                    detail: `Xóa ${content.title} thành công!`,
                    life: 3000
                }
            ]);
            setDataContents(dataContents.filter((u) => u.id !== content.id));
        } catch (error) {
            console.error("Lỗi khi xóa nội dung:", error.response?.data || error.message);
            alert("Lỗi khi xóa nội dung: " + JSON.stringify(error.response?.data || error.message));
        }
    };

    const btnUpdateContents = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(contents).forEach((key) => {
                if (key === "image_path" && contents.image_path instanceof File) {
                    formData.append("file", contents.image_path);
                } else {
                    formData.append(key, contents[key]);
                }
            });

            await axios.put(`http://localhost:3000/contenttypes/updateContenttypes`, formData, {
                params: { id: contents.id }
            });
            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: "Cập nhật nội dung thành công!",
                life: 3000,
            });
            setShowForm(false);
            resetForm();
            window.location.reload();
        } catch (err) {
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: `Cập nhật nội dung thất bại: ${err.response?.data?.message || err.message}`,
                life: 3000,
            });
        }
    };

    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const dataSearchContents = dataContents.filter((content) => {
        const matchSearch = content.title.toLowerCase().includes(searchContents.toLowerCase())
            || content.type_name.toLowerCase().includes(searchContents.toLowerCase());
        const matchType = !selectedTypeId || content.type_id === selectedTypeId;
        return matchSearch && matchType;
    });

    // --------------------------------------------------
    const handleAdd = () => {
        setTitle("Nhập Thông Tin Người Dùng")
        resetForm();
        setShowForm(true);
        setAddContents(true);
        setEditContents(false)
    };
    const handleEdit = (rowData) => {
        setTitle("Cập Nhật Thông Tin Người Dùng");
        setContents({
            ...rowData,
            created_at: rowData.created_at ? new Date(rowData.created_at) : null,
            updated_at: rowData.updated_at ? new Date(rowData.updated_at) : null
        });
        setPreviewImage(rowData.image_path ? `http://localhost:3000${rowData.image_path}` : null);
        setShowForm(true);
        setEditContents(true);
        setAddContents(false);
    };
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={toast} />
            <div className="flex w-full mb-9 justify-between">
                <div className="flex flex-1 flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div className="relative w-full max-w-md">
                        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm nội dung..."
                            value={searchContents}
                            onChange={(e) => setsearchContents(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="w-full max-w-xs">
                        <FloatLabel>
                            <Dropdown
                                id="typeFilter"
                                value={selectedTypeId}
                                options={typeOptions}
                                onChange={(e) => setSelectedTypeId(e.value)}
                                placeholder="Chọn loại"
                                className="w-full"
                                showClear
                            />
                            <label htmlFor="typeFilter">Loại Điện Thoại</label>
                        </FloatLabel>

                    </div>
                </div>

                <Button icon="pi pi-user" rounded outlined onClick={handleAdd} severity="info" aria-label="content" />
            </div>
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">Thông Tin Về Loại Điện Thoại</h2>
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
                                <InputText id="id" value={contents.id} disabled className="w-full" onChange={(e) => handleChange(e, "id")} />
                                <label htmlFor="id">ID</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Dropdown id="typeid" value={contents.type_id} options={typeOptions} onChange={(e) => setContents({ ...contents, type_id: e.value })} showClear placeholder="Chọn loại" className="w-full col-span-2" />
                                <label htmlFor="typeid">Type</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4 col-span-2 w-full">
                            <FloatLabel>
                                <InputText id="title" value={contents.title} className="w-full" onChange={(e) => handleChange(e, "title")} />
                                <label htmlFor="title">Title</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4 col-span-2 w-full">
                            <FloatLabel>
                                <InputTextarea
                                    id="content"
                                    name="content"
                                    value={contents.content}
                                    onChange={(e) => handleChange(e, "content")}
                                    rows={5}
                                    cols={30}
                                    className="w-full text-gray-700"
                                />
                                <label htmlFor="content">Mô Tả</label>
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
                                                setContents({ ...contents, image_path: null });
                                                fileUploadRef.current.clear();
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Calendar inputId="created_at" value={contents.created_at} className="w-full" onChange={(e) => setContents({ ...contents, created_at: e.value })} />
                                <label htmlFor="created_at">Created At</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <Calendar inputId="updated_at" value={contents.created_at} className="w-full" onChange={(e) => setContents({ ...contents, updated_at: e.value })} />
                                <label htmlFor="updated_at">Updated At</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4 col-span-2">
                            <div className="col-span-2">
                                {editContents && (
                                    <Button
                                        type="button"
                                        label="Cập nhật"
                                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                        onClick={btnUpdateContents}
                                    />
                                )}
                                {addContents && (
                                    <Button
                                        type="submit"
                                        label="Thêm"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                        onClick={btnAddContents}
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
                    value={dataSearchContents}
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
                    <Column field="type_name" header="Type" style={{ width: "15%" }} />
                    <Column header="Image" body={imageTemplate} style={{ width: "15%" }} />
                    <Column field="title" header="Title" style={{ width: "8%" }} />
                    <Column field="content" header="Content" style={{ width: "20%" }} />
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
