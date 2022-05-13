import React, { useEffect } from "react";
import { fetchOffer, editOffer, fetchUser } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import OfferPreview from "./OfferPreview";
const EditOffer = ({offer, match, user, auth, fetchOffer, fetchUser, editOffer}) => {
    
    
    const sticky = {
        position: '-webkit-sticky',
        position: 'sticky',
        top: '10%',
    };
    useEffect(()=> {
        fetchOffer(match.params.id);
    },[]);
    useEffect(()=> {
        fetchUser(offer.userId);
    }, [offer])

    const onSubmit=(formValues)=> {
        const formData = new FormData();
        // formData.append("model.Brand", formValues.brand);
        // formData.append("model.Model", formValues.model);
        formData.append("model.NumPassangers", formValues.numPassangers);
        formData.append("model.Transmission", formValues.transmission);
        formData.append("model.PricePerDay", formValues.pricePerDay);
        formData.append("model.Adress", formValues.adress);
        formData.append("model.City", formValues.city);
        formData.append("model.PostalCode", formValues.postalCode);
        formData.append("model.ImageName", formValues.imageName);
        formData.append("model.ImageFile", formValues.imageFile);
        editOffer(offer.id, formData);
    }


    return (
        <div className="container">
            <h1 className="mb-2 mt-3 kanit">Edytuj ogłoszenie</h1>
            
            {/* <OfferForm onSubmit={onSubmit} initialBrand={offer.brand} initialModel={offer.model} img={offer.imageUrl} mode="edit"/> */}
            <OfferPreview offer={offer} user={user} edit="true" onSubmit={onSubmit}/>
                
            
        </div>
    );
};

const mapStateToProps = (state) => {
    return { offer: state.offer, user: state.user, auth: state.auth };
};

export default connect(mapStateToProps, {fetchOffer, editOffer, fetchUser})(EditOffer);
