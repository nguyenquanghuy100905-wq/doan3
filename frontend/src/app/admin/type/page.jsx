"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { Dialog } from 'primereact/dialog';

const infor = {
    id: "",
    name: ""
};

export default function Page() {
    const [datatypes, setDatatypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchItem, setSearchItem] = useState("");
    const [types, settypes] = useState(infor);
    const [form, setForm] = useState(false);
    const [addtype, setAddtype] = useState(false);
    const [edittype, setEdittype] = useState(false);
    const [title, setTitle] = useState("");
    const msgs = useRef(null);
    const resetForm = () => {
        settypes(infor);
        setAddtype(false);
        setEdittype(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        settypes((prevState) => ({
            ...prevState,
            [name]: value.trimStart()
        }));
    };


    useEffect(() => {
        const datatypes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/types/getAlltypes");
                setDatatypes(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        datatypes();
    }, []);

    const handleEdit = (rowData) => {
        setTitle("Cập Nhật Thông Tin Loại Sản Phẩm");
        settypes(rowData);
        setForm(true);
        setEdittype(true);
        setAddtype(false);
    };

    const handleAdd = () => {
        setTitle("Nhập Thông Tin Loại Sản Phẩm")
        resetForm();
        setForm(true);
        setAddtype(true);
        setEdittype(false)
    };
    const checknull = (data) => {
        const name = data.name?.trim();
        if (!name) {
            msgs.current.show([
                {
                    severity: 'warn',
                    summary: 'Cảnh báo',
                    detail: 'Tên loại sản phẩm không được để trống',
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
            ...types,
            name: types.name.trim()
        }
        if (checknull(data)) return;

        try {
            await axios.post("http://localhost:3000/types/createtypes", data);
            msgs.current.show([
                {
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Thêm loại sản phẩm thành công',
                    life: 3000
                }
            ]);
            setDatatypes(prev => [...prev, data]);
            setForm(false);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };
    const btnUpdate = async (e) => {
        e.preventDefault();
        const data = {
            ...types,
            name: types.name.trim()
        }
        if (checknull(data)) return;

        try {
            await axios.put("http://localhost:3000/types/updatetypes", data, {
                params: { id: data.id }
            });
            msgs.current.show([
                {
                    severity: 'success',
                    summary: 'Thành Công',
                    detail: 'Cập nhật loại sản phẩm thành công',
                    life: 3000
                }
            ]);
            setDatatypes(prev => prev.map(item => item.id === data.id ? data : item));
            setForm(false);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }
    const btnDelete = async (rowData) => {
        if (confirm("Bạn có chắc muốn xóa loại sản phẩm này?")) {
            try {
                await axios.delete(`http://localhost:3000/types/deletetypes`, {
                    params: { id: rowData.id }
                });
                setDatatypes(datatypes.filter((item) => item.id !== rowData.id));
                msgs.current.show([
                    {
                        severity: 'success',
                        summary: 'Xóa Thành Công',
                        detail: `Xóa loại sản phẩm: " ${rowData.name} " thành công`,
                        life: 3000
                    }
                ]);
            } catch (error) {
                alert("Lỗi khi xóa loại sản phẩm: " + error.message);
            }
        }
    }
    const filterTypes =  datatypes.filter((p) => p.name.toLowerCase().includes(searchItem.toLowerCase()));
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={msgs} />
            <div className="flex w-full my-3 justify-between">
                <div className="flex flex-1 max-w-lg relative">
                    <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm loại sản phẩm..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                    />
                </div>
                <Button label="Thêm loại sản phẩm" icon="pi pi-plus" className="p-button-success" onClick={handleAdd} />
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
                                    value={types.id}
                                    onChange={handleChange}
                                    disabled
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="id">Id Sản Phẩm</label>
                            </FloatLabel>
                        </div>
                        <div className="mb-4">
                            <FloatLabel>
                                <InputText
                                    id="name"
                                    name="name"
                                    value={types.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="name">Tên Sản Phẩm</label>
                            </FloatLabel>
                        </div>
                    </div>

                    <div className="col-span-2">
                        {edittype && (
                            <Button
                                type="button"
                                label="Cập nhật"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                onClick={btnUpdate}
                            />
                        )}
                        {addtype && (
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
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">LOẠI SẢN PHẨM</h2>

            <div className="card mt-6">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <DataTable
                    value={filterTypes}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    tableStyle={{ minWidth: "85rem" }}
                    loading={loading}
                >
                    <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "5%" }} />
                    <Column field="name" header="Tên Sản Phẩm" style={{ width: "30%" }} />
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
