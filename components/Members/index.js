import { Table } from 'antd';
import React from 'react';
import useMembers from '../../hooks/useMembers';
import { PAGINATION } from '../../constants/page';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (text, record) => (
            <>{text} {record?.last_name}</>
        ),
    },
];

function Members({ groupId }) {
    const { data: members } = useMembers(groupId)
    return (
        <>
            <h2>Group Members</h2>
            <Table
                dataSource={members}
                columns={columns}
                rowKey='id'
               pagination={PAGINATION}
            />
        </>
    )
}

export default Members;
