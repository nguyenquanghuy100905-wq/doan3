"use client";
import React, { useState, useEffect, useRef } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import Link from "next/link";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { Helmet } from "react-helmet";
export default function page() {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [giohang, setGioHang] = useState([]);
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState({
    id: 0,
    user_id: 0,
    payment_method_id: 0,
    promotion_id: "",
    status: "Đang Xử Lý",
    note: "",
    address: null,
    total: 0,
  });
  const items = [
    {
      label: "Giỏ Hàng",
      template: () => (
        <Link href={`/nguoidung/giohang`} className="text-[20px] mx-2">
          Giỏ Hàng
        </Link>
      ),
    },
    {
      label: "Thanh Toán",
      template: () => (
        <Link
          href="/nguoidung/thanhtoan"
          className="text-[20px] mx-2 text-orange-600 font-semibold"
        >
          Thanh Toán
        </Link>
      ),
    },
  ];
  const home = {
    icon: "pi pi-home",
    url: "http://localhost:4000/nguoidung/trangchu",
  };
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

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách tỉnh/thành phố:", error);
      }
    };
    fetchCities();
  }, []);
  useEffect(() => {
    if (!selectedCity) return;

    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`
        );
        setDistricts(response.data.districts);
        setSelectedDistrict(null);
        setWards([]);
      } catch (error) {
        console.error("Lỗi lấy huyện:", error);
      }
    };
    fetchDistricts();
  }, [selectedCity]);
  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchWards = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
        );
        setWards(response.data.wards);
        setSelectedWard(null);
      } catch (error) {
        console.error("Lỗi lấy xã:", error);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const [pay, setPay] = useState([]);
  const [selectPay, setSelectPay] = useState(null);
  useEffect(() => {
    const res = async () => {
      try {
        const response = await axios(
          "http://localhost:3000/paymentmethods/getAllPaymentmethods"
        );
        setPay(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    res();
  }, []);

  const [discount, setDiscount] = useState([]);
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
  const btnThanhToan = async () => {
    if (!user) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Vui lòng đăng nhập",
      });
      return;
    }
    if (!selectPay) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Vui lòng chọn phương thức thanh toán",
      });
      return;
    }
    if (!selectedCity || !selectedDistrict || !selectedWard || !order.address) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Vui lòng nhập điểm giao hàng",
      });
      return;
    }
    if (discount.end_date < new Date()) {
      toast.current.show({
        severity: "warn",
        summary: "Cảnh báo",
        detail: "Mã giảm giá hết hạn",
      });
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/orders/createOrders",
        {
          ...order,
          user_id: user.user.id,
          payment_method_id: selectPay.id,
          promotion_id: discount?.id || null,
          address: `${order.address}, ${selectedWard.name}, ${selectedDistrict.name}, ${selectedCity.name}`,
          note: order.note,
          total: tongtien,
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Thành công",
        detail: "Thanh toán thành công",
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Không thể thanh toán",
      });
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang Thanh Toán QuangHuyMobile</title>
      </Helmet>
      <Toast ref={toast} position="top-right" />
      <div className="w-full flex p-5 justify-center">
        <BreadCrumb model={items} className="space-x-2" home={home} />
      </div>
      <div className="container mx-auto">
        <div className="grid my-4 grid-cols-1 space-x-2 md:grid-cols-5">
          <div className="col-span-3 rounded-lg h-full border-1 border-gray-200">
            <h2 className="text-[30px] font-[600] m-2 text-black">Thông Tin Thanh Toán</h2>
            <div className="w-full mt-5 p-2">
              <FloatLabel>
                <InputText
                  id="name"
                  value={user?.user.name || ""}
                  disabled
                  className="w-full"
                  onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="name" className="text-black">Họ Và Tên</label>
              </FloatLabel>
            </div>
            <div className="grid grid-cols-1 mt-4 p-2 space-x-9 md:grid-cols-2">
              <div className="col-span-1">
                <FloatLabel>
                  <InputText
                    id="Phone"
                    value={user?.user.phone || ""}
                    disabled
                    className="w-full"
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <label htmlFor="Phone" className="text-black">Phone</label>
                </FloatLabel>
              </div>
              <div className="col-span-1">
                <FloatLabel>
                  <InputText
                    id="Email"
                    value={user?.user.email || ""}
                    disabled
                    className="w-full"
                    onChange={(e) => setUser(e.target.value)}
                  />
                  <label htmlFor="Email" className="text-black">Email</label>
                </FloatLabel>
              </div>
            </div>
            <div className="grid grid-cols-1 p-2 space-x-9 md:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="cities" className="block mb-2 font-medium text-black">
                  Tỉnh/Thành phố
                </label>
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Chọn Tỉnh/Thành phố"
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="cities" className="block mb-2 font-medium text-black">
                  Quận/Huyện
                </label>
                <Dropdown
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.value)}
                  options={districts}
                  optionLabel="name"
                  placeholder="Chọn Quận/Huyện"
                  className="w-full"
                  disabled={!selectedCity}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 p-2 space-x-9 md:grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="cities" className="block mb-2 font-medium text-black">
                  Phường/Xã
                </label>
                <Dropdown
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.value)}
                  options={wards}
                  optionLabel="name"
                  placeholder="Chọn Phường/Xã"
                  className="w-full"
                  disabled={!selectedDistrict}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="ThanhToan" className="block mb-2 font-medium text-black">
                  Phương Thức Thanh Toán
                </label>
                <Dropdown
                  value={selectPay}
                  onChange={(e) => setSelectPay(e.value)}
                  options={pay}
                  optionLabel="name"
                  placeholder="Chọn Phương Thức Thanh Toán"
                  className="w-full"
                />
              </div>
            </div>
            <div className="m-2">
              <InputTextarea
                value={order.address || ""}
                className="w-full"
                placeholder="Nhập địa chỉ cụ thể"
                onChange={(e) =>
                  setOrder({ ...order, address: e.target.value })
                }
                rows={5}
                cols={30}
              />
            </div>
            <div className="mt-5">
              <h2 className="text-[30px] font-[600] m-2 text-black">Thông Tin Bổ Sung</h2>
              <p className="m-2 text-black italic">
                Ghi chú đơn hàng (tùy chọn){" "}
              </p>
              <div className="m-2">
                <InputTextarea
                  value={order.note || ""}
                  className="w-full"
                  placeholder="Nhập thông tin phụ"
                  onChange={(e) => setOrder({ ...order, note: e.target.value })}
                  rows={5}
                  cols={30}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 rounded-2xl h-full border-2 border-orange-500 shadow-md p-4 bg-white">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              ĐƠN HÀNG CỦA BẠN
            </h2>
            <div className="h-[450px] border border-gray-300 rounded-lg p-2 overflow-y-auto">
              {giohang.length === 0 ? (
                <p className="text-center italic text-gray-500">
                  Giỏ hàng của bạn đang trống.
                </p>
              ) : (
                giohang.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 border-b-1 border-gray-300  pb-3"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:3000${item.image && item.image.length > 0 ? item.image[0] : '/public/images/default.jpeg'}`}
                        alt="Product"
                        className="w-20 h-20 rounded-lg border border-gray-200 object-cover"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-black">
                          {item.name}
                        </p>
                        <p className="text-black">
                          Số lượng:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-black">
                          Màu: <span className="font-medium">{item.color}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-bold text-red-600 whitespace-nowrap">
                      {Number(item.subtotal).toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                ))
              )}
            </div>
            <h2 className="text-[20px] font-bold text-black m-1 my-4">
              Mã Khuyến Mại
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full space-x-2 my-5">
              <div className="col-span-2">
                <FloatLabel className="w-full">
                  <InputText
                    id="KhuyenMai"
                    value={discount.id || ""}
                    className="w-full"
                    onChange={(e) =>
                      setDiscount({ ...discount, id: e.target.value })
                    }
                  />
                  <label htmlFor="KhuyenMai" className="text-black">Nhập mã khuyến mại</label>
                </FloatLabel>
              </div>
              <div className="col-span-1">
                <Button
                  label="Áp Dụng"
                  className="w-full"
                  icon="pi pi-check"
                  severity="secondary"
                  onClick={handleApplyDiscount}
                  loading={loading}
                />
              </div>
            </div>
            <div className="flex w-full space-x-2 my-5">
              <h2 className="text-[20px] font-bold text-black m-1">
                Tổng Tiền:{" "}
              </h2>
              <h2 className="text-[20px] font-bold text-orange-600 m-1">
                {Number(tongtien).toLocaleString("vi-VN") + " đ"}
              </h2>
            </div>
            <div className="mt-5">
              <Button
                label="Đặt Hàng"
                className="w-full"
                icon="pi pi-check"
                severity="success"
                onClick={btnThanhToan}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
