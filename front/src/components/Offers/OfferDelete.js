import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteOffer } from "../../actions";
import history from "../../history";
const OfferDelete = (props) => {
    
    const deleteOffer = () => {
        props.deleteOffer(props.match.params.id);
        history.push('/userpanel');
    };

    return (
    <div>
        <div className="card border border-2 border-secondary p-2 m-3 mx-auto" style={{ width: '27rem'}}>
            <div className="card-body text-center">
                <h1>Czy na pewno chcesz usunąć tą ofertę?</h1>
                <div className="btn-group w-75">
                    <Link to="/" className={`btn btn-danger`}>NIE</Link>
                    <button onClick={deleteOffer} className={`btn btn-dark `}>TAK</button>
                </div>
                
            </div>
        </div>
    </div>
    );
};

export default connect(null, {deleteOffer})(OfferDelete);