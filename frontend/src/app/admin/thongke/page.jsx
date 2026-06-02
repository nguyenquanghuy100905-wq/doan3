'use client';
import React, { useState, useEffect, use } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Rating } from "primereact/rating";
export default function page() {
    const [feedback, setFeedback] = useState([]);
    const items = [{ label: 'Dashboard' }, { label: 'Thống Kê' }];
    const home = { icon: 'pi pi-home', url: '/' };
    const [chartDataType, setChartDataType] = useState({});
    const [chartOptionsType, setChartOptionsType] = useState({});
    const [chartDataMonth, setChartDataMonth] = useState({});
    const [chartOptionsMonth, setChartOptionsMonth] = useState({});
    useEffect(() => {
        const fetchProductByType = async () => {
            try {
                const response = await axios.get('http://localhost:3000/thongke/ThongKeProductByType');
                const data = response.data;

                const labels = data.map(item => item.type_name);
                const counts = data.map(item => item.quantity_product);

                const documentStyle = getComputedStyle(document.documentElement);
                const backgroundColor = [
                    documentStyle.getPropertyValue('--blue-500'),
                    documentStyle.getPropertyValue('--yellow-500'),
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--cyan-500'),
                    documentStyle.getPropertyValue('--pink-500'),
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--red-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--orange-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--lime-500'),
                    documentStyle.getPropertyValue('--amber-500'),
                    documentStyle.getPropertyValue('--deep-orange-500')
                ];
                const hoverBackgroundColor = [
                    documentStyle.getPropertyValue('--blue-400'),
                    documentStyle.getPropertyValue('--yellow-400'),
                    documentStyle.getPropertyValue('--green-400'),
                    documentStyle.getPropertyValue('--cyan-400'),
                    documentStyle.getPropertyValue('--pink-400'),
                    documentStyle.getPropertyValue('--indigo-400'),
                    documentStyle.getPropertyValue('--red-400'),
                    documentStyle.getPropertyValue('--purple-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--lime-400'),
                    documentStyle.getPropertyValue('--amber-400'),
                    documentStyle.getPropertyValue('--deep-orange-400')
                ];
                setChartDataType({
                    labels: labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: backgroundColor.slice(0, data.length),
                            hoverBackgroundColor: hoverBackgroundColor.slice(0, data.length)
                        }
                    ]
                });
                setChartOptionsType({
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true
                            }
                        }
                    }
                });

            } catch (error) {
                console.error('Error fetching product by type:', error);
            }
        };

        fetchProductByType();
    }, []);

    useEffect(() => {
        const fetchProductByType = async () => {
            try {
                const response = await axios.get('http://localhost:3000/thongke/ThongKeDonHangTheoThang');
                const dataOrder = response.data;

                const quantity = dataOrder.map(item => item.so_luong_don_hang);
                const total = dataOrder.map(item => item.doanh_thu);
                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color');
                const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
                const data = {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: 'Số Lượng Đơn Hàng',
                            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            data: quantity
                        },
                        {
                            label: 'Tổng Doanh Thu',
                            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                            borderColor: documentStyle.getPropertyValue('--pink-500'),
                            data: total
                        }
                    ]
                };
                const options = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.8,
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: textColor
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColorSecondary,
                                font: {
                                    weight: 500
                                }
                            },
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        },
                        y: {
                            ticks: {
                                color: textColorSecondary
                            },
                            grid: {
                                color: surfaceBorder,
                                drawBorder: false
                            }
                        }
                    }
                };

                setChartDataMonth(data);
                setChartOptionsMonth(options);
            } catch (error) {
                console.error('Error fetching product by type:', error);
            }
        };

        fetchProductByType();
    }, []);
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get('http://localhost:3000/feedbacks/getAllFeedbacks');
                setFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        }
        fetchFeedback();

    }, [])
    const imageTemplate = (rowData) => (
        <img
            src={`http://localhost:3000${rowData.image_user}`}
            alt="content"
            className="w-20 h-20 object-cover border"
        />
    );
    const star = (rowData) => (
        <Rating value={rowData.star} cancel={false} />
    );
    return (
        <div className='w-full'>
            <div className="flex justify-between items-center mt-6 px-6">
                <h2 className="text-3xl font-semibold text-gray-800">Thống Kê</h2>
                <BreadCrumb model={items} home={home} className="text-sm text-gray-600" />
            </div>

            <div className="mt-6">
                <Chart type="bar" data={chartDataMonth} options={chartOptionsMonth} className="w-full h-[400px] rounded-xl shadow-lg" />
            </div>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="m-auto">
                    <Chart type="pie" data={chartDataType} options={chartOptionsType} className="w-full h-[350px] rounded-xl shadow-lg" />

                </div>
                <DataTable
                    value={feedback}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '100%' }}
                    className="p-datatable-responsive p-shadow-2 rounded-lg"
                >
                    <Column
                        header="STT"
                        body={(rowData, { rowIndex }) => rowIndex + 1}
                        style={{ width: "5%" }}
                    />
                    <Column field="user_name" header="Name" style={{ width: '20%' }} />
                    <Column field="product_name" header="Product" style={{ width: '30%' }} />
                    <Column header="Image" body={imageTemplate} style={{ width: '25%' }} />
                    <Column body={star} header="Star" style={{ width: '10%' }} />
                </DataTable>

            </div>
        </div>
    )
};
