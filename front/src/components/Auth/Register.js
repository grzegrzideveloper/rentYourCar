import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HouseDoor } from "react-bootstrap-icons";
import { Lock, TelephoneFill } from "react-bootstrap-icons";
import napis from "../../img/napis-register.png";
import axios from "axios";
import { connect } from "react-redux";
import Popoup from "../Popup";
import RegisterSuccess from "./RegisterSuccess";
const Register =  (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [postalcode, setPostalcode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [success, setSuccess] = useState(false);
    const apiCall = async () => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/users/register',
            data: {
                "firstName": firstName,
                "lastName": lastName,
                "username": userName,
                "phone": phone,
                "adress": adress,
                "city": city,
                "postalcode": postalcode,
                "password": password
            },
            config: { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
              }}
        }).then(
            response => {
                setSuccess(true);
            }
        ).catch((err) => {        
            alert(err.response.data.message);    
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordRepeat){
            document.querySelector('#password').className += ' is-invalid';
            document.querySelector('#repeatpassword').className += ' is-invalid';
            alert('Hasła nie są takie same');
        }else{
            apiCall();
        }
    };

    const renderContent = () => {
        if(props.isLoggedIn){
            return <Popoup title="Jesteś już zalogowany" background="dark"/>;
        }
        if(success){
            return <RegisterSuccess/>
        }
        return(
            <div>
                <div className="card mx-auto my-auto border border-2 border-secondary mb-2 mt-5 p-3 pb-0 bg-dark text-light" style={{maxWidth: '40rem', opacity:'0.9', borderRadius: '20px'}}>
                    <div className="card-body ">
                        <div className="mb-4 text-center">
                        <span className="foster-one-font fs-1 mb-5">Rejestracja</span>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input id="firstname" onChange={(e)=>setFirstName(e.target.value)} value={firstName} type="text" className="form-control mb-1" placeholder="Imię" aria-label="First name" required/>
                                </div>
                                <div className="col-md-6">
                                    <input id="lastname" onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" className="form-control  mb-1 mb-1" placeholder="Nazwisko" aria-label="Last name" required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="input-group ">
                                        <span className="input-group-text mb-1" id="basic-addon1">@</span>
                                        <input id="username" onChange={(e)=>setUserName(e.target.value)} value={userName} type="email" className="form-control  mb-1" placeholder="email" aria-label="Username"
                                            aria-describedby="basic-addon1" required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group ">
                                        <span className="input-group-text mb-1" id="basic-addon1"><TelephoneFill/></span>
                                        <input id="phone" onChange={(e)=>setPhone(e.target.value)} value={phone} type="text" className="form-control  mb-1" placeholder="Telefon" aria-label="Phone"
                                            aria-describedby="basic-addon1" required/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-5">
                                <div className="input-group  ">
                                    <span className="input-group-text mb-1" id="basic-addon1"><HouseDoor/></span>
                                    <input id="address" onChange={(e)=>setAdress(e.target.value)} value={adress} type="text" className="form-control  mb-1" 
                                        placeholder="Ulica nr. domu" required/>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                        <input id="city" onChange={(e)=>setCity(e.target.value)} value={city} type="text" className="form-control  mb-1"  placeholder="Miejscowość" required/>
                                    
                                </div>
                                <div className="col-md-2">
                                    <input id="postcode" onChange={(e)=>setPostalcode(e.target.value)} value={postalcode} type="text" className="form-control  mb-1"  placeholder="00-000" required/>
                                
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <span className="input-group-text mb-1" id="basic-addon1"><Lock/></span>
                                        <input id="password" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control  mb-1" placeholder="hasło" aria-label="password"
                                            aria-describedby="basic-addon1" required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <span className="input-group-text mb-1" id="basic-addon1"><Lock/></span>
                                        <input id="repeatpassword" onChange={(e)=>setPasswordRepeat(e.target.value)} value={passwordRepeat} type="password" className="form-control  mb-1" placeholder="powtórz hasło" aria-label="passwordrepit"
                                            aria-describedby="basic-addon1" required/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="accept" required/>
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        <span>Akceptuję
                                            <a className="link-primary"> regulamin serwisu.</a>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button className="btn btn-secondary mx-auto p-3" type="submit">ZAREJSTRUJ SIĘ</button>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="card mx-auto border border-2 border-secondary p-2 bg-dark text-light" style={{maxWidth: '40rem', opacity:'0.9' , borderRadius: '20px'}}>
                    <div className="card-body ">
                        <div className="text-center">
                            <span>Masz konto?
                                <Link to="/auth/login" className="link-primary"> Zaloguj się</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return <div className="d-flex align-items-center justify-content-center" >{renderContent()}</div>
        
}

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps)(Register);