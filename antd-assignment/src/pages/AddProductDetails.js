import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router';

const AddProductDetails = () => {
    
    let history =useHistory();
  
    const [data, setData] = useState({
        product_id: "",
        product_name: "",
        mfg_company: "",
        mfg_location: ""
    })
  ;

    const loadData = async () => {
        const res = await axios.get("http://localhost:3010/product");
        console.log("userData ::", res.data);
        setData(res.data);
    };

    const onFinish = () => {
       
        console.log("data ::",data)
        axios.post("http://localhost:3010/product",data).then(res=>console.log(res)).catch(err=>console.log(err));
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
                    <Form.Item label="Product Name" name="product_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Product Name!',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Product Name" onChange={(e)=> setData({ ...data, product_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Company" name="mfg_company"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Company Name!',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Mfg Company Name" onChange={(e)=> setData({ ...data, mfg_company: e.target.value })}/>
                    </Form.Item>
                    <Form.Item label="Location" name="mfg_location" 
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter Location !',
                            },
                        ]}
                        required >
                        <Input placeholder="Enter Mfg Location" onChange={(e)=> setData({ ...data, mfg_location: e.target.value })}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
export default AddProductDetails;