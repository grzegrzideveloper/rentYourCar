import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBookingsByUser, fetchOffers } from "../../actions";

const UserHistory = (props) => {
    const today = new Date;
    const todayString = today.toISOString().slice(0, 10);
    useEffect(()=>{
        props.fetchBookingsByUser(props.auth.id);
        props.fetchOffers();
    }, []);
    
    

    const renderBookings = () => {
        const arr = [];
        _.mapValues(props.booking, (b)=> {
            arr.push(b);
        });
        
        return arr.map( b => {
            
            return (
                <div key={b.id} className="card mt-3">
                    <div className="card-header">
                        <p>Rezerwacja auta: {`${props.offer[b.carId].brand} ${props.offer[b.carId].model}`} </p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-5">
                                <img src={props.offer[b.carId].imageUrl} className="img-fluid" style={{width: '100%'}} />
                            </div>
                            <div className="col-md-7">
                                <h5>Na okres:</h5>
                                <p className="card-text">Od: {b.startDate}</p>
                                <p className="card-text">Do: {b.endDate}</p>
                                <h6 className="mt-3">Status: {Date.parse(b.endDate) > Date.parse(todayString) ? 'Zakończone' : 'W trakcie'}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    if(_.isEmpty(props.booking)) return <h2 className="kanit">Nie dokonałeś jeszcze żadnej rezerwacji</h2>;
    return <div>{renderBookings()}</div>;
};

const mapStateToProps = (state) => {
    return {booking: state.booking, auth: state.auth, offer: state.offer};
}

export default connect(mapStateToProps, {fetchBookingsByUser, fetchOffers})(UserHistory);