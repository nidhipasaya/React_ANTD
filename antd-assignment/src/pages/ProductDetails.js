/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
const UserDetails = () => {
    const [data, setData] = useState([]);

    const deleteProduct = async (id) => {
        var res = confirm("Are you want to delete ?")
            if(res === true) {
            await axios.delete(`http://localhost:3010/product/${id}`).
            then(()=>console.log("successfully deleted...")).
            catch((err)=>console.log(err))
            loadData();
        }

    }
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name'
        },
        {
            title: 'Company',
            dataIndex: 'mfg_company',
            key: 'mfg_company',
        },
        {
            title: 'Location',
            dataIndex: 'mfg_location',
            key: 'mfg_location',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/product/${record.id}`}>View</Link>
                    <Link class="btn btn-outline-primary m-1" to={`/edit/product/${record.id}`}>Edit</Link>
                    <Link onClick={() => deleteProduct(record.id)}>Delete</Link>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        console.log("In useEffect");
        loadData();

    }, []);

    const loadData = async () => {
        const res = await axios.get("http://localhost:3010/product");
        console.log("userData ::", res.data);
        setData(res.data);
    };
    return (<div>
        <Table dataSource={data} columns={columns} />;
    </div>)
}
export default UserDetails;