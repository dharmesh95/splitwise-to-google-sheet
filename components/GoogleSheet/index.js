import { Table } from "antd";
import React from "react";
import { useLocalStorage } from "../../context/LocalStorage";
import useGoogleSheet from "../../hooks/useGoogleSheet";

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

// create a functional component
function GoogleSheet() {
    const { googleResponse } = useLocalStorage()
    const { data: sheetData } = useGoogleSheet()

    return (
        <>
            {googleResponse && <Table
                dataSource={sheetData?.values}
                columns={columns}
                rowKey='id'
                pagination={{
                    pageSize: 5,
                }}
            />}
        </>
    );
}

export default GoogleSheet;
