import { Table } from 'antd';
import moment from 'moment';
import React from 'react';
import useGroups from '../../hooks/useGroups';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name - b.name
    },
    {
        title: 'Last Updated',
        dataIndex: 'updated_at',
        key: 'updated_at',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(moment(a.updated_at).format("LLL")) - new Date(moment(b.updated_at).format("LLL"))
    },
];

function Groups() {
    const { data } = useGroups()
    return (
        <>
            <Table
                dataSource={data?.groups}
                columns={columns}
                pagination={{
                    pageSize: 5,
                }}
                rowKey='id'
            />
        </>
    )
}

export default Groups;
