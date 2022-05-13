import React, {useState} from "react";
import img from "../../img/UserNoPhoto.png"
import { connect } from "react-redux";
import Popoup from "../Popup";
import UserOffers from "./UserOffers";
import UserSettings from "./UserSettings";
import UserHistory from "./UserHistory";
const UserProfile = (props) => {
    const [active, setActive] = useState(1); // 1 - ustawienia  2 - oferty
    
    
    const renderContent = () => {
        if(active === 1) return <UserSettings/>;
        else if (active === 2)return <UserOffers/>;
        else if (active === 3) return <UserHistory/>;
    }

    if (props.auth.isLoggedIn){
        return (
            <div className="container-xxl container-xl container-lg mt-4">
                <div className="row bg-light border" style={{borderRadius: '25px'}}>
                    <div className="col-12 text-center " style={{height: '5rem'}}>
                        <h1 className="p-3 kanit">Profil Użytkownika</h1>
                    </div>
                </div>
                <div className="row mt-3 bg-light border" style={{borderRadius: '25px'}}>
                    <div className="col-md-4 p-5 text-center d-flex flex-column  " >
                        <img className="img-thumbnail rounded mx-auto mt-4" src={img} style={{width: '80vw'}}/>
                        <b className="mt-3">{props.auth.firstName} {props.auth.lastName}</b>
                        <p className="mt-2 text-secondary">{props.auth.username}</p>
                        <div className="btn-group-vertical w-100 m-2" style={{cursor: 'pointer'}}>
                            <button onClick={()=> setActive(1)} className={`btn btn-outline-dark ${active === 1 ? 'active btn-dark' : ''}`} aria-current="true">Ustawienia Konta</button>
                            <button onClick={()=> setActive(2)} className={`btn btn-outline-dark ${active === 2 ? 'active btn-dark' : ''}`}>Twoje Oferty</button>
                            <button onClick={()=> setActive(3)} className={`btn btn-outline-dark ${active === 3 ? 'active btn-dark' : ''}`}>Historia Rezerwacji</button>
                        </div>
                    </div>
                    <div className="col-md-8 p-5 text-center" >
                        {renderContent()}
                    </div>
                </div>
            </div>
        );
    }

    return <Popoup title='Musisz być zalogowany.'></Popoup>
    
};

const mapStateToProps = (state) => {
    return { auth: state.auth   }
} 

export default connect(mapStateToProps)(UserProfile);