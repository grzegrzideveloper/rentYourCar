import React, { useState } from "react";
import noPhoto from "../../img/NoPhoto.png"
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createOffer } from "../../actions";
import Popoup from "../Popup";
import history from "../../history";
import OfferForm from "./OfferForm";
const CreateOffer = (props) => {

    const sticky = {
        position: '-webkit-sticky',
        position: 'sticky',
        top: '40%',
    };
    const onSubmit = (formValues) => {
        
        const formData = new FormData();
        formData.append("model.UserId", props.userId)
        formData.append("model.Brand", formValues.brand)
        formData.append("model.Model", formValues.model)
        formData.append("model.NumPassangers", formValues.numPassangers)
        formData.append("model.Transmission", formValues.transmission)
        formData.append("model.PricePerDay", formValues.pricePerDay)
        formData.append("model.Adress", formValues.adress)
        formData.append("model.City", formValues.city)
        formData.append("model.PostalCode", formValues.postalCode)
        formData.append("model.ImageName", formValues.imageName)
        formData.append("model.ImageFile", formValues.imageFile)
        
        props.createOffer(formData);
    }

    const renderContent = () => {
        if(!props.isLoggedIn){
            return <Popoup title="Zaloguj się, żeby dodać ogłoszenie"/>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 d-flex justify-content-center">
                        <div className="w-75 mt-5 me-5">
                            
                            <h2 className="mb-5 kanit">Dodaj ogłoszenie</h2>
                            <OfferForm onSubmit={onSubmit} mode="create"/>
                        </div>
                    </div>
                </div>
            </div>         
        );
    };

    return (
        <React.Fragment>
            
            {renderContent()}
        </React.Fragment>
    );
};



const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn, userId: state.auth.id };
}

const formWrapped = reduxForm(
    {
        form: 'createOffer'
    }
)(CreateOffer)

export default connect(mapStateToProps, {createOffer})(formWrapped);