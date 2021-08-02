import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'

const EditProductDetails=()=>{

    let history =useHistory();
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

    const loadData = async () => {
        const res = await axios.get("http://localhost:3010/product");
        console.log("productData ::", res.data);
        setData(res.data);
    };

    const getData = async () => {
        const res = await axios.get(`http://localhost:3010/product/${id}`);
        console.log("data ::", res.data);
        setData(res.data);
    };
     
    const onFinish = () => {
       
        console.log("data ::",data)
        axios.put(`http://localhost:3010/product/${id}`,data).then(res=>console.log(res)).catch(err=>console.log(err));
        loadData();
        history.push("/")
    }


    return (
        <div style={{ paddingTop: 100, paddingLeft: 200 }}>
            <Card style={{ width: 1000 }}>
                <h2 style={{ textAlign: 'center' }} >Product Details</h2>
                <br />
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item label="Product Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Product Name!',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Product Name" value={data.product_name} onChange={(e)=> setData({ ...data, product_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Company" 
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Company Name!',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Mfg Company Name" value={data.mfg_company} onChange={(e)=> setData({ ...data, mfg_company: e.target.value })}/>
                    </Form.Item>
                    <Form.Item label="Location"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Location !',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Mfg Location" value={data.mfg_location} onChange={(e)=> setData({ ...data, mfg_location: e.target.value })}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default EditProductDetails;