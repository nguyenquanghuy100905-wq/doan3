'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

export default function page() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [pieChartData, setPieChartData] = useState({});
    const [topProducts, setTopProducts] = useState([]);
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Đơn hàng',
                backgroundColor: '#42A5F5',
                data: []
            }
        ]
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Lấy tổng số sản phẩm
                const productsRes = await axios.get('http://localhost:3000/products/getAllProducts');
                
                // Lấy tổng số người dùng
                const usersRes = await axios.get('http://localhost:3000/users/getAllUsers');
                
                // Lấy tất cả đơn hàng
                const ordersRes = await axios.get('http://localhost:3000/orders/getAllOrders');
                const orders = ordersRes.data;
                
                // Tính tổng doanh thu (sử dụng parseFloat để tránh cộng chuỗi)
                const totalRevenue = orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
                
                setStats({
                    totalProducts: productsRes.data.length,
                    totalUsers: usersRes.data.length,
                    totalOrders: orders.length,
                    totalRevenue: totalRevenue
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        const fetchProductsByType = async () => {
            try {
                const response = await axios.get('http://localhost:3000/thongke/ThongKeProductByType');
                const data = response.data;

                const labels = data.map(item => item.type_name);
                const counts = data.map(item => item.quantity_product);

                const backgroundColor = [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#C9CBCF'
                ];

                setPieChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: backgroundColor.slice(0, data.length),
                            hoverBackgroundColor: backgroundColor.slice(0, data.length)
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching product by type:', error);
            }
        };
        fetchProductsByType();
    }, []);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/thongke/ThongKeSanPhamBanChay?limit=5');
                setTopProducts(response.data || []);
            } catch (error) {
                console.error('Error fetching top products:', error);
                setTopProducts([]);
            }
        };
        fetchTopProducts();
    }, []);

    useEffect(() => {
        const fetchOrdersByMonth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/thongke/ThongKeDonHangTheoThang');
                const data = response.data || [];

                // Sắp xếp dữ liệu theo trình tự thời gian tăng dần (năm -> tháng)
                const sortedData = [...data].sort((a, b) => {
                    if (a.year !== b.year) return a.year - b.year;
                    return a.month - b.month;
                });

                const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
                
                const labels = sortedData.map(item => monthNames[item.month - 1] || `Tháng ${item.month}`);
                const counts = sortedData.map(item => item.total_orders);

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Đơn hàng',
                            backgroundColor: '#42A5F5',
                            data: counts
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching orders by month:', error);
            }
        };
        fetchOrdersByMonth();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(value) || 0);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-2xl font-bold text-black">Dashboard</h2>
                <nav className="flex items-center text-sm text-gray-600">
                    <Link href="/nguoidung/trangchu" className="flex items-center hover:text-orange-600 transition-colors">
                        <i className="pi pi-home mr-2"></i>
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">Dashboard</span>
                </nav>
            </div>

            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Tổng Sản Phẩm</p>
                            <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
                        </div>
                        <i className="pi pi-shopping-cart text-4xl opacity-50"></i>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Tổng Người Dùng</p>
                            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                        </div>
                        <i className="pi pi-users text-4xl opacity-50"></i>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Tổng Đơn Hàng</p>
                            <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
                        </div>
                        <i className="pi pi-shopping-bag text-4xl opacity-50"></i>
                    </div>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm opacity-90">Tổng Doanh Thu</p>
                            <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalRevenue)}</p>
                        </div>
                        <i className="pi pi-dollar text-4xl opacity-50"></i>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="col-span-1 border border-gray-300 rounded-xl bg-white shadow p-4">
                    <h3 className="text-lg font-semibold mb-3 text-black">Thống kê đơn hàng</h3>
                    <Chart type="bar" data={barData} options={{
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#495057'
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#495057'
                                },
                                grid: {
                                    color: '#ebedef'
                                }
                            },
                            y: {
                                ticks: {
                                    color: '#495057'
                                },
                                grid: {
                                    color: '#ebedef'
                                }
                            }
                        }
                    }} />
                </div>
                <div className="col-span-1 border border-gray-300 rounded-xl bg-white shadow p-4">
                    <h3 className="text-lg font-semibold mb-3 text-black">Thống kê sản phẩm theo loại</h3>
                    <Chart type="pie" data={pieChartData} options={{
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                    color: '#495057'
                                }
                            }
                        }
                    }} />
                </div>
            </div>

            {/* Sản phẩm bán chạy */}
            <div className="mt-6 border border-gray-300 rounded-xl bg-white shadow p-4">
                <h3 className="text-lg font-semibold mb-4 text-black">Top 5 Sản Phẩm Bán Chạy</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên Sản Phẩm</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đã Bán</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doanh Thu</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-900">{product.product_name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(product.price)}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-blue-600">{product.total_sold}</td>
                                    <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(product.total_revenue)}</td>
                                </tr>
                            ))}
                            {topProducts.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                        Chưa có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
