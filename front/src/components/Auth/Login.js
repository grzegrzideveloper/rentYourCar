
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "react-bootstrap-icons";
import napis from "../../img/napis-login.png";
import { Google } from "react-bootstrap-icons";

import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";
import { login } from "../../actions";

import Popoup from "../Popup";
const Login =  (props) => {

   
    
    const onSubmit = (formValues) => {
        props.login(formValues);
        
    }


    const renderInput = ({input, type, placeholder, icon, meta}) => {
       

        return (
                <div className="input-group mt-2">
                    <span className="input-group-text" id="basic-addon1">{icon}</span>
                    <input {...input} type={type} placeholder={placeholder} aria-describedby="basic-addon1" className='form-control' required/>
                </div>
            
        );
    }

    const renderContent = () => {
        if(props.isLoggedIn){
            return (
                <Popoup title="Jesteś już zalogowany" background="dark"/>
            );
        }
        

        return(
            <div className="m-2" style={{opacity: '0.9'}}>
                <div className="card border border-2 border-secondary bg-dark text-light mt-5 p-3 pb-0" style={{ width: '27rem' , borderRadius: '20px'}}>
                    <div className="card-body text-center">
                        <span className="foster-one-font fs-1 mb-5">Logowanie</span>
                        <form onSubmit={props.handleSubmit(onSubmit)}>
                                <Field 
                                    name="username" 
                                    component={renderInput} 
                                    {...{
                                        type: 'email',
                                        placeholder: 'Email',
                                        icon: '@'
                                    }}
                                />
                                <Field 
                                    name="password" 
                                    component={renderInput} 
                                    {...{
                                        type: 'password',
                                        placeholder: 'Password',
                                        icon: <Lock/>
                                    }}
                                />
                            <div className="d-grid col-6 mx-auto">
                                <button  className="btn btn-secondary m-3 p-3" type="submit">ZALOGUJ SIĘ</button>
                            </div>
                        </form>
            
                    </div>
                </div>
                <div className="card border border-2 border-secondary bg-dark text-light p-2" style={{ width: '27rem' , borderRadius: '20px'}}>
                    <div className="card-body ">
                        <div className="text-center">
                            <span> Nie masz konta?
                                <Link to="/auth/register" className="link-primary"> Zarejstruj się</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
        );

    }
    return(
        <div className="" >{renderContent()}</div>
    );

    
};



const formWrapped = reduxForm(
    {
        form: 'login',
        //validate: validate
    }
)(Login);

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps, {login})(formWrapped);