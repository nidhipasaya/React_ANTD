import React,{useState} from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Card } from 'antd';
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios';

const Register = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const onFinish = () => {
    
    axios
      .post("http://localhost:5000/api/auth/register", {
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
    <h2 style={{textAlign:'center'}} >SignUp</h2>
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" >Submit</Button>
      </Form.Item>
      <p>
         Already have an account then please <Link to="/login">Login</Link>
      </p>
    </Form>
    </Card>
    </div>
    // <div style={{ marginTop: "100px" }}>
    //   <h2>Register Page</h2>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <form
    //     className={classes.root}
    //     noValidate
    //     autoComplete="off"
    //     onSubmit={register}
    //   >
    //     <TextField
    //       id="username"
    //       label="Username"
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <br />
    //     <TextField
    //       id="password"
    //       label="Password"
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <br />
    //     <Button
    //       style={{ width: "100px" }}
    //       variant="contained"
    //       color="primary"
    //       type="submit"
    //     >
    //       Register
    //     </Button>
    //   </form>
    //   <p>
    //     Already have an account then please <Link to="/login">Login</Link>
    //   </p>
    // </div>

  );
};

export default Register;
