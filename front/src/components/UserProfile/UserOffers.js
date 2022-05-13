import React, { useEffect } from "react";
import { connect } from "react-redux";
import {fetchOffersByUser} from "../../actions";
import _ from 'lodash' 
import { Link } from "react-router-dom";
import history from "../../history";
const UserOffers = (props) => {
    useEffect(()=> {
        props.fetchOffersByUser(props.auth.id);
    }, []);

    


    const renderOffers = () => {
        
        
        const arr = [];
        _.mapValues(props.offer, (o)=> {
            arr.push(o);
        });
        return arr.map((o)=> {
            const showOffer = (e) => {
                if (e.target.id === 'edit' || e.target.id === 'delete'){

                }else{
                    history.push(`/offer/show/${o.id}`);
                }
            };
            return (
                <div key={o.id} className="card m-1" onClick={showOffer} style={{cursor: 'pointer',}}>
                        <div className="row g-0">
                            <div className="col-md-5 d-flex align-items-center">
                             <img src={o.imageUrl} className="img-fluid " alt="..."/>
                            </div>
                            <div className="col-md-7 d-flex">
                                <div className="card-body">
                                    <h5 className="card-title">{`${o.brand} ${o.model}`}</h5>
                                    <p className="card-text">Aktywne: <b className={!o.isActive ? 'text-danger' : 'text-success'}>{o.isActive ? 'Tak' : 'Nie'}</b></p>
                                    <div className="btn-group w-75 ">
                                        <Link to={`/offer/edit/${o.id}`} id="edit" className="btn btn-outline-dark ">Edytuj</Link>
                                        <Link to={`/offer/delete/${o.id}`} id="delete" className="btn btn-outline-danger  ">Usuń</Link>
                                    </div>
                            </div>
                                </div>
                        </div>
                        
                    
                        
                </div>
                  
            );
        });
    }

    if (_.isEmpty(props.offer)) return <h2 className="kanit">Nie wystawiłeś jeszcze żadnego auta</h2>;
    return (
        <div className="">{renderOffers()}</div>
    );
};

const mapStateToProps = (state) => {
    return {auth: state.auth, offer: state.offer}
}

export default connect(mapStateToProps, {fetchOffersByUser})(UserOffers);