"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { getFirstImage } from "@/utils/imageHelper";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import banner1 from "@/ImageJeepBicycle/Slide/1.png";
import banner2 from "@/ImageJeepBicycle/Slide/2.png";
import banner3 from "@/ImageJeepBicycle/Slide/3.png";
import banner4 from "@/ImageJeepBicycle/Slide/4.png";
import banner5 from "@/ImageJeepBicycle/Slide/5.jpg";
import banner6 from "@/ImageJeepBicycle/Slide/6.png";
import banner7 from "@/ImageJeepBicycle/Slide/7.png";
import banner8 from "@/ImageJeepBicycle/Slide/8.png";
import banner10 from "@/ImageJeepBicycle/Slide/10.png";
import banner11 from "@/ImageJeepBicycle/Slide/11.png";

import icon1 from "@/ImageJeepBicycle/TrangChu/Bicycle1.png";
import icon2 from "@/ImageJeepBicycle/TrangChu/icon2.png";
import icon3 from "@/ImageJeepBicycle/TrangChu/icon3.png";
import styleTrangChu from "@/styles/trangchu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { Rating } from "primereact/rating";
import axios from "axios";
export default function HomePage() {
  // -----------------banner----------------
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const bannerData = [
      {
        src: banner1,
      },
      {
        src: banner2,
      },
      {
        src: banner3,
      },
      {
        src: banner4,
      },
      {
        src: banner5,
      },
      {
        src: banner6,
      },
      {
        src: banner7,
      },
      {
        src: banner8,
      },
    ];
    setBanners(bannerData);
  }, []);

  const bannerTemplate = (banner) => {
    return (
      <div className="w-full h-fit flex justify-center items-center overflow-hidden">
        <Image
          src={banner.src}
          alt="Banner"
          width={1920}
          height={1080}
          className="w-full h-full object-cover shadow-lg"
        />
      </div>
    );
  };

  // ----------------images----------------
  const images = [
    {
      src: "https://cdn.hoanghamobile.com/default/Uploads/2025/05/14/m4-tc-w-100.jpg;trim.threshold=0;trim.percentpadding=0;width=480;",
      title: "ADVENTURE",
      hover:
        "https://cdn.hoanghamobile.com/default/Uploads/2025/03/06/macbook-air-13-inch-m4-non-ai-mar25-midnight-pdp-image-position-1-vn-vi.png;trim.threshold=80;trim.percentpadding=0.5;width=138;height=180;mode=pad;",
    },
    {
      src: "https://cdn.hoanghamobile.com/default/Uploads/2025/05/12/461x398-xiaomi15he-120525.jpg;trim.threshold=0;trim.percentpadding=0;width=480;",
      title: "FREEDOM",
      hover:
        "https://cdn.hoanghamobile.com/default/Uploads/2025/05/06/web-vuoong.jpg;trim.threshold=0;trim.percentpadding=0;width=480;",
    },
    {
      src: "https://cdn.hoanghamobile.com/default/Uploads/2025/05/05/web-sssss.png;trim.threshold=0;trim.percentpadding=0;width=480;",
      title: "PASSION",
      hover:
        "https://cdn.hoanghamobile.com/default/Uploads/2025/03/07/0307-1_638769538199987757.jpg;trim.threshold=0;trim.percentpadding=0;width=480",
    },
    {
      src: "https://cdn.hoanghamobile.com/default/Uploads/2025/04/16/web-tablet-lenovo-04.jpg;trim.threshold=0;trim.percentpadding=0;width=480;",
      title: "AUTHENTICITY",
      hover:
        "https://cdn.hoanghamobile.com/default/Uploads/2025/05/05/461x398-sony-020525.jpg;trim.threshold=0;trim.percentpadding=0;width=480;",
    },
  ];
  const [selectedImage, setSelectedImage] = useState(images[0].hover);
  // -----------------category----------------
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const categoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/getCategoriesAndQuantity"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    categoryData();
  }, []);
  // ------------------Types----------------------
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const typesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/types/getAllTypes"
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };
    typesData();
  }, []);
  // ------------------product---------------------------
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/getAllProducts"
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    productData();
  }, []);
  const doitien = (value) => {
    const number = Number(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const feedbacksData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/feedbacks/getAllFeedbacks"
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    feedbacksData();
  }, []);
  const commentTemplate = (comment) => {
    return (
      <div className="items-center px-4 py-8 mt-10 rounded-4xl border-gray-400 shadow shadow-gray-500 border m-2 rounded-5xl hover:border-b-4 hover:border-b-orange-600">
        <FontAwesomeIcon
          className="text-5xl p-5 text-orange-600"
          icon={faComment}
        />
        <div>
          <div className="flex justify-center">
            <Rating
              value={comment.star}
              readOnly
              onChange={(e) => setFeedbacks(e.value)}
              cancel={false}
            />
          </div>
          <p className={styleTrangChu.contentcomment}>{comment.content}</p>
          <p className={styleTrangChu.namecomment}>{comment.user_name}</p>
          <span className="text-gray-600 font-medium text-sm">Khách Hàng</span>
        </div>
      </div>
    );
  };
  const productitem = (item) => {
    return (
      <div className="flex justify-center px-2 py-4">
        <Link href={`/nguoidung/sanpham/${item.id}`} key={item.id}>
          <div className="w-[280px] h-[450px] border-2 border-gray-200 rounded-2xl group text-center shadow-lg hover:shadow-2xl hover:border-orange-400 transition-all duration-300 bg-white hover:-translate-y-2">
            <div className="relative w-full h-[280px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={`http://localhost:3000${getFirstImage(item.images || item.image)}`}
                alt={item.name}
                className="object-contain w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="px-4 py-4">
              <p className="font-bold text-base text-gray-900 line-clamp-2 min-h-[48px]">
                {item.name}
              </p>
              <p className="text-red-600 text-xl font-extrabold mt-3">
                {doitien(item.newprice)}
              </p>
              {item.oldprice && (
                <p className="text-gray-400 text-sm line-through mt-1">
                  {doitien(item.oldprice)}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang Chủ - QuangHuyMobile</title>
      </Helmet>
      <div className="banner">
        <div className="banner w-full h-fit mx-auto">
          <Carousel
            value={banners}
            numVisible={1}
            numScroll={1}
            className="custom-carousel"
            circular
            autoplayInterval={5000}
            itemTemplate={bannerTemplate}
            showIndicators={true}
            showNavigators={true}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <ul className="flex w-full">
          {images.map((item, index) => (
            <li
              key={index}
              className="relative w-1/4 border-x-1 border-white h-[600px] cursor-pointer overflow-hidden group"
              onMouseEnter={() => item.hover && setSelectedImage(item.hover)}
              onMouseLeave={() => setSelectedImage(images[0].src)}
            >
              <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-125">
                <Image
                  src={selectedImage === item.hover ? selectedImage : item.src}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out  group-hover:scale-90"
                />
              </div>
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-30 transition-opacity duration-500 ease-out"></div>
              <p
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${styleTrangChu.ImgTitle}`}
              >
                {item.title}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                <div>
                  <a
                    href="/hoang-ha-edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://cdn.hoanghamobile.com/i/home/Uploads/2025/05/05/san-pham-hot-edu.jpg"
                      title="Hoàng Hà Edu"
                      alt="Hoàng Hà Edu"
                      className="max-w-full rounded-[5px]"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://hoanghamobile.com/may-tinh-bang/ipad-gen-11-11-inch-wifi-128gb?utm_source=QTwebsite&amp;utm_medium=San_pham_hot&amp;utm_campaign=Ipad_gen11_sph_thang5_805"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://cdn.hoanghamobile.com/i/home/Uploads/2025/05/09/sanphamhot2.png"
                      title="Chương trình Ưu đãi tết 4"
                      alt="Chương trình Ưu đãi tết 4"
                      className="max-w-full rounded-[5px]"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://hoanghamobile.com/dien-thoai-di-dong/samsung/samsung-galaxy-a-series"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://cdn.hoanghamobile.com/i/home/Uploads/2025/05/05/sanphamhot-a06-a16-a26-5g.png"
                      title="Galaxy A60/A16"
                      alt="Galaxy A60/A16"
                      className="max-w-full rounded-[5px]"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://hoanghamobile.com/dien-thoai/redmi-note-14?utm_source=Webssite&amp;utm_medium=Banner+web&amp;utm_campaign=Redmi-Note-14-Series"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://cdn.hoanghamobile.com/i/home/Uploads/2025/05/16/sanphamhot2.png"
                      title="Redmi Note 14"
                      alt="Redmi Note 14"
                      className="max-w-full rounded-[5px]"
                    />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 w-full max-h-[700px] pt-[70px] pb-[70px] text-center ${styleTrangChu.bgtuvan}`}
      >
        <div className="text-center flex flex-col justify-center items-center px-6">
          <h2 className={styleTrangChu.titletuvan}>MobilePhone</h2>
          <h2 className={`${styleTrangChu.contenttuvan} px-10`}>
            <span>Thương hiệu điện thoại hàng đầu</span>
          </h2>
          <Link
            href="/nguoidung/gioithieu"
            className={styleTrangChu.btnkhampha}
          >
            Khám phá ngay
          </Link>
        </div>

        <div className="flex justify-start items-center">
          <div className="bg-white px-15 py-18 rounded-4xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-left">
              Tư Vấn Lựa Chọn điện thoại
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                className="w-full p-3 border border-gray-400 rounded-lg  outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại của bạn"
                className="w-full p-3 border border-gray-400 rounded-lg outline-none"
                required
              />
              <select
                name="carModel"
                className="w-full p-3 border rounded-lg border-gray-400 outline-none"
                required
              >
                {types.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                placeholder="Mô tả yêu cầu"
                className="w-full p-3 border rounded-lg border-gray-400 outline-none h-24"
              />
              <div className="w-full flex justify-start">
                <button
                  type="submit"
                  className="w-1/3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Gửi thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-15 px-30 space-y-15">
        <h1 className={styleTrangChu.titleproduct}>Các dòng điện thoại</h1>
        <div className="grid grid-cols-4 gap-6">
          {category.slice(0, 4).map((item, index) => (
            <Link
              href={`/nguoidung/sanpham?id=${item.id}`}
              key={index}
              className="w-full h-[400px] border border-gray-300 rounded-lg text-center overflow-hidden group block"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={`http://localhost:3000${item.image}`}
                  className="w-full object-cover rounded-md h-[300px] transition-transform duration-300 ease-in-out group-hover:scale-110"
                  alt=""
                />
              </div>
              <h2 className="text-lg font-bold mt-2 group-hover:text-orange-600 transition-colors duration-300">
                {item.name}
              </h2>
              <p className="text-sm text-orange-600 group-hover:text-black transition-colors duration-300">
                {item.quantity} PRODUCTS
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Image src={banner10} className="w-full" alt="banner" />
        <Image src={banner11} className="w-full" alt="banner" />
      </div>
      <div className="w-full max-w-[1320px] mx-auto py-10 px-4">
        <h2 className={`my-10 ${styleTrangChu.titleproduct}`}>
          Sản Phẩm Bán Chạy
        </h2>
        <Carousel
          value={product}
          numVisible={4}
          numScroll={4}
          className="custom-carousel"
          circular
          autoplayInterval={5000}
          itemTemplate={productitem}
          showIndicators={false}
          showNavigators={true}
        />
      </div>

      <div className={`${styleTrangChu.bgInformation} mb-50`}>
        <div className="grid h-50 grid-cols-12 w-full items-center justify-start ">
          <div className="flex items-center justify-center col-span-5">
            <div className="text-center w-xl">
              <div className=" justify-center pt-10 items-center flex">
                <Image src={icon1} width={150} alt="icon" />
              </div>
              <h2 className={`${styleTrangChu.titleInformation}`}>
                Điện thoại hiện đại và chất lượng
              </h2>
            </div>
          </div>
          <div className="relative col-span-7">
            <div className="absolute shadow shadow-gray-500 w-3xl rounded-4xl p-13 space-x-2 bg-white text-center">
              <h2 className={styleTrangChu.titleDichVu}>
                Dịch vụ hỗ trợ của chúng tôi
              </h2>
              <div className="grid grid-cols-2 text-center gap-5">
                <div className="">
                  <div className=" justify-center pt-8 items-center flex">
                    <Image src={icon2} width={100} alt="icon" />
                  </div>
                  <h3 className={styleTrangChu.titleDichVuCon}>
                    Dịch vụ bảo hành
                  </h3>
                  <p className={styleTrangChu.contentDichVu}>
                    Chúng tôi bảo hành điện thoại của bạn trong 12 tháng, tất cả
                    các lỗi do hãng sản xuất
                  </p>
                </div>
                <div className="">
                  <div className=" justify-center pt-8 items-center flex">
                    <Image src={icon3} width={100} alt="icon" />
                  </div>
                  <h3 className={styleTrangChu.titleDichVuCon}>HỖ TRỢ 24/7</h3>
                  <p className={styleTrangChu.contentDichVu}>
                    Nếu bạn có vấn đề về điện thoại chúng tôi luôn hỗ trợ bạn
                    24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full comment max-w-[540px] sm:max-w-[720px] text-center md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-4">
        <h2 className={styleTrangChu.titlecomment}>
          Khách hàng của chúng tôi nói gì
        </h2>
        <div className="relative">
          <Carousel
            value={feedbacks}
            numVisible={2}
            numScroll={2}
            className="custom-carousel m-3"
            circular
            autoplayInterval={3000}
            itemTemplate={commentTemplate}
            showIndicators={false}
            showNavigators={true}
          />
        </div>
      </div>
    </>
  );
}
