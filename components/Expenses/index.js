import { Table, Select } from 'antd';
import React from 'react';
import useExpenses from '../../hooks/useExpenses';
import { useStorage } from '../../context/Storage';
import { PAGINATION } from '../../constants/page';

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Amount',
        dataIndex: 'cost',
        key: 'cost',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
];

function Expenses({ groupId }) {
    const { selectedMonth, setSelectedMonth } = useStorage();
    const { data } = useExpenses(groupId);

    const getMonthOptions = () => {
        const months = [];
        const now = new Date();

        for (let i = -3; i <= 3; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const monthName = date.toLocaleString('default', { month: 'long' });

            months.push({
                label: `${monthName} ${year}`,
                value: `${year}-${month}`
            });
        }
        return months;
    };

    return (
        <>
            <h2>Expenses</h2>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ marginRight: '8px' }}>Select Month: </label>
                <Select
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    options={getMonthOptions()}
                    style={{ width: '200px' }}
                />
            </div>
            <Table
                dataSource={data?.expenses}
                columns={columns}
                rowKey='id'
                pagination={PAGINATION}
            />
        </>
    )
}

export default Expenses;
