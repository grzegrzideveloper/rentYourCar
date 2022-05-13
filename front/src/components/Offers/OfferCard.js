import React from "react";
import history from "../../history";
const OfferCard = ({id, photo, title, city, passangers, transmission, price}) => {

    const showOffer = (e) => {
        history.push(`/offer/show/${id}`);
    };


    return (
        <div className="card m-2 p-3" style={{ width: '20rem', cursor: 'pointer', borderRadius: '25px'}} onClick={showOffer} >
            <img src={photo} className="card-img-top img-fluid" style={{borderRadius: '15px'}}  alt="..."/>
            <div className="card-body text-center d-flex align-items-center justify-content-center" >
                <div>
                    <h5 className="card-title">{title}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{`Miejscowość: ${city}`}</li>
                        <li className="list-group-item">{`Liczba miejsc: ${passangers}`}</li>
                        <li className="list-group-item">{`Skrzynia: ${transmission}`}</li>
                        <li className="list-group-item" >Cena od: <b>{`${price}zł/doba`}</b></li>
                    </ul>
                </div>
                
            </div>
            
        </div>
    )
};

export default OfferCard;