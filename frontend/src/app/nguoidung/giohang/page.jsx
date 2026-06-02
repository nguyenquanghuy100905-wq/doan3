"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Link from "next/link";
export default function Page() {
  const [giohang, setGioHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      const parsedData = JSON.parse(data);
      setUser(parsedData);
    }
  }, []);

  useEffect(() => {
    const fetchGioHang = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cart/getAllCart`,
          {
            params: {
              id: user?.user.id,
            },
          }
        );
        setGioHang(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (user) fetchGioHang();
  }, [user]);

  const imageTemplate = (rowData) => {
    const images = rowData.image || rowData.images || [];
    const imgPath = (images && images.length > 0) ? images[0] : null;
    return (
      <img
        src={imgPath ? `http://localhost:3000${imgPath}` : "https://placehold.co/100x100?text=No+Image"}
        alt="Product"
        className="w-24 h-24 rounded-lg border-gray-300 object-cover border-1"
      />
    );
  };

  const handleQuantityChange = (e, index) => {
    const updatedCart = [...giohang];
    updatedCart[index].quantity = e.value;
    updatedCart[index].subtotal = updatedCart[index].newprice * e.value;
    setGioHang(updatedCart);
  };

  const countTemplate = (rowData, { rowIndex }) => {
    return (
      <InputNumber
        value={giohang[rowIndex]?.quantity}
        onValueChange={(e) => handleQuantityChange(e, rowIndex)}
        showButtons
        buttonLayout="horizontal"
        step={1}
        min={1}
        inputClassName="text-center w-20"
        decrementButtonClassName="p-button-secondary"
        incrementButtonClassName="p-button-secondary"
        incrementButtonIcon="pi pi-plus"
        decrementButtonIcon="pi pi-minus"
      />
    );
  };

  const btnUpdate = async (rowData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/cart/updateCart`,
        {
          userId: user?.user.id,
          productId: rowData.product_id,
          newquantity: rowData.quantity,
        }
      );

      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Cập nhật thành công",
          detail: "Sản phẩm đã được cập nhật",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Cập nhật thất bại",
        detail: "Có lỗi xảy ra",
      });
    }
  };

  const btnDelete = async (rowData) => {
    if (!user) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Vui lòng đăng nhập để xóa sản phẩm",
      });
      return;
    }
    if (
      !window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/cart/deleteCart`, {
        data: {
          userId: user?.user.id,
          productId: rowData.product_id,
        },
      });
      toast.current.show({
        severity: "success",
        summary: "Xóa thành công",
        detail: "Sản phẩm đã được xóa",
      });
      setGioHang(
        giohang.filter((item) => item.product_id !== rowData.product_id)
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Xóa thất bại",
        detail: "Có lỗi xảy ra",
      });
    }
  };

  const [tongtien, setTongTien] = useState(0);
  const [oldTongTien, setOldTongTien] = useState(0);
  const total = () => {
    const sum = giohang.reduce((acc, item) => acc + (Number(item.subtotal) || 0), 0);
    setTongTien(sum);
    setOldTongTien(sum);
  };
  useEffect(() => {
    total();
  }, [giohang]);

  const [discount, setDiscount] = useState([]);
  const handleApplyDiscount = async () => {
    if (!discount.id || !user) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Vui lòng nhập mã giảm giá",
      });
      setTongTien(oldTongTien);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:3000/promotions/getPromotionsById",
        {
          params: {
            id: discount.id,
          },
        }
      );
      const date = new Date();
      const currentDate = date.toISOString().split("T")[0];
      if (
        res.data.start_date > currentDate ||
        res.data.end_date < currentDate
      ) {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: "Mã giảm giá không còn hiệu lực",
        });
        return;
      }
      if (res.data.is_active === 0) {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: "Mã giảm giá không hợp lệ hoặc đã hết hạn",
        });
        return;
      }
      if (res.data.quantity_promotion <= 0) {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: "Mã giảm giá không còn hiệu lực",
        });
        return;
      }
      if (res.data.discount_percentage <= 0) {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: "Mã giảm giá không hợp lệ",
        });
        return;
      }
      setDiscount(res.data);
      const newTotal =
        oldTongTien - (oldTongTien * res.data.discount_percentage) / 100;
      setTongTien(newTotal);
      toast.current.show({
        severity: "success",
        summary: "Thành công",
        detail: "Mã giảm giá đã được áp dụng",
      });
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Không thể áp dụng mã giảm giá",
      });
    }
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <Toast ref={toast} position="top-right" />
        <div className="grid grid-cols-4 gap-6 p-6">
          <div className="col-span-3 border-1 border-gray-300 bg-white p-4 shadow-md rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Giỏ hàng của bạn</h2>
            <DataTable
              value={giohang}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 50]}
              loading={loading}
              className="w-full"
              responsiveLayout="scroll"
            >
              <Column
                header="STT"
                body={(rowData, { rowIndex }) => rowIndex + 1}
                style={{ width: "5%" }}
              />
              <Column
                field="name"
                header="Tên sản phẩm"
                style={{ width: "25%" }}
              />
              <Column field="color" header="Màu" style={{ width: "15%" }} />
              <Column
                header="Hình ảnh"
                body={imageTemplate}
                style={{ width: "25%" }}
              />
              <Column
                field="price"
                header="Giá"
                body={(rowData) =>
                  Number(rowData.newprice).toLocaleString("vi-VN") + " đ"
                }
                style={{ width: "15%" }}
              />
              <Column
                body={countTemplate}
                header="Số lượng"
                style={{ width: "10%" }}
              />
              <Column
                header="Thành tiền"
                body={(rowData) =>
                  Number(rowData.subtotal).toLocaleString("vi-VN") + " đ"
                }
                style={{ width: "15%" }}
              />
              <Column
                header="Sửa"
                body={(rowData) => (
                  <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-info"
                    onClick={() => {
                      btnUpdate(rowData);
                    }}
                  />
                )}
                style={{ width: "7%" }}
              />
              <Column
                header="Xóa"
                body={(rowData) => (
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    onClick={() => {
                      btnDelete(rowData);
                    }}
                  />
                )}
                style={{ width: "7%" }}
              />
            </DataTable>
          </div>

          <div className="col-span-1 border-1 border-gray-300 bg-white p-6 shadow-md rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Tóm tắt đơn hàng</h3>
              <ul className="mb-4 space-y-2">
                {giohang.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between space-x-5 text-sm text-black"
                  >
                    <span>
                      [ {item.name} x {item.color} x {item.quantity} ]
                    </span>
                    <span className="text-orange-600">
                      {Number(item.subtotal).toLocaleString("vi-VN")} đ
                    </span>
                  </li>
                ))}
              </ul>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold text-black">
                <span>Tổng cộng:</span>
                <span className="text-green-600">
                  {Number(tongtien).toLocaleString("vi-VN") + " đ"}
                </span>
              </div>
            </div>
            <div className=" space-y-3 border-b-1 border-gray-300 pb-2">
              <FloatLabel>
                <InputText
                  id="discount"
                  className="w-full"
                  value={discount.id || ""}
                  onChange={(e) =>
                    setDiscount({ ...discount, id: e.target.value })
                  }
                />
                <label htmlFor="discount">MÃ GIẢM GIÁ</label>
              </FloatLabel>
              <Button
                label="Áp Dụng"
                severity="secondary"
                className="mt-6 w-full"
                onClick={handleApplyDiscount}
              />
            </div>
            <Link href="/nguoidung/thanhtoan" passHref legacyBehavior>
              <Button
                label="Thanh toán"
                icon="pi pi-credit-card"
                className="p-button-rounded p-button-success mt-6 w-full justify-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
