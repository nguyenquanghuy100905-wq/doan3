"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Gift, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "primereact/button";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

const initialPromotion = {
    id: "",
    title: "",
    description: "",
    discount_percentage: 0,
    start_date: "",
    end_date: "",
    quantity_promotion: 0,
    is_active: 1
};

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [promotion, setPromotion] = useState(initialPromotion);
    const [formVisible, setFormVisible] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const toast = useRef(null);

    const activeOptions = [
        { label: "Hoạt động", value: 1 },
        { label: "Tạm ngưng", value: 0 }
    ];

    const resetForm = () => {
        setPromotion(initialPromotion);
        setIsAddMode(false);
        setIsEditMode(false);
    };

    const fetchPromotions = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/promotions/getAllPromotions");
            setPromotions(response.data || []);
        } catch (err) {
            setError(err.message);
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Không thể lấy danh sách khuyến mãi",
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPromotion((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (value, name) => {
        setPromotion((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdd = () => {
        setDialogTitle("Thêm Mã Khuyến Mãi Mới");
        resetForm();
        setIsAddMode(true);
        setFormVisible(true);
    };

    const handleEdit = (rowData) => {
        setDialogTitle("Cập Nhật Mã Khuyến Mãi");
        const formattedData = {
            ...rowData,
            start_date: rowData.start_date ? rowData.start_date.split("T")[0] : "",
            end_date: rowData.end_date ? rowData.end_date.split("T")[0] : ""
        };
        setPromotion(formattedData);
        setIsEditMode(true);
        setIsAddMode(false);
        setFormVisible(true);
    };

    const validateForm = () => {
        if (!promotion.id?.trim()) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Vui lòng nhập Mã code", life: 3000 });
            return false;
        }
        if (!promotion.title?.trim()) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Vui lòng nhập Tiêu đề", life: 3000 });
            return false;
        }
        if (!promotion.description?.trim()) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Vui lòng nhập Mô tả", life: 3000 });
            return false;
        }
        if (promotion.discount_percentage <= 0 || promotion.discount_percentage > 100) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Tỷ lệ giảm giá từ 1 đến 100%", life: 3000 });
            return false;
        }
        if (!promotion.start_date) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Vui lòng chọn Ngày bắt đầu", life: 3000 });
            return false;
        }
        if (!promotion.end_date) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Vui lòng chọn Ngày kết thúc", life: 3000 });
            return false;
        }
        if (promotion.start_date > promotion.end_date) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Ngày kết thúc phải lớn hơn ngày bắt đầu", life: 3000 });
            return false;
        }
        if (promotion.quantity_promotion < 0) {
            toast.current.show({ severity: "warn", summary: "Cảnh báo", detail: "Số lượng khuyến mãi không hợp lệ", life: 3000 });
            return false;
        }
        return true;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const requestData = {
            ...promotion,
            id: promotion.id.trim(),
            title: promotion.title.trim(),
            description: promotion.description.trim()
        };

        try {
            if (isAddMode) {
                // Check if ID already exists
                const existing = promotions.find(p => p.id.toLowerCase() === requestData.id.toLowerCase());
                if (existing) {
                    toast.current.show({
                        severity: "error",
                        summary: "Lỗi",
                        detail: "Mã khuyến mãi này đã tồn tại",
                        life: 3000
                    });
                    return;
                }

                await axios.post("http://localhost:3000/promotions/createPromotions", requestData);
                toast.current.show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Thêm mã khuyến mãi thành công",
                    life: 3000
                });
            } else if (isEditMode) {
                await axios.put("http://localhost:3000/promotions/updatePromotions", requestData, {
                    params: { id: requestData.id }
                });
                toast.current.show({
                    severity: "success",
                    summary: "Thành công",
                    detail: "Cập nhật mã khuyến mãi thành công",
                    life: 3000
                });
            }
            setFormVisible(false);
            resetForm();
            fetchPromotions();
        } catch (err) {
            console.error(err);
            toast.current.show({
                severity: "error",
                summary: "Thất bại",
                detail: err.response?.data?.message || "Có lỗi xảy ra khi lưu mã khuyến mãi",
                life: 3000
            });
        }
    };

    const handleDelete = async (rowData) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa mã khuyến mãi "${rowData.id}"?`)) return;

        try {
            await axios.delete("http://localhost:3000/promotions/deletePromotions", {
                params: { id: rowData.id }
            });
            toast.current.show({
                severity: "success",
                summary: "Thành công",
                detail: `Xóa mã khuyến mãi "${rowData.id}" thành công`,
                life: 3000
            });
            fetchPromotions();
        } catch (err) {
            console.error(err);
            toast.current.show({
                severity: "error",
                summary: "Lỗi",
                detail: "Không thể xóa mã khuyến mãi này",
                life: 3000
            });
        }
    };

    const filteredPromotions = promotions.filter((p) =>
        (p.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN");
    };

    const discountBodyTemplate = (rowData) => {
        return <span className="font-bold text-red-600">-{rowData.discount_percentage}%</span>;
    };

    const statusBodyTemplate = (rowData) => {
        const isActive = rowData.is_active === 1;
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {isActive ? "Hoạt động" : "Tạm ngưng"}
            </span>
        );
    };

    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={toast} />
            <div className="flex w-full my-3 justify-between items-center">
                <div className="flex flex-1 max-w-lg relative">
                    <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã khuyến mãi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
                    />
                </div>
                <Button
                    label="Thêm khuyến mãi"
                    icon={<Plus size={18} className="mr-2" />}
                    className="p-button-success !bg-green-600 !border-green-600 hover:!bg-green-700"
                    onClick={handleAdd}
                />
            </div>

            <Dialog
                visible={formVisible}
                style={{ width: "60vw", maxHeight: "90vh" }}
                modal
                draggable
                onHide={() => setFormVisible(false)}
            >
                <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold text-center text-orange-600 flex items-center justify-center gap-2">
                        <Gift className="text-orange-500" /> {dialogTitle}
                    </h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <FloatLabel>
                                <InputText
                                    id="promo-id"
                                    name="id"
                                    value={promotion.id}
                                    onChange={handleInputChange}
                                    disabled={isEditMode}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="promo-id">Mã Code (Ví dụ: KM10)</label>
                            </FloatLabel>
                        </div>
                        <div className="col-span-1">
                            <FloatLabel>
                                <InputText
                                    id="promo-title"
                                    name="title"
                                    value={promotion.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="promo-title">Tiêu Đề Khuyến Mãi</label>
                            </FloatLabel>
                        </div>
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputTextarea
                                    id="promo-desc"
                                    name="description"
                                    value={promotion.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-2 border rounded-lg"
                                />
                                <label htmlFor="promo-desc">Mô Tả Chi Tiết</label>
                            </FloatLabel>
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Tỷ lệ giảm giá (%)</label>
                            <InputNumber
                                value={promotion.discount_percentage}
                                onValueChange={(e) => handleNumberChange(e.value, "discount_percentage")}
                                min={1}
                                max={100}
                                suffix="%"
                                className="w-full"
                                inputClassName="p-2 border rounded-lg"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Số lượng mã phát hành</label>
                            <InputNumber
                                value={promotion.quantity_promotion}
                                onValueChange={(e) => handleNumberChange(e.value, "quantity_promotion")}
                                min={0}
                                className="w-full"
                                inputClassName="p-2 border rounded-lg"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                            <input
                                type="date"
                                name="start_date"
                                value={promotion.start_date}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Ngày kết thúc</label>
                            <input
                                type="date"
                                name="end_date"
                                value={promotion.end_date}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Trạng thái mã</label>
                            <Dropdown
                                value={promotion.is_active}
                                options={activeOptions}
                                onChange={(e) => handleNumberChange(e.value, "is_active")}
                                className="w-full"
                                placeholder="Chọn trạng thái"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 mt-6">
                        <Button
                            type="button"
                            label={isAddMode ? "Thêm Mới" : "Cập Nhật"}
                            className={`w-full text-white py-2 rounded-lg transition-colors ${
                                isAddMode 
                                    ? "bg-blue-600 hover:bg-blue-700 border-blue-600" 
                                    : "bg-green-600 hover:bg-green-700 border-green-600"
                            }`}
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </Dialog>

            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">QUẢN LÝ MÃ GIẢM GIÁ (PROMOTIONS)</h2>

            <div className="card mt-6">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <DataTable
                    value={filteredPromotions}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    tableStyle={{ minWidth: "80rem" }}
                    loading={loading}
                >
                    <Column field="id" header="Mã Code" style={{ width: "12%" }} className="font-semibold text-gray-800" />
                    <Column field="title" header="Tiêu Đề" style={{ width: "18%" }} />
                    <Column field="description" header="Mô Tả" style={{ width: "25%" }} />
                    <Column header="Giảm giá" body={discountBodyTemplate} style={{ width: "10%" }} />
                    <Column header="Bắt đầu" body={(rowData) => formatDate(rowData.start_date)} style={{ width: "10%" }} />
                    <Column header="Kết thúc" body={(rowData) => formatDate(rowData.end_date)} style={{ width: "10%" }} />
                    <Column field="quantity_promotion" header="Số lượng còn lại" style={{ width: "10%" }} />
                    <Column header="Trạng thái" body={statusBodyTemplate} style={{ width: "10%" }} />
                    <Column
                        header="Sửa"
                        body={(rowData) => (
                            <Button
                                icon={<Edit size={16} />}
                                className="p-button-rounded p-button-info p-button-outlined"
                                onClick={() => handleEdit(rowData)}
                            />
                        )}
                        style={{ width: "5%" }}
                    />
                    <Column
                        header="Xóa"
                        body={(rowData) => (
                            <Button
                                icon={<Trash2 size={16} />}
                                className="p-button-rounded p-button-danger p-button-outlined"
                                onClick={() => handleDelete(rowData)}
                            />
                        )}
                        style={{ width: "5%" }}
                    />
                </DataTable>
            </div>
        </div>
    );
}
