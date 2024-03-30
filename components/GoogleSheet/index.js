import { Table } from "antd";
import React from "react";
import { useSessionStorage } from "../../context/Storage";
import useGoogleSheet from "../../hooks/useGoogleSheet";
import { PAGINATION } from "../../constants/page";

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
    const { googleResponse } = useSessionStorage()
    const { data: sheetData } = useGoogleSheet()

    return (
        <>
            <h2>Google SpreadSheet Data</h2>
            {googleResponse && <Table
                dataSource={sheetData?.values}
                columns={columns}
                rowKey='id'
               pagination={PAGINATION}
            />}
        </>
    );
}

export default GoogleSheet;
