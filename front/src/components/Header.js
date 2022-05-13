import React, { useState, useEffect } from "react";
import { PersonCircle, PlusCircleFill, BoxArrowInRight, BoxArrowInLeft, GearFill, ClipboardData } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions";

const Header = (props) => {


    const headerStyle = {
        
        WebkitBoxShadow: '0px 12px 20px -10px rgba(0, 0, 0, 1)',
        MozBoxShadow: '0px 12px 20px -10px rgba(0, 0, 0, 1)',
        boxShadow: '0px 12px 20px -10px rgba(0, 0, 0, 1)',
        width: '100%', 
        opacity: '0.9', 
        backgroundColor: 'black',
    }   

    const onLogout = () => {
        props.logout();
    }

    
    const renderAdminPanelOption = () => {
        if (!props.auth.admin){
            return <></>;
        }
        return (
            <li className="m-2">
                <Link to="/admin" className="border-bottom border-2 border-light text-light " style={{textDecoration: 'none'}}>
                    <div><ClipboardData size={'1.2rem'} /><b className="ms-2" >AdminPanel</b></div> 
                </Link>
            </li>
        );
    }

    const renderUserButtons = () => {
        if(!props.auth.isLoggedIn){
            return (
                <div className="navbar-nav ms-auto">
                    <Link to="/auth/login" className="border-bottom border-2 border-dark text-light me-3" style={{textDecoration: 'none'}}>                 
                        <div><BoxArrowInRight size={'1.2rem'} /><b className="ms-2">Zaloguj się</b></div>
                    </Link>
                </div>
            ); 
        }
        return (
            <>
                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropstart">
                        <a className="nav-link dropdown-toggle border-bottom border-2 border-dark text-light me-3" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <GearFill size={'1.2rem'} /><b className="ms-2" >Witaj {props.auth.firstName}</b>
                        </a>
                        <ul className="dropdown-menu dropdown-menu bg-dark border border-light" aria-labelledby="navbarDarkDropdownMenuLink" style={{minWidth: '200px', zIndex: 999999}}>
                            <li className="m-2">
                                <Link to="/offer/create" className="border-bottom border-2 border-light text-light " style={{textDecoration: 'none'}}>
                                    <div><PlusCircleFill size={'1.2rem'} /><b className="ms-2" >Dodaj Ogłoszenie</b></div> 
                                </Link>
                            </li>
                            <li className="m-2">
                                <Link to="/userpanel" className="border-bottom border-2 border-light text-light " style={{textDecoration: 'none'}}>                 
                                    <div><PersonCircle size={'1.2rem'} /><b className="ms-2" >Profil Użytkownika</b></div>
                                </Link>
                            </li>
                            
                            {renderAdminPanelOption()}
                            <li className="m-2">
                                <a href='' onClick={onLogout} className="border-bottom border-2 border-light text-light " style={{textDecoration: 'none'}}>                 
                                    <div><BoxArrowInLeft size={'1.2rem'} /><b className="ms-2" >Wyloguj się</b></div>
                                </a>
                            </li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </>

                
        );
        
    };

    return (
            <nav className="navbar navbar-expand" style={headerStyle}>
                
                <Link className="navbar-brand foster-one-font ms-5 p-0 text-light fs-2" to="/" >RentYourCar</Link> 
                <>
                    {renderUserButtons()}
                </>
                    
            </nav>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth  }
} 

export default connect(mapStateToProps, { logout })(Header);