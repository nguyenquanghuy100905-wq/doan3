"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Galleria } from "primereact/galleria";
import axios from "axios";
import { Toast } from "primereact/toast";
import { getFirstImage } from "@/utils/imageHelper";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "@/styles/button.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputNumber } from "primereact/inputnumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { InputTextarea } from "primereact/inputtextarea";

export default function Page() {
  const id = useParams().id;
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const msgs = useRef(null);
  const [addFeedback, setAddFeedback] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [idType, setIdType] = useState("");
  const [dataFeedback, setDataFeedback] = useState([]);
  const [btnEditFeedbacks, setBtnEditFeedbacks] = useState(false);
  const [btnAddFeedbacks, setBtnAddFeedbacks] = useState(false);
  const router = useRouter();
  const [feedback, setFeedback] = useState([
    {
      id: 0,
      user_id: 0,
      product_id: 0,
      star: 0,
      image_path: "",
      content: "",
    },
  ]);
  const [user, setUser] = useState("");
  const [cart, setCart] = useState({
    userId: 0,
    productId: 0,
    newquantity: 0,
  });
  useEffect(() => {
    const user = localStorage.getItem("data");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  useEffect(() => {
    const getProductById = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/products/getProductsById`,
          {
            params: { id },
          }
        );
        setProduct(data.data[0]);
        setIdCategory(data.data[0].category_id);
        setIdType(data.data[0].type_id);
      } catch (error) {
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
    getProductById();
  }, [id]);

  useEffect(() => {
    if (!idCategory) return;
    const getProductByIdCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products/getProductsIdCategory`,
          {
            params: { id: idCategory },
          }
        );
        setProducts(data);
      } catch (error) {
        msgs.current?.show([
          {
            severity: "error",
            summary: "Thông báo",
            detail: "Có lỗi xảy ra khi tải sản phẩm cùng loại",
            life: 3000,
          },
        ]);
      }
    };
    getProductByIdCategory();
  }, [idCategory]);

  useEffect(() => {
    const getContent = async () => {
      if (!idType) return;
      try {
        const { data } = await axios.get(
          `http://localhost:3000/contenttypes/getContentByIdType`,
          {
            params: { id: idType },
          }
        );
        setContent(data);
      } catch (error) {
        msgs.current.show([
          {
            severity: "error",
            summary: "Thông báo",
            detail: "Có lỗi xảy ra khi tải nội dung",
            life: 3000,
          },
        ]);
      }
    };
    getContent();
  }, [idType]);
  useEffect(() => {
    const getFeedbacksByIdProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/feedbacks/getFeedbacksByIdProduct`,
          {
            params: { id: id },
          }
        );
        setDataFeedback(data);
      } catch (error) {
        msgs.current.show([
          {
            severity: "error",
            summary: "Thông báo",
            detail: "Có lỗi xảy ra khi tải nội dung",
            life: 3000,
          },
        ]);
      }
    };
    getFeedbacksByIdProduct();
  }, [id]);

  const btnAddProduct = async () => {
    if (!user) {
      msgs.current?.show([
        {
          severity: 'error',
          summary: 'Thông báo',
          detail: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
          life: 3000
        }
      ]);
      router.push('/loginFolder/login');
      return;
    }
    try {
      const { data } = await axios.post(
        `http://localhost:3000/cart/createCart`,
        {
          userId: user.user.id,
          productId: id,
          newquantity: cart.newquantity,
        }
      );
      msgs.current?.show([
        {
          severity: "success",
          summary: "Thông báo",
          detail: data,
          life: 3000,
        },
      ]);
      setCart({ ...cart, newquantity: 0 });
      window.location.reload();
    } catch (error) {
      msgs.current?.show([
        {
          severity: "error",
          summary: "Thông báo",
          detail: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
          life: 3000,
        },
      ]);
    }
  };

  const itemTemplate = (item) => (
    <img
      src={`http://localhost:3000${item.image}`}
      alt="product"
      className="w-full h-auto object-contain"
    />
  );

  const thumbnailTemplate = (item) => (
    <img
      src={`http://localhost:3000${item.image}`}
      alt="product thumbnail"
      className="w-full h-[90px] bg-white object-cover"
    />
  );
  const items = [
    {
      label: "Sản Phẩm",
      template: () => <Link href={`/nguoidung/sanpham`}>Sản Phẩm</Link>,
    },
    {
      label: "Chi Tiết Sản Phẩm",
      template: () => (
        <Link href={`/nguoidung/sanpham/${id}`}>Chi Tiết Sản Phẩm</Link>
      ),
    },
    {
      label: "InputText",
      template: () => (
        <Link href={`/nguoidung/sanpham/${id}`}>
          <span className="text-primary font-semibold">{product.name}</span>
        </Link>
      ),
    },
  ];
  const home = {
    icon: "pi pi-home",
    url: "http://localhost:4000/nguoidung/trangchu",
  };

  const [ratingStats, setRatingStats] = useState([]);
  useEffect(() => {
    const fetchRatingStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/feedbacks/getCountFeedbackByIdProduct`,
          {
            params: { id: id },
          }
        );
        setRatingStats(response.data);
      } catch (error) {
        console.error("Error fetching rating stats:", error);
      }
    };
    fetchRatingStats();
  }, [id]);

  const totalFeedbacks = ratingStats.reduce(
    (total, stat) => total + stat.quantity,
    0
  );
  const averageStar =
    totalFeedbacks > 0
      ? ratingStats.reduce((sum, stat) => sum + stat.star * stat.quantity, 0) /
      totalFeedbacks
      : 0;

  // ------------IMG------------------
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileUploadRef = useRef(null);
  const onUpload = (e) => {
    const file = e.files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFeedback({ ...feedback, image_path: file });
  };
  const removeImage = () => {
    setPreviewUrl(null);
    setFeedback({ ...feedback, image_path: null });
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };
  const btnAddFeedback = async () => {
    if (!user) {
      msgs.current?.show([
        {
          severity: "error",
          summary: "Thoật báo",
          detail: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
          life: 3000,
        },
      ]);
      router.push("/loginFolder/login");
    }
    if (!feedback.star || !feedback.content) {
      msgs.current?.show([
        {
          severity: "error",
          summary: "Thông báo",
          detail: "Vui lòng điền đầy đủ thông tin đánh giá.",
          life: 3000,
        },
      ]);
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.user.id);
    formData.append("product_id", id);
    formData.append("star", feedback.star);
    formData.append("content", feedback.content);
    if (feedback.image_path) formData.append("file", feedback.image_path);

    try {
      await axios.post(
        `http://localhost:3000/feedbacks/createFeedbacks`,
        formData
      );
      msgs.current?.show([
        {
          severity: "success",
          summary: "Thông báo",
          detail: "Phản hồi của bạn đã được gửi thành công!",
          life: 3000,
        },
      ]);
      setFeedback({
        image: null,
        star: 0,
        content: "",
      });
      setPreviewUrl(null);
      window.location.reload();
    } catch (error) {
      console.error("Error sending feedback:", error.response.data);
      msgs.current?.show([
        {
          severity: "error",
          summary: "Thông báo",
          detail: error.response.data.message,
          life: 3000,
        },
      ]);
    }
    console.log(img);
  };
  const doitien = (value) => {
    const number = Number(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const deleteFeedback = async (value) => {
    try {
      if (!window.confirm(`Bạn có chắc chắn muốn xóa bình luận này?`)) return;

      const { data } = await axios.delete(
        `http://localhost:3000/feedbacks/deleteFeedbacks`,
        {
          params: {
            id: value,
          },
        }
      );

      msgs.current?.show([
        {
          severity: "success",
          summary: "Thông báo",
          detail: `Xóa bình luận thành công!`,
          life: 3000,
        },
      ]);
      setDataFeedback(dataFeedback.filter((f) => f.id !== value));
    } catch (err) {
      msgs.current?.show([
        {
          severity: "error",
          summary: "Lỗi",
          detail:
            err.response?.data?.message || "Đã xảy ra lỗi khi xóa bình luận.",
          life: 3000,
        },
      ]);
    }
  };
  const handleAdd = () => {
    setFeedback({
      image: null,
      star: 0,
      content: "",
    });
    setAddFeedback(!addFeedback);
    setBtnEditFeedbacks(false);
    setBtnAddFeedbacks(true);
  };
  const handleEdit = (value) => {
    setAddFeedback(!addFeedback);
    setFeedback(value);
    setPreviewUrl(
      value.image_path ? `http://localhost:3000${value.image_path}` : null
    );
    setBtnEditFeedbacks(true);
    setBtnAddFeedbacks(false);
  };
  const btnUpdateFeedback = () => {
    try {
      const formData = new FormData();
      formData.append("user_id", user.user.id);
      formData.append("product_id", id);
      formData.append("star", feedback.star);
      formData.append("content", feedback.content);
      if (feedback.image_path) formData.append("file", feedback.image_path);
      axios.put(`http://localhost:3000/feedbacks/updateFeedbacks`, formData, {
        params: { id: feedback.id },
      });
      msgs.current?.show([
        {
          severity: "success",
          summary: "thông báo",
          detail: "Phản hồi của bạn được cập nhật thành công!",
          life: 3000,
        },
      ]);
      setFeedback({
        image: null,
        star: 0,
        content: "",
      });
      setPreviewUrl(null);
      window.location.reload();
    } catch (error) {
      console.error("Error sending feedback:", error.response.data);
      msgs.current?.show([
        {
          severity: "error",
          summary: "thông báo",
          detail: error.response.data.message,
          life: 3000,
        },
      ]);
    }
  };
  return (
    <div className="container mx-auto px-30 mt-10">
      <Toast ref={msgs} position="top-right" className="w-96" />
      <div className="grid my-5 grid-cols-1 space-x-4 sm:grid-cols-1 mb-5 md:grid-cols-7">
        <div className="flex justify-center col-span-3 overflow-hidden">
          <Galleria
            value={product.image?.map((img) => ({ image: img })) || []}
            numVisible={4}
            circular
            style={{ maxWidth: "640px" }}
            showItemNavigators
            showItemNavigatorsOnHover
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
        </div>
        <div className=" col-span-4">
          <BreadCrumb model={items} className="mb-4" home={home} />
          <div className="mx-2">
            <h1 className="text-[27px] leading-[35px] font-bold">
              {product.name}
            </h1>
            <div className="flex space-x-4">
              <p className="text-gray-500 font-normal text-[24px] leading-[24px] mt-4 line-through opacity-70">
                {doitien(product.oldprice)}
              </p>
              <p className="text-black font-bold text-[24px] leading-[24px] mt-4">
                {doitien(product.newprice)}
              </p>
            </div>
            <p className="text-black text-[18px] italic font-normal leading-[26px] mt-4">
              Đơn giá chưa bao gồm thuế GTGT, Phí vận chuyển
            </p>
            <ul className="mt-4 space-y-1">
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Mẫu điện thoạithoại :</strong> {product.nameType}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Trọng lượng :</strong> {product.payload}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Chất Liệu :</strong> {product.material}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Size :</strong> {product.size}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Khối lượng :</strong> {product.weight}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Màu sắc :</strong> {product.color}
              </li>
              <li className="text-black text-[18px] font-normal leading-[26px] mt-2">
                <strong>Số lượng :</strong> {product.quantity}
              </li>
            </ul>
            <div className="flex items-center space-x-4 mt-6">
              <InputNumber
                inputId="quantity"
                value={cart.newquantity}
                onValueChange={(e) =>
                  setCart({ ...cart, newquantity: e.value })
                }
                showButtons
                buttonLayout="horizontal"
                step={1}
                min={1}
                max={product.quantity}
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                inputClassName="text-center w-20"
              />

              <button
                className="bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl hover:bg-gray-800 transition duration-200"
                onClick={() => btnAddProduct()}
              >
                Add to cart
              </button>
            </div>
            <div className="flex space-x-3 mt-4">
              {[
                { href: "#", icon: faFacebook, color: "text-blue-600" },
                { href: "#", icon: faTiktok, color: "text-black" },
                { href: "#", icon: faInstagram, color: "text-pink-500" },
                { href: "#", icon: faYoutube, color: "text-red-600" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition duration-300 hover:bg-black hover:scale-110`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-lg ${item.color} transition duration-300 hover:text-white`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-25 mb-10 container mx-auto">
        <div className="flex">
          <div className="border-l border-gray-300 border-r">
            <div className="border-t-2 border-red-500 px-5 py-3 bg-white">
              <h2 className="text-2xl font-bold text-black">
                Thông tin chi tiết
              </h2>
            </div>
          </div>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>
        <div className="border-b border-l border-gray-300 border-r rounded-b-md shadow-md p-6 bg-white">
          {content ? (
            content.map((item, index) => (
              <div key={index} className="mb-10">
                <h3 className="text-[20px] font-[700] leading-[26px] text-black mb-4">
                  {item.title}
                </h3>
                <p className="text-[18px] font-[400] leading-[26px] mb-4">
                  {item.content }
                </p>
                <div className="flex justify-center mt-10">
                  <img
                    src={`http://localhost:3000${item.image_path}`}
                    alt={item.title}
                    className="w-[500px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-black">Chưa có thông tin chi tiết.</p>
          )}
        </div>
      </div>
      {/* ........FeedBack............... */}
      <div className="container">
        <div className="flex">
          <div className="border-l border-gray-300 border-r">
            <div className="border-t-2 border-red-500 px-5 py-3 bg-white">
              <h2 className="text-2xl font-bold text-black">
                Đánh giá sản phẩm
              </h2>
            </div>
          </div>
          <div className="flex-1 border-b border-gray-300"></div>
        </div>
        <div className="border-l p-2 border-gray-300 border-r">
          <div className="border-1 border-gray-300 rounded-lg p-4 bg-white">
            <div className="grid grid-cols-6 gap-4 mb-5">
              <div className="col-span-3 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold">
                  {parseFloat(averageStar.toFixed(1))}/5
                </div>
                <Rating
                  value={parseFloat(averageStar)}
                  readOnly
                  cancel={false}
                  className="text-yellow-500"
                />
                <div className="text-sm text-black mt-1">
                  {totalFeedbacks} đánh giá và nhận xét
                </div>
              </div>
              <div className="col-span-3 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const item = ratingStats.find((r) => r.star === star);
                  const quantity = item ? item.quantity : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <div className="w-[60px] text-sm">{star} Sao</div>
                      <div className="flex-1">
                        <Rating value={star} readOnly cancel={false} />
                      </div>
                      <div className="w-[80px] text-sm text-black text-right">
                        {quantity} đánh giá
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="my-5 flex justify-end items-center">
            <Button
              label="Viết đánh giá"
              icon="pi pi-pencil"
              className="p-button-outlined p-button-secondary mt-4"
              onClick={handleAdd}
            />
          </div>

          {addFeedback && (
            <div className="border-1 border-gray-300 rounded-lg p-4 space-y-3 bg-white mt-4">
              <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>
              <div className="mb-4">
                <label htmlFor="rating" className="block mb-2 font-medium">
                  Chọn số sao:
                </label>
                <Rating
                  value={feedback.star}
                  onChange={(e) => setFeedback({ ...feedback, star: e.value })}
                  cancel={true}
                />
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">
                  Tải ảnh đính kèm (nếu có):
                </h4>
                <div className="flex items-start space-x-4">
                  <FileUpload
                    ref={fileUploadRef}
                    name="demo[]"
                    mode="basic"
                    auto
                    customUpload
                    uploadHandler={onUpload}
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Chọn ảnh"
                    className="p-button-sm border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  />
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl shadow-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-white border border-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-100 hover:text-red-600 transition"
                        title="Xóa ảnh"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="feedback" className="block mb-2 font-medium">
                  Nội dung đánh giá:
                </label>
                <InputTextarea
                  value={feedback.content}
                  className="w-full"
                  onChange={(e) =>
                    setFeedback({ ...feedback, content: e.target.value })
                  }
                />
              </div>
              {btnEditFeedbacks && (
                <Button
                  label="Cập nhật"
                  icon="pi pi-pencil"
                  className="p-button-success"
                  onClick={btnUpdateFeedback}
                />
              )}
              {btnAddFeedbacks && (
                <Button
                  label="Gửi đánh giá"
                  icon="pi pi-send"
                  className="p-button-success"
                  onClick={btnAddFeedback}
                />
              )}
            </div>
          )}
        </div>
        <div className="border-b border-l h-[900px] overflow-y-auto border-gray-300 border-r rounded-b-md shadow-md p-6 bg-white">
          {dataFeedback && dataFeedback.length > 0 ? (
            dataFeedback.map((item, index) => (
              <div
                key={index}
                className="border-1 border-gray-300 rounded-lg p-4 bg-white mb-5"
              >
                <div className="flex justify-between items-center">
                  <div className="">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:3000${item.image_user}`}
                        className="w-16 h-16 border-1 border-gray-300 rounded-full"
                        alt="logo"
                      />
                      <div className="space-x-4 flex items-center">
                        <h3 className="text-lg font-semibold">
                          {item.user_name}
                        </h3>
                        <Rating
                          value={item.star}
                          readOnly
                          cancel={false}
                          className="text-yellow-500"
                        />
                      </div>
                    </div>
                    <p className="text-black my-2">{item.content}</p>
                    {item.image_path && (
                      <Image
                        src={`http://localhost:3000${item.image_path}`}
                        alt="Image"
                        width="250"
                        preview
                      />
                    )}
                  </div>
                  {item.user_id === user?.user.id ? (
                    <div className="flex gap-3">
                      <Button
                        icon="pi pi-pencil"
                        rounded
                        text
                        raised
                        onClick={() => handleEdit(item)}
                        severity="success"
                        aria-label="Edit"
                      />
                      <Button
                        icon="pi pi-times"
                        rounded
                        text
                        raised
                        onClick={() => deleteFeedback(item.id)}
                        severity="danger"
                        aria-label="Delete"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-black">Chưa có đánh giá nào.</div>
          )}
        </div>
      </div>

      <div className="">
        <h2 className="my-5 text-[30px] font-bold ">Sản Phẩm Cùng Loại</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-5 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/nguoidung/sanpham/${product.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg relative h-[400px] transition-transform transform hover:scale-105 duration-300">
                <img
                  src={`http://localhost:3000${getFirstImage(product.images || product.image)}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <p className="text-black">{product.nameCategory}</p>
                  {product.newprice < product.oldprice && (
                    <p className="text-green-600 font-semibold mt-2">
                      Khuyến mãi
                    </p>
                  )}
                  <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                  <div className="flex justify-center items-center space-x-4">
                    <p className="text-red-400 font-medium text-lg mt-2 line-through opacity-70">
                      {doitien(product.oldprice)}
                    </p>
                    <p className="text-red-600 font-bold text-xl mt-2">
                      {doitien(product.newprice)}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 p-2 bg-orange-500 text-white text-xs font-bold">
                  {product.nameType}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
