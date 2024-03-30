import { Table } from 'antd';
import React from 'react';
import useExpenses from '../../hooks/useExpenses';
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
    const { data } = useExpenses(groupId)
    return (
        <>
            <h2>Expenses</h2>
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
