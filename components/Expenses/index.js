import { Table } from 'antd';
import React from 'react';
import useExpenses from '../../hooks/useExpenses';

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
    const { data } = useExpenses(groupId)
    return (
        <Table
            dataSource={data?.expenses}
            columns={columns}
            rowKey='id'
            pagination={{
                pageSize: 5,
            }}
        />
    )
}

export default Expenses;
