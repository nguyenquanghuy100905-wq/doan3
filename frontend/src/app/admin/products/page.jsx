"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Search } from "lucide-react";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { Row } from "primereact/row";
const infor = {
  id: "",
  category_id: "",
  type_id: "",
  name: "",
  newprice: 0,
  oldprice: 0,
  material: "",
  size: "",
  weight: "",
  color: "",
  quantity: 0,
  image: [],
};

export default function Page() {
  const [dataproducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [product, setProduct] = useState(infor);
  const [form, setForm] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [title, setTitle] = useState("");
  const toast = useRef(null);
  const resetForm = () => {
    setProduct(infor);
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedFiles([]);
  };

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  useEffect(() => {
    const datacategoryandtype = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:3000/categories/getAllCategories"
        );
        setCategories(categoryResponse.data);

        const typeResponse = await axios.get(
          "http://localhost:3000/types/getAllTypes"
        );
        setTypes(typeResponse.data);
      } catch (error) {
        console.error("Error fetching categories and types:", error);
      }
    };

    datacategoryandtype();
  }, []);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
    setProduct((prevState) => ({
      ...prevState,
      category_id: e.value,
    }));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.value);
    setProduct((prevState) => ({
      ...prevState,
      type_id: e.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/products/getAllProducts"
        );
        setDataProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const imageBodyTemplate = (rowData) => (
    <img
      src={`http://localhost:3000${rowData.image[0]}`}
      alt="Product"
      className="w-20 h-20 object-cover border rounded-md shadow-md"
    />
  );
  const btnViewDetails = (rowData) => {
    setTitle("Thông Tin Sản Phẩm");
    setProduct(rowData);
    setForm(true);
    setEditProduct(false);
    setAddProduct(false);
    setSelectedFiles(rowData.image || []);
    setSelectedCategory(rowData.category_id);
    setSelectedType(rowData.type_id);
  };

  const handleEdit = (rowData) => {
    setTitle("Cập Nhật Thông Tin Sản Phẩm");
    setProduct(rowData);
    setForm(true);
    setEditProduct(true);
    setAddProduct(false);
    setSelectedFiles(rowData.image || []);
    setSelectedCategory(rowData.category_id);
    setSelectedType(rowData.type_id);
  };

  const handleAdd = () => {
    setTitle("Nhập Thông Tin Sản Phẩm");
    resetForm();
    setForm(true);
    setAddProduct(true);
    setEditProduct(false);
  };

  const btnUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (key !== "image") {
          formData.append(key, product[key]);
        }
      });
      if (Array.isArray(product.image)) {
        product.image.forEach((file) => {
          formData.append("files", file);
        });
      } else if (product.image instanceof File) {
        formData.append("files", product.image);
      }
      await axios.put(
        `http://localhost:3000/products/updateProducts`,
        formData,
        {
          params: { id: product.id },
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Thành công",
        detail: "Cập nhật sản phẩm thành công!",
        life: 3000,
      });
      setForm(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: `Cập nhật sản phẩm thất bại: ${
          error.response?.data?.message || error.message
        }`,
        life: 3000,
      });
    }
  };

  const btnDeleteProduct = async (rowData) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${rowData.name}?`))
      return;
    try {
      await axios.delete(`http://localhost:3000/products/deleteProducts`, {
        params: { id: rowData.id },
      });
      toast.current.show([
        {
          severity: "success",
          summary: "Thành công",
          detail: `Xóa ${rowData.name} thành công!`,
          life: 3000,
        },
      ]);
      setDataProducts(dataproducts.filter((item) => item.id !== rowData.id));
    } catch (error) {
      alert("Lỗi khi xóa sản phẩm: " + error.message);
    }
  };

  const fileUploadRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileUpload = (event) => {
    const files = event.files;
    setSelectedFiles(files);
    setProduct({ ...product, image: files });
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, idx) => idx !== index);
    setSelectedFiles(updatedFiles);
    setProduct({ ...product, image: updatedFiles });
  };

  const btnAddProduct = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedType) {
      alert("Vui lòng chọn Danh mục và Loại sản phẩm!");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (key !== "image") {
          formData.append(key, product[key]);
        }
      });
      if (Array.isArray(product.image)) {
        product.image.forEach((file) => {
          formData.append("files", file);
        });
      } else if (product.image instanceof File) {
        formData.append("files", product.image);
      }

      await axios.post(
        "http://localhost:3000/products/createProducts",
        formData
      );
      toast.current.show([
        {
          severity: "success",
          summary: "Thành công",
          detail: "Thêm sản phẩm thành công!",
          life: 3000,
        },
      ]);
      setForm(false);
      resetForm();
      window.location.reload();
    } catch (error) {
      toast.current.show([
        {
          severity: "error",
          summary: "Lỗi",
          detail:
            "Thêm sản phẩm thất bại: " +
            (error.response?.data?.message || error.message),
          life: 3000,
        },
      ]);
    }
  };

  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const filterproducts = dataproducts.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    const matchCategory =
      !selectedCategoryId || item.category_id === selectedCategoryId;
    const matchType = !selectedTypeId || item.type_id === selectedTypeId;
    return matchSearch && matchCategory && matchType;
  });

  const newprice = (rowData) => {
    const price = Number(rowData.newprice);
    return price.toLocaleString("vi-VN") + " đ";
  };
  const oldprice = (rowData) => {
    const price = Number(rowData.oldprice);
    return price.toLocaleString("vi-VN") + " đ";
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
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition"
            />
          </div>
          <div className="w-auto max-w-xs">
            <FloatLabel>
              <Dropdown
                id="categoryFilter"
                value={selectedCategoryId}
                options={categories}
                onChange={(e) => setSelectedCategoryId(e.value)}
                placeholder="Chọn danh mục điện thoại"
                className="w-full"
                showClear
                optionLabel="name"
                optionValue="id"
              />
              <label htmlFor="typeFilter">Danh mục máy  </label>
            </FloatLabel>
          </div>
          <div className="w-auto max-w-xs">
            <FloatLabel>
              <Dropdown
                id="typeFilter"
                value={selectedTypeId}
                options={types}
                onChange={(e) => setSelectedTypeId(e.value)}
                placeholder="Chọn loại"
                className="w-full"
                showClear
                optionLabel="name"
                optionValue="id"
              />
              <label htmlFor="typeFilter">Loại Máy</label>
            </FloatLabel>
          </div>
        </div>
        <Button
          label="Thêm sản phẩm"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={handleAdd}
        />
      </div>
      <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-4">
        SẢN PHẨM
      </h2>
      <Dialog
        visible={form}
        style={{ width: "60vw", maxHeight: "90vh" }}
        modal
        draggable
        onHide={() => setForm(false)}
      >
        <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          <h2 className="text-2xl font-bold text-center text-orange-600">
            {title}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label htmlFor="id" className="block text-gray-700">
                Id Sản Phẩm
              </label>
              <InputText
                id="id"
                name="id"
                value={product.id}
                onChange={handleChange}
                placeholder="ID sản phẩm"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Tên Sản Phẩm
              </label>
              <InputText
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category_id" className="block text-gray-700">
                Danh Mục
              </label>
              <Dropdown
                id="category"
                value={selectedCategory}
                options={categories}
                onChange={handleCategoryChange}
                optionLabel="name"
                optionValue="id"
                className="w-full"
                placeholder="Chọn danh mục"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type_id" className="block text-gray-700">
                Loại Sản Phẩm
              </label>
              <Dropdown
                id="type"
                value={selectedType}
                options={types}
                onChange={handleTypeChange}
                optionLabel="name"
                optionValue="id"
                className="w-full"
                placeholder="Chọn loại"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newprice" className="block text-gray-700">
                Giá Mới
              </label>
              <InputNumber
                id="newprice"
                name="newprice"
                value={product.newprice}
                onValueChange={(e) =>
                  handleChange({ target: { name: "newprice", value: e.value } })
                }
                mode="currency"
                currency="VND"
                locale="vi-VN"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="oldprice" className="block text-gray-700">
                Giá Cũ
              </label>
              <InputNumber
                id="oldprice"
                name="oldprice"
                value={product.oldprice}
                onValueChange={(e) =>
                  handleChange({ target: { name: "oldprice", value: e.value } })
                }
                mode="currency"
                currency="VND"
                locale="vi-VN"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="material">Chất Liệu</label>
              <InputText
                id="material"
                name="material"
                value={product.material}
                onChange={handleChange}
                placeholder="Nhập chất liệu"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="size">Kích Cỡ</label>
              <InputText
                id="size"
                name="size"
                value={product.size}
                onChange={handleChange}
                placeholder="Nhập kích cỡ"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weight">Trọng Lượng</label>
              <InputText
                id="weight"
                name="weight"
                value={product.weight}
                onChange={handleChange}
                placeholder="Nhập Trọng Lượng"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="color">Màu Sắc</label>
              <InputText
                id="color"
                name="color"
                value={product.color}
                onChange={handleChange}
                placeholder="Nhập màu sắc"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity">Số Lượng</label>
              <InputNumber
                id="quantity"
                name="quantity"
                value={product.quantity}
                onValueChange={(e) =>
                  handleChange({ target: { name: "quantity", value: e.value } })
                }
                min={0}
                className="w-full"
              />
            </div>
            <div className="col-span-2 flex items-center space-x-4">
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                name="image"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                onSelect={handleFileUpload}
                multiple
              />
              {selectedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {selectedFiles.map((file, index) => {
                    const imageUrl =
                      typeof file === "string"
                        ? `http://localhost:3000${file}`
                        : URL.createObjectURL(file);
                    return (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={imageUrl}
                          alt={`preview-${index}`}
                          className="w-full h-full object-cover border rounded-md shadow-md"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 cursor-pointer bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          onClick={() => handleDeleteImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="col-span-2">
              {editProduct && (
                <Button
                  type="button"
                  label="Cập nhật"
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  onClick={btnUpdate}
                />
              )}
              {addProduct && (
                <Button
                  type="submit"
                  label="Thêm"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={btnAddProduct}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
      <div className="card mt-6">
        {error && <p className="text-red-500">Lỗi: {error}</p>}
        <DataTable
          value={filterproducts}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 50]}
          tableStyle={{ minWidth: "85rem" }}
          loading={loading}
          className=""
        >
          <Column
            header="STT"
            body={(rowData, { rowIndex }) => rowIndex + 1}
            style={{ width: "5%" }}
          />
          <Column field="name" header="Tên Sản Phẩm" style={{ width: "15%" }} />
          <Column
            header="Hình ảnh"
            body={imageBodyTemplate}
            style={{ width: "15%" }}
          />
          <Column
            field="nameCategory"
            header="Mẫu Điện Thoại"
            style={{ width: "10%" }}
          />
          <Column field="nameType" header="Loại Điện Thoại" style={{ width: "10%" }} />
          <Column body={oldprice} header="Giá Cũ" style={{ width: "10%" }} />
          <Column body={newprice} header="Giá Mới" style={{ width: "10%" }} />
          <Column field="color" header="Màu Sắc" style={{ width: "8%" }} />
          <Column
            header="Chi Tiết"
            body={(rowData) => (
              <Button
                icon="pi pi-book"
                className="p-button-rounded p-button-secondary"
                onClick={() => btnViewDetails(rowData)}
              />
            )}
            style={{ width: "5%" }}
          />
          <Column
            header="Sửa"
            body={(rowData) => (
              <Button
                label="Sửa"
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info"
                onClick={() => handleEdit(rowData)}
              />
            )}
            style={{ width: "5%" }}
          />
          <Column
            header="Xóa"
            body={(rowData) => (
              <Button
                label="Xóa"
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => btnDeleteProduct(rowData)}
              />
            )}
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
