
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom'

const ViewProductDetails = () => {

    let history = useHistory();
    const { id } = useParams();

    const [data, setData] = useState({
        product_name: "",
        mfg_company: "",
        mfg_location: ""
    });

    useEffect(() => {
        console.log("In useEffect");
        getData();

    }, []);

    const getData = async () => {
        const res = await axios.get(`http://localhost:3010/product/${id}`);
        console.log("data ::", res.data);
        setData(res.data);
    };

    return (
        <div style={{ paddingTop: 100, paddingLeft: 200 }}>
            <Card style={{ width: 1000 }}>
                <h2 style={{ textAlign: 'center' }} >Product Details</h2>
                <br />
                <Form
                    layout="vertical"
                >
                    <label>Product Name :</label><label style={{ paddingLeft: '10px' }}>{data.product_name} </label>                   
                    <br/>
                    <label>Company Name :</label><label style={{ paddingLeft: '10px' }}>{data.mfg_company} </label> 
                    <br/>
                    <label >Location Name :</label><label style={{ paddingLeft: '10px' }}>{data.mfg_location} </label> 
                    <Form.Item>
                        <Link className='primary' to='/'>Back to Home</Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default ViewProductDetails;