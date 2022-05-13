import React, { useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-date-picker";
import { connect } from "react-redux";
import {createBooking, editOffer} from "../../actions";
const BookingModal = props => {

    
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const modalStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        minWidth: '400px'
    };
    const overlayStyles = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 1000,
        backgroundColor: 'lightgray',
        opacity: 0.5
    };
    const onSubmit = () => {
        const formData = new FormData;
        formData.append("model.isActive", false);
        
        props.editOffer(props.offerId, formData, false);
        props.createBooking( props.offerId, props.userId, startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10) );
    };
    if (!props.open) return null;
    return ReactDOM.createPortal(
        <>
        
        <div style={overlayStyles}  onClick={props.close}/>
        <div className="card" tabIndex="-1" role="dialog" style={modalStyles}>
            <div className="card-header">
                Rezerwacja 
                <button type="button" onClick={props.close} className="btn-close float-end" aria-label="Close"></button>
            </div>
            <div className="card-body p-4">
                <h5 className="card-title">Zarezerwuj samochód {props.offer.brand} {props.offer.model} </h5>
                <p className="card-text">Wybierz okres wynajmu:</p>
                <div className="row">
                    <div className="col-6">
                        <p>Od</p>
                        <DatePicker value={startDate} minDate={new Date} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="col-6">
                        <p>Do</p>
                        <DatePicker value={endDate} minDate={startDate} onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
                <button onClick={onSubmit} className="btn btn-dark float-end mt-3">Zarezerwuj</button>
            </div>
        </div>
        </>,
        document.querySelector('#modal')
    );
};

export default connect(null, {createBooking, editOffer})(BookingModal);


