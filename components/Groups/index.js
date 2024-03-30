import { Radio, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import useGroups from '../../hooks/useGroups';
import { useSessionStorage } from '../../context/Storage';
import { PAGINATION } from '../../constants/page';

const columns = [
    {
        title: 'Group ID',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Group Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name - b.name
    },
    {
        title: 'Last Updated',
        dataIndex: 'updated_at',
        key: 'updated_at',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(moment(a.updated_at).format("LLL")) - new Date(moment(b.updated_at).format("LLL"))
    },
];


function Groups() {
    const { data } = useGroups()
    const { setGroupId } = useSessionStorage()

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setGroupId(selectedRowKeys)
        },
    };

    return (
        <>
            <h2>Select Group</h2>
            <Table
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                dataSource={data?.groups}
                columns={columns}
               pagination={PAGINATION}
                rowKey='id'
            />
        </>
    )
}

export default Groups;
