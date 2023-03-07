import React, { useState } from 'react';
import { Button, Col, InputNumber, Row, Table } from 'antd';
import useExpenses from '../../hooks/useExpenses';
import { useToken } from '../../context/token';

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

function Expenses() {
    const [groupId, setGroupId] = useState(null)
    const { data } = useExpenses(groupId)

    const { token } = useToken()
    if (!token) {
        return <></>
    }

    return (
        <>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <InputNumber
                        value={groupId} // The current value of the input
                        onChange={setGroupId} // The function to call when value changes
                        size="large" // The size of the input box
                        placeholder="Enter group ID" // The placeholder text when empty
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col className="gutter-row" span={10}>
                    <Button
                        type="primary"
                        size="large"
                        style={{ width: '100%' }}
                    >
                        Export to Google Sheets
                    </Button>
                </Col>
            </Row>
            <br />
            <Table dataSource={data?.expenses} columns={columns} />
        </>
    )
}

export default Expenses;
