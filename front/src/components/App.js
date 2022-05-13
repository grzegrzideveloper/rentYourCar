import React, { useEffect } from "react";
import Header from "./Header" 
import { Router, Route } from "react-router-dom";
import history from "../history";
import Main from "./Main";
import CreateOffer from "./Offers/CreateOffer";
import { useDispatch } from "react-redux";
import UserProfile from "./UserProfile/UserProfile";
import AuthLayout from "./Auth/AuthLayout";
import AdminPanel from "./AdminPanel";
import CreateSuccess from "./Offers/CreateSuccess";
import OfferShow from "./Offers/OfferShow";
import EditOffer from "./Offers/EditOffer";
import OfferDelete from "./Offers/OfferDelete";
import BookingSuccess from "./Booking/BookingSuccess";
const App = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        const authString = localStorage.getItem('auth');
        let auth;
        if (authString){
            auth = JSON.parse(authString);
            dispatch({type: 'LOGIN', payload: auth});
        }
    }, []);

    return (
       
            <Router history={history}>
                <div>
                    <Header />
                    <Route path="/" exact component={Main}/>
                    <Route path="/admin" exact component={AdminPanel}/>
                    <Route path="/auth" component={AuthLayout}/>
                    <Route path="/userpanel" exact component={UserProfile} />
                    <Route path="/offer/create" exact component={CreateOffer} />
                    <Route path="/offer/show/:id" exact component={OfferShow} />
                    <Route path="/offer/edit/:id" exact component={EditOffer} />
                    <Route path="/offer/delete/:id" exact component={OfferDelete} />
                    <Route path="/offer/create/success" exact component={CreateSuccess}/>
                    <Route path="/booking/success" exact component={BookingSuccess}/>
                </div> 
            </Router>  
        
        
    );
};

export default App;