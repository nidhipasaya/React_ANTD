import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import AddProductDetails from "./pages/AddProductDetails";
import EditProductDetails from "./pages/EditProductDetails";
import ViewProductDetails from "./pages/ViewProductDetails";

function App() {
  const [logoutUser, setLogoutUser] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home logoutUser={logoutUser} setLogoutUser={setLogoutUser} />
          </Route>
          <Route exact path="/add/product">
            <AddProductDetails/>
          </Route>
          <Route exact path="/edit/product/:id">
          <EditProductDetails/>
          </Route>
          <Route exact path="/product/:id">
          <ViewProductDetails/>
            
          </Route>
          
          <Route path="/login">
            <Login setLogoutUser={setLogoutUser} />
          </Route>
          <Route path="/register">
            <Register setLogoutUser={setLogoutUser} />
          </Route>
          <Route >
            
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
