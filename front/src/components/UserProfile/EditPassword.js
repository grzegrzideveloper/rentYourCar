import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
const EditPasswod = (props) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    return (
        <form className="form mt-3">
                   <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <div className="mt-3">
                                <label htmlFor="password" className="form-label">Stare Hasło</label>
                                <input id="password" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control  mb-1"   required/>
                            </div>       
                            <div className="mt-3">
                                <label htmlFor="newpassword" className="form-label">Nowe Hasło</label>
                                <input id="newpassword" onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="password" className="form-control  mb-1"   required/>
                            </div> 
                            <div className="mt-3">
                                <label htmlFor="newpassword2" className="form-label">Powtórz Nowe Hasło</label>
                                <input id="newpassword2" onChange={(e)=>setPasswordRepeat(e.target.value)} value={passwordRepeat} type="password" className="form-control  mb-1"   required/>
                            </div> 
                        </div>
                   </div>
            </form> 
    );
};

const mapStateToProps = (state) => {
    return {auth: state.auth};
};

export default connect(mapStateToProps)(EditPasswod);