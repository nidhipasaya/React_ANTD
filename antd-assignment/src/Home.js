import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import ProductDetails from "./pages/ProductDetails";

const Home = (props) => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  const [login, setLogin] = useState("");

  useEffect(() => {
    hydrateStateWithLocalStorage();
  }, [props.logoutUser]);

  const logout = () => {
    localStorage.removeItem("login");
    props.setLogoutUser(true);
  };

  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch (e) {
        setLogin("");
      }
    }
  };

  const userNotLogin = () => (
    <>
      <h2>It seem's like you are not login</h2>
      <h3>
        If you have an account, then please <Link to="/login">Login</Link>
      </h3>
      <h3>
        Don't have an account, then please do{" "}
        <Link to="/register">Register</Link>
      </h3>
    </>
  );
  return (
    <div style={{ marginTop: "10px" }}>
      {isLoginTrue && isLoginTrue.userLogin ? (
        <>
          <Menu theme="light" style={{ backgroundColor: "lightgray" }} mode="horizontal" defaultSelectedKeys={0}>
            <Menu.Item ><Link
              style={{ width: "100px" }}
            >
              Home
            </Link></Menu.Item>
            <Menu.Item style={{ textAlign: "right" }}>{!props.logoutUser && login && login.userLogin ? (
              <Link
                style={{ width: "100px" }}
                onClick={logout}
                to="/"
              >
                Logout
              </Link>
            ) : (
              <Link to="/login"
                style={{ width: "100px" }}
                color="secondary"
              >
                Login

              </Link>
            )}</Menu.Item>

          </Menu>
          <h2>Welcome Back User</h2>
          <div style={{paddingLeft:"1000px"}}><Button className="primary" ><Link to="/add/product">Add New Product</Link></Button></div>
          <ProductDetails/>
        </>
      ) : (
        <>{userNotLogin()}</>
      )}
    </div>
  );
};

export default Home;
