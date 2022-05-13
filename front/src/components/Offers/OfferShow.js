import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOffer, fetchUser } from "../../actions";
import OfferPreview from "./OfferPreview";
import BookingModal from "../Booking/BookingModal";
const OfferShow = (props) => {
    const id = props.match.params.id;

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(()=> {
        props.fetchOffer(id);
        //console.log(props.offer.userId);
    }, []);
    useEffect(()=> {
        props.fetchUser(props.offer.userId);
    }, [props.offer])

    return (
        <>
        <BookingModal offer={props.offer} open={modalOpen} close={() => setModalOpen(false)} userId={props.user.id} offerId={props.offer.id}/>
        <OfferPreview offer={props.offer} user={props.user} setOpen={setModalOpen}/>
        </>
        
    );
};

const mapStateToProps = (state) => {
    return {offer: state.offer, user: state.user};
}

export default connect(mapStateToProps, {fetchOffer, fetchUser})(OfferShow);