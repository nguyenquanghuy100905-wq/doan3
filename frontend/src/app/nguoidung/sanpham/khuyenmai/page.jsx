"use client";
import Link from "next/link";
import { Helmet } from "react-helmet";
import style from "@/styles/sanpham.module.css";
import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";
import { useSearchParams } from "next/navigation";
import { getFirstImage } from "@/utils/imageHelper";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const msgs = useRef(null);
  const url = useSearchParams();
  const idCategory = url.get("id");
  const [selectOption, setSelectOption] = useState("");
  const options = [
    { label: "Mặc Định", value: "default" },
    { label: "Giá từ cao xuống thấp", value: "desc" },
    { label: "Giá từ thấp đến cao", value: "asc" },
    { label: "Sản phẩm mới ra", value: "new" },
    { label: "Sản phẩm có đánh giá cao", value: "top_rated" },
    { label: "Sản phẩm bán chạy nhất", value: "best_seller" },
  ];

  const getUrlOptions = () => {
    switch (selectOption) {
      case "asc":
        return `http://localhost:3000/products/locsanphamtheogiatuthapdencao`;
      case "desc":
        return `http://localhost:3000/products/locsanphamtheogiatucaodenthap`;
      case "new":
        return `http://localhost:3000/products/locsanphammoinhat`;
      case "top_rated":
        return `http://localhost:3000/products/getProductsTopRated?id=${idCategory}`;
      case "best_seller":
        return `http://localhost:3000/products/getProductsBestSeller?id=${idCategory}`;
      default:
        return idCategory
          ? `http://localhost:3000/products/getProductsIdCategory?id=${idCategory}`
          : "http://localhost:3000/products/getAllProducts";
    }
  };

  const doitien = (value) => {
    const number = Number(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = getUrlOptions();
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        msgs.current?.show([
          {
            severity: "error",
            summary: "Thông báo",
            detail: "Có lỗi xảy ra khi tải sản phẩm",
            life: 3000,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [idCategory, selectOption]);

  const dataProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const paginatedProducts = dataProducts.slice(first, first + rows);

  return (
    <div>
      <Toast ref={msgs} />
      <Helmet>
        <title>Khuyến Mại: QuangHuyMobile</title>
        <meta name="description" content="QuangHuyMobile" />
      </Helmet>

      <div
        className={`flex justify-center py-15 bg-[#cf2e2e] ${style.background}`}
      >
        <div className="container mx-auto px-4 md:px-30 grid grid-cols-12 gap-6">
          <div className="text-white col-span-12 md:col-span-5">
            <h1 className="text-5xl my-4 leading-tight font-bold">
              Khuyến Mại
            </h1>
            <p className="leading-relaxed">
              <Link href="/nguoidung/trangchu">Trang Chủ</Link> » Khuyến Mại
            </p>
          </div>
          <div className="flex items-center justify-center col-span-12 md:col-span-7">
            <form className="grid grid-cols-1 md:grid-cols-2 text-[16px] gap-10 w-full">
              <div className="flex flex-1 max-w-lg relative">
                <Search className="w-5 h-5 text-white absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục sản phẩm..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 text-white rounded-full bg-[#ffffff36] outline-0 transition !placeholder-white"
                />
              </div>
              <div className="bg-[#ffffff36] border w-2/3 border-white text-white rounded-4xl flex items-center">
                <select
                  id="countries"
                  className="outline-none w-full p-3"
                  value={selectOption}
                  onChange={(e) => setSelectOption(e.target.value)}
                >
                  {options.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      className="text-black hover:text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-30 mb-20 mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {paginatedProducts
                .filter((product) => product.newprice < product.oldprice)
                .map((product) => (
                  <Link
                    key={product.id}
                    href={`/nguoidung/sanpham/${product.id}`}
                  >
                    <div className="bg-white h-[600px] rounded-lg overflow-hidden shadow-lg relative max-h-[500px] transition-transform transform hover:scale-105 duration-300">
                      <img
                        src={`http://localhost:3000${getFirstImage(product.images || product.image)}`}
                        alt={product.name}
                        className="w-full h-[350px] object-cover"
                      />
                      <div className="p-4 text-center">
                        <p className="text-black text-sm font-medium">{product.nameCategory}</p>
                        <p className="text-green-600 font-bold mt-2 text-sm">
                          Khuyến mãi
                        </p>
                        <h2 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 min-h-[56px]">
                          {product.name}
                        </h2>
                        <div className="flex justify-center items-center space-x-4">
                          <p className="text-gray-400 font-medium text-base mt-2 line-through">
                            {doitien(product.oldprice)}
                          </p>
                          <p className="text-red-600 font-extrabold text-2xl mt-2">
                            {doitien(product.newprice)}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-0 left-0 p-2 bg-orange-500 text-white text-xs font-bold">
                        {product.nameCategory}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="flex justify-center mt-10">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={dataProducts.length}
                rowsPerPageOptions={[5, 25, 50]}
                onPageChange={(e) => {
                  setFirst(e.first);
                  setRows(e.rows);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
