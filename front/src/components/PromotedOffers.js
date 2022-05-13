import React, { useEffect } from "react";
import _ from "lodash";
import OfferCard from "./Offers/OfferCard";
import { connect } from "react-redux";
import { fetchOffers } from "../actions";
const PromotedOffers = ({offers, fetchOffers}) => {

    

    useEffect(()=> {
        fetchOffers();
    }, []);

    const renderOffers = () => {
        const arr = [];
        _.mapValues(offers, (o)=> {
            arr.push(o);
        });
        return arr.map(o => {
            if(o.isActive) return <OfferCard id={o.id} photo={o.imageUrl} title={`${o.brand} ${o.model}`} city={o.city} passangers={o.numPassangers} transmission={o.transmission} price={o.pricePerDay} />
            return null;
        })
    }

    return (
        <div className="text-center mt-3  ">
            <h1 className="kanit"> Oferty </h1>
            <div className="d-flex flex-wrap justify-content-center mt-4">
                
                {renderOffers()}


            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {offers: state.offer};
}

export default connect(mapStateToProps, {fetchOffers})(PromotedOffers);