'use client';
import React, { useState, useEffect, use } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BreadCrumb } from 'primereact/breadcrumb';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

import { MeterGroup } from 'primereact/metergroup';
export default function page() {
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const meter = (props, attr) => <span {...attr} key={props.index} style={{ background: `linear-gradient(to right, ${props.color1}, ${props.color2})`, width: props.percentage + '%' }} />;
    const labelList = ({ values }) => (
        <div className="flex flex-wrap gap-3">
            {values.map((item, index) => (
                <Card className="flex-1" key={index}>
                    <div className="flex justify-content-between gap-5">
                        <div className="flex flex-column gap-1">
                            <span className="text-secondary text-sm">{item.label}</span>
                            <span className="font-bold text-lg">{item.value}%</span>
                        </div>
                        <span className="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center" style={{ backgroundColor: item.color1, color: '#ffffff' }}>
                            <i className={item.icon} />
                        </span>
                    </div>
                </Card>
            ))}
        </div>
    );

    const start = ({ totalPercent }) => (
        <div className="flex justify-content-between mt-3 mb-2 relative">
            <span>Storage</span>
            <span style={{ width: totalPercent + '%' }} className="absolute text-right">
                {totalPercent}%
            </span>
            <span className="font-medium">1TB</span>
        </div>
    );

    const values = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog', meterTemplate: meter }
    ];
    // useEffect(() => {
    //     const dataUser = async () => {
    //         const res
    //     }
    // })

    useEffect(() => {
        const datacontact = async () => {
            try {
                const res = await axios.get('http://localhost:3000/contacts/getAllContacts');
                setContacts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        datacontact();
    }, []);
    const items = [{ label: 'Dashboard' }, { label: 'Home' }];
    const home = { icon: 'pi pi-home', url: '/' };
    const barData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
            {
                label: 'Đơn hàng',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56]
            }
        ]
    };
    
    const barOptions = {
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
    };
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <BreadCrumb model={items} home={home} />
            </div>
            <div className="my-6">
                <MeterGroup labelPosition="start" values={values} start={start} meter={meter} labelList={labelList} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="col-span-1 border border-gray-300 rounded-xl bg-white shadow p-4">
                    <h3 className="text-lg font-semibold mb-3">Thống kê đơn hàng</h3>
                    <Chart type="bar" data={barData} options={barOptions} />
                </div>
                <div className="col-span-1 border border-gray-300 rounded-xl bg-white shadow p-4 max-h-full overflow-auto">
                    <DataTable
                        value={contacts}
                        paginator
                        rows={3}
                        rowsPerPageOptions={[3, 6, 20, 50]}
                        scrollable
                        style={{ minWidth: '100%' }}
                    >
                        <Column field="name" header="Họ Tên" />
                        <Column field="email" header="Email" />
                        <Column field="phone" header="Phone" />
                        <Column field="message" header="Tin nhắn" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
