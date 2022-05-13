import React from "react";
import { Route } from "react-router-dom";
import bg from "../../img/authbg2.jpg"
import Login from "./Login";
import Register from "./Register";
const AuthLayout = ()=> {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover', height:'100vh' }}>
            <Route path="/auth/login" component={Login}/>
            <Route path="/auth/register" component={Register}/>
        </div>
    );
}

export default AuthLayout;