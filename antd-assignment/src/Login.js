import React,{useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios';



const Login = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const onFinish = () => {
    console.log('username:', email," password:",password);
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        setLogoutUser(false);
        history.push("/");
      })
      .catch((error) => setError(error.response.data.message));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ paddingTop:100,paddingLeft:380}}>
    <Card style={{ width: 600 }}>
    <h2 style={{textAlign:'center'}} >Login</h2>
    <br/>
    {error && <p style={{color:'red'}}>{error}</p>}
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
     
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
    
    <Form.Item
      style={{width:"400px"}}
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>

      <Form.Item
      style={{width:"400px"}}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item
      style={{width:"400px"}}
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
      style={{width:"400px"}}
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" >Submit</Button>
      </Form.Item>
      <p>
      <Link to="/register">Register</Link> yourself
      </p>
    </Form>
    </Card>
    </div>
  );
};

export default Login;
