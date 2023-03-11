import { Table } from 'antd';
import React from 'react';
import { useToken } from '../../context/token';
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

    const { token } = useToken()
    if (!token) {
        return <></>
    }

    return (
        <Table dataSource={data?.expenses} columns={columns} />
    )
}

export default Expenses;
