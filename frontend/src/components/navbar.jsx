"use client";
import Image from "next/image";
import logo from "@/ImageJeepBicycle/TrangChu03.png";
import imgVN from "@/ImageJeepBicycle/icon2.svg";
import imgUS from "@/ImageJeepBicycle/icon1.svg";
import Link from "next/link";
import axios from "axios";
import imgDefault from "@/ImageJeepBicycle/default.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faL,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import styleNavbar from "@/styles/navbar.module.css";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
export default function Navbar() {
  const pathName = usePathname();
  const [hideCart, sethideCart] = useState(true);
  const [hideInfo, sethideInfo] = useState(true);
  const [hideSearch, sethideSearch] = useState(true);
  const [category, setCategory] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [checkCart, setCheckCart] = useState(true);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  function dangxuat() {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      localStorage.removeItem("data");
      window.location.href = "/nguoidung/trangchu";
    }
  }
  const [data, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("data"));
    if (user) {
      if (user.user.role_user == 1) {
        setUser(user);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/getAllCategories"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/getAllProducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    if (!data) return;
    const fetchCart = async () => {
      try {
        const idus = data.user.id;
        const response = await axios.get(
          "http://localhost:3000/cart/getAllCart",
          {
            params: {
              id: idus,
            },
          }
        );
        if (response.data.length > 0) {
          setCart(response.data);
          setCheckCart(false);
        } else {
          setCheckCart(true);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [data]);
  const dataProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  const handleDelete = async (userId, productId) => {
    try {
      await axios.delete("http://localhost:3000/cart/deleteCart", {
        data: {
          userId,
          productId,
        },
      });
      setCart(cart.filter((item) => item.product_id !== productId));
      if (cart.length === 1) {
        setCheckCart(true);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
  const btnGioHang = () => {
    router.push("/nguoidung/giohang");
    sethideCart(!hideCart);
  };
  return (
    <header className="bg-white sticky top-0 z-10">
      <nav className="ml-6 mr-5 mx-auto  flex items-center justify-between py-4">
        <Link href="/" className="">
          <Image src={logo} alt="Logo" width={180} />
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          <Link
            href="/nguoidung/trangchu"
            className={
              pathName === "/nguoidung/trangchu"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            Trang chủ
          </Link>
          <Link
            href="/nguoidung/gioithieu"
            className={
              pathName === "/nguoidung/gioithieu"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            Giới thiệu
          </Link>
          <div className="relative group">
            <Link
              href="/nguoidung/sanpham"
              className={`p-3 relative ${
                pathName === "/nguoidung/sanpham"
                  ? styleNavbar.textActive
                  : styleNavbar.text
              } ${styleNavbar.product}`}
            >
              Sản Phẩm <FontAwesomeIcon icon={faCaretDown} />
            </Link>
            <ul
              className={`z-20 absolute  bg-white text-black shadow-lg shadow-black w-auto hidden group-hover:block`}
            >
              {category.map((item) => (
                <li
                  key={item.id}
                  className={`${styleNavbar.itemproducts} overflow-hidden`}
                >
                  <Link
                    href={`/nguoidung/sanpham?id=${item.id}`}
                    className="block p-4 transition-transform duration-300 hover:translate-x-2 whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/nguoidung/sanpham/khuyenmai"
            className={
              pathName === "/nguoidung/sanpham/khuyenmai"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            Khuyến Mại
          </Link>
          <Link
            href="/nguoidung/hethongquanly"
            className={
              pathName === "/nguoidung/hethongquanly"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            {" "}
            Hệ Thống Quản Lý
          </Link>
          <Link
            href="/nguoidung/tintuc"
            className={
              pathName === "/nguoidung/tintuc"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            Tin Tức
          </Link>
          <Link
            href="/nguoidung/lienhe"
            className={
              pathName === "/nguoidung/lienhe"
                ? styleNavbar.textActive
                : styleNavbar.text
            }
          >
            Liên Hệ
          </Link>
        </div>
        <ul className="flex gap-6 items-center font-bold">
          <li className="cursor-pointer">
            <button
              onClick={() => sethideSearch(!hideSearch)}
              className="w-10 h-10 rounded-full border border-gray-500 flex items-center hover:bg-orange-600 justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 font-bold hover:text-white text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </li>
          <li className="relative group">
            <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border border-gray-300 flex items-center justify-center">
              <Image
                src={imgVN}
                width={32}
                height={32}
                alt="Language Icon"
                className="w-full h-full object-cover"
              />
            </div>
            <ul className="absolute left-0 top-full bg-transparent text-black rounded-3xl overflow-hidden hidden group-hover:block">
              <li className=" mt-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border border-gray-300 flex items-center justify-center">
                  <Image
                    src={imgUS}
                    width={32}
                    height={32}
                    alt="Language Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="relative">
              <button
                onClick={() => sethideCart(!hideCart)}
                className="w-12 h-12 cursor-pointer rounded-xl overflow-hidden border border-amber-50 flex bg-orange-600 items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
              <span className="absolute top-0 right-0 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                {cart.length}
              </span>
            </div>
          </li>
          <li className="text-3xl">|</li>
          <li id="login" className="relative">
            {!data ? (
              <Link href="/loginFolder" className={styleNavbar.text}>
                Đăng Nhập
              </Link>
            ) : (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => sethideInfo(!hideInfo)}
              >
                <img
                  src={
                    data.user.image !== null
                      ? `http://localhost:3000${data.user.image}`
                      : imgDefault
                  }
                  className="w-12 h-12 rounded-full border-2 border-black object-cover"
                  alt="User Avatar"
                />
                <svg
                  className={`w-4 h-4 transition-transform ${
                    hideInfo ? "" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                {!hideInfo && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <Link
                      href="/nguoidung/trangchu"
                      className="block px-4 py-2 hover:bg-orange-600 hover:text-white border-b"
                    >
                      Quản Lý Tài Khoản
                    </Link>
                    <Link
                      href="/nguoidung/donhang"
                      className="block px-4 py-2 hover:bg-orange-600 hover:text-white border-b"
                    >
                      Quản Lý Đơn Hàng
                    </Link>
                    <button
                      onClick={dangxuat}
                      className="w-full text-left px-4 py-2 hover:bg-orange-600 hover:text-white"
                    >
                      Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
      {/* -------------------giỏ hàng ---------------- */}
      {hideCart ? null : (
        <div
          className={`cart w-xl top-0 right-0 absolute h-full min-h-screen border-1 border-gray-300 rounded-lg bg-white ${styleNavbar.listcart}`}
          id="listcart"
        >
          <div className="flex justify-end">
            <button
              onClick={() => sethideCart(true)}
              className="relative cursor-pointer m-3 border-2 border-black group hover:border-orange-600 rounded-full w-12 h-12 duration-500 overflow-hidden"
              type="button"
            >
              <p className="font-Manrope text-2xl h-full w-full flex items-center justify-center text-black duration-500 relative z-10 group-hover:scale-0">
                ×
              </p>
              <span className="absolute w-full h-full bg-orange-600 rotate-45 group-hover:top-9 duration-500 top-12 left-0" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 top-0 group-hover:left-9 duration-500 left-12" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 top-0 group-hover:right-9 duration-500 right-12" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 group-hover:bottom-9 duration-500 bottom-12 right-0" />
            </button>
          </div>
          <h2 className="text-[40px] text-center font-bold">Giỏ Hàng</h2>
          <div className="h-full">
            {checkCart ? (
              <div className="cart-body text-center py-8 text-gray-600">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-[90px] text-orange-600 mb-4"
                />
                <p className="mb-3 text-[18px] text-black">
                  Chưa có sản phẩm trong giỏ hàng.
                </p>
                <Link
                  href="/nguoidung/trangchu"
                  className="my-5 inline-block rounded-2xl px-4 py-4 font-[600] bg-orange-600 text-white hover:bg-white hover:text-orange-600 border-3 border-orange-600 hover:border-orange-600 transition duration-300"
                >
                  QUAY TRỞ LẠI CỬA HÀNG
                </Link>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex-1 overflow-y-auto border max-h-[60vh] border-gray-300 m-4 rounded-2xl p-4 bg-gray-50 shadow-inner">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-lg rounded-2xl p-5 mb-4 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={`http://localhost:3000${item.image && item.image.length > 0 ? item.image[0] : '/public/images/default.jpeg'}`}
                          alt="sanpham"
                          className="w-24 h-24 rounded-xl border border-gray-300 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Link
                              href={`/nguoidung/sanpham/${item.id}`}
                              className="hover:text-orange-600 transition-colors duration-200"
                            >
                              {item.name}
                            </Link>
                            <span className="italic font-normal text-sm text-gray-500">
                              ({item.color})
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            Giá sản phẩm:{" "}
                            <span className="font-semibold text-black">
                              {Number(item.newprice).toLocaleString("vi-VN")} đ
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            Số lượng:{" "}
                            <span className="font-semibold text-black">
                              {item.quantity}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 font-semibold">
                            Tổng tiền:{" "}
                            <span className="text-orange-600">
                              {Number(item.subtotal).toLocaleString("vi-VN")} đ
                            </span>
                          </p>
                        </div>

                        <Button
                          icon="pi pi-times"
                          rounded
                          outlined
                          severity="danger"
                          aria-label="Cancel"
                          className="hover:scale-110 transition-transform duration-200"
                          onClick={() =>
                            handleDelete(item.user_id, item.product_id)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-300 shadow-md rounded-b-xl mx-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Tổng tiền:{" "}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {cart
                      .reduce((acc, item) => acc + Number(item.subtotal), 0)
                      .toLocaleString("vi-VN")}{" "}
                    ₫
                  </p>
                </div>

                <div className="flex justify-center mt-6 mx-4 mb-4">
                  <Button
                    onClick={btnGioHang}
                    className="!bg-orange-500 w-full text-center text-white text-lg font-semibold px-6 py-4 rounded-xl !hover:bg-orange-600 transition duration-300 shadow-lg"
                    label="Giỏ Hàng"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* -------------------tìm kiếm------------------------ */}

      {hideSearch ? null : (
        <div
          id="search"
          className={`search w-full min-h-screen absolute ${styleNavbar.backgroundSearch} z-20 top-0`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => sethideSearch(true)}
              className="relative cursor-pointer m-3 border-2 border-white group hover:border-orange-600 rounded-full w-12 h-12 duration-500 overflow-hidden"
              type="button"
            >
              <p className="font-Manrope text-2xl h-full w-full flex items-center justify-center text-white  duration-500 relative z-10 group-hover:scale-0">
                ×
              </p>
              <span className="absolute w-full h-full bg-orange-600 rotate-45 group-hover:top-9 duration-500 top-12 left-0" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 top-0 group-hover:left-9 duration-500 left-12" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 top-0 group-hover:right-9 duration-500 right-12" />
              <span className="absolute w-full h-full bg-orange-600 rotate-45 group-hover:bottom-9 duration-500 bottom-12 right-0" />
            </button>
          </div>
          <div className="w-full h-screen relative flex justify-center items-center right-0">
            <div className="absolute top-20">
              <div className="relativew-xl" id="input">
                <input
                  defaultValue=""
                  placeholder="Search..."
                  className="block w-md text-sm h-[50px] px-4 text-[18px] text-slate-900 bg-white rounded-[40px] border border-slate-200 appearance-none focus:border-transparent focus:outline-primary focus:ring-0 hover:border-brand-500-secondary peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                  id="floating_outlined"
                  onChange={(e) => setSearchItem(e.target.value)}
                  type="text"
                />
                <label
                  className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white data-[disabled]:bg-gray-50-background px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor="floating_outlined"
                >
                  Search...
                </label>
                <div className="absolute top-3 right-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="slate-300"
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                  >
                    <path d="M10.979 16.8991C11.0591 17.4633 10.6657 17.9926 10.0959 17.9994C8.52021 18.0183 6.96549 17.5712 5.63246 16.7026C4.00976 15.6452 2.82575 14.035 2.30018 12.1709C1.77461 10.3068 1.94315 8.31525 2.77453 6.56596C3.60592 4.81667 5.04368 3.42838 6.82101 2.65875C8.59833 1.88911 10.5945 1.79039 12.4391 2.3809C14.2837 2.97141 15.8514 4.21105 16.8514 5.86977C17.8513 7.52849 18.2155 9.49365 17.8764 11.4005C17.5979 12.967 16.8603 14.4068 15.7684 15.543C15.3736 15.9539 14.7184 15.8787 14.3617 15.4343C14.0051 14.9899 14.0846 14.3455 14.4606 13.9173C15.1719 13.1073 15.6538 12.1134 15.8448 11.0393C16.0964 9.62426 15.8261 8.166 15.0841 6.93513C14.3421 5.70426 13.1788 4.78438 11.81 4.34618C10.4412 3.90799 8.95988 3.98125 7.641 4.55236C6.32213 5.12348 5.25522 6.15367 4.63828 7.45174C4.02135 8.74982 3.89628 10.2276 4.28629 11.6109C4.67629 12.9942 5.55489 14.1891 6.75903 14.9737C7.67308 15.5693 8.72759 15.8979 9.80504 15.9333C10.3746 15.952 10.8989 16.3349 10.979 16.8991Z" />
                    <rect
                      transform="rotate(-49.6812 12.2469 14.8859)"
                      rx={1}
                      height="10.1881"
                      width={2}
                      y="14.8859"
                      x="12.2469"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="listItem absolute top-36 h-1/2 w-4xl bg-white rounded-lg shadow-lg overflow-y-auto">
              <ul className="divide-y divide-gray-300">
                {dataProducts.map((pr, index) => (
                  <Link
                    href={`/nguoidung/sanpham/${pr.id}`}
                    key={index}
                    className=""
                    onClick={() => sethideSearch(true)}
                  >
                    <li className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
                      <img
                        src={
                          pr.image[0]
                            ? `http://localhost:3000${pr.image[0]}`
                            : imgDefault
                        }
                        alt={pr.name}
                        className="w-20 h-20 rounded-full mr-3"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{pr.name}</span>
                        <span className="text-sm text-gray-500">
                          {pr.nameCategory}
                        </span>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <span className="text-gray-400 line-through ml-2">
                          {pr.newprice}
                        </span>
                        <span className="text-red-500 font-semibold">
                          {pr.oldprice}
                        </span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
