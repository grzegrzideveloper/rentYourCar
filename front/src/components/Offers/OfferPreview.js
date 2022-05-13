import React, { useEffect, useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import './offers.css';
const OfferPreview = ({user, offer, auth, edit, setOpen, onSubmit}) => {
   
    let btn;
    let editBtn = null;
    let owner = '';
    const [imageValues, setImageValues] = useState({});
    const [transmission, setTransmission ] = useState({});
    const [passangers, setPassangers] = useState('');
    const [city, setCity] = useState('');
    const [adress, setAdress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [pricePerDay, setPricePerDay] = useState('')
    useEffect(()=>{
        setTransmission({label: offer.transmission, value: offer.transmission});
        setPassangers(offer.numPassangers);
        setCity(offer.city);
        setAdress(offer.adress);
        setPostalCode(offer.postalCode);
        setPricePerDay(offer.pricePerDay);
        setImageValues({
            imageName: offer.imageName,
            imageSrc: offer.imageUrl,
            imageFile: null
        });
    }, [offer, auth]);

    
    if (edit) {
        btn = <button type="submit" className='btn btn-dark m-3'>Zatwierdź</button>;
        owner = 'd-none';
    }else {
        btn = <button type="button" onClick={() => setOpen(true)} className='btn btn-dark m-3'>Zarezerwuj</button>;
        owner = 'card text-center mt-3';
        if (auth.id === offer.userId){
            editBtn = <Link to={`/offer/edit/${offer.id}`} id="edit" className="btn btn-dark ">Edytuj</Link>;
        }
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setImageValues({
                    imageName: 'img',
                    imageFile: imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }else{
            setImageValues({
                ...imageValues
            })
        }
    };


    const renderImage = () => {
        if (!edit){
            return <img src={offer.imageUrl} className="img-fluid p-2" style={{borderRadius: '40px'}}/>;
        }
        return (
            <div className="image-div">
                <img src={imageValues.imageSrc} className="image" style={{borderRadius: '40px'}}/>
                <div className="imagehover">
                    <div className="btn btn-dark p-3" style={{cursor:'default'}}>
                        Zmień Zdjęcie <PencilSquare/>
                        <input accept="image/*" type="file" className="form-control bg-dark text-light mt-3" onChange={showPreview}></input>
                    </div>
                </div>
            </div>
        );
    }
    const renderTransmission = () => {
        if (edit){
            return <Select className="w-75 mx-auto" options={[{label: 'Automatyczna', value: 'Automatyczna' },{label: 'Manualna', value: 'Manualna' } ]} onChange={value => setTransmission(value)} value={transmission}/>;
        }
        return <b>{offer.transmission}</b>;
    };
    const renderPassangers = () => {
        if (edit){
            return <input type="number" placeholder="Liczba miejsc" className="w-75 mx-auto form-control text-center" value={passangers} onChange={e => setPassangers(e.target.value)}/>;
        }
        return <b>{offer.numPassangers}</b>;
    };
    const renderCity = () => {
        if (edit){
            return <input type="text" placeholder="Miejscowość" className="w-75 mx-auto form-control text-center" value={city} onChange={e => setCity(e.target.value)}/>;
        }
        return <b>{offer.city}</b>;
    };
    const renderAdress = () => {
        if (edit){
            return (
                <div className="form-group">
                    <input type="text" placeholder="Ulica, nr domu" className="w-75 mx-auto form-control text-center" value={adress} onChange={e => setAdress(e.target.value)}/>
                    <input type="text" placeholder="Kod pocztowy" className="w-75 mx-auto form-control text-center" value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                </div>
                
            );
        }
        return <b>{`${offer.adress}, ${offer.postalCode}`}</b>;
    };
    const renderPrice = () => {
        if (edit){
            return <input type="number" placeholder="Cena za dobę" className="w-75 mx-auto form-control text-center" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)}/>;
        }
        return <b>{offer.pricePerDay}zł/dobę</b>;
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        const formValues = {
            transmission: transmission.value,
            numPassangers: passangers,
            city,
            adress,
            postalCode,
            pricePerDay,
            imageName: imageValues.imageName,
            imageFile: imageValues.imageFile
        };

        onSubmit(formValues);
        
    }
    return (
        <div className="container">
            <div className="row mt-3 ">
                <div className="col-md-7">
                    <div className="card" style={{borderRadius: '40px'}}>
                    {renderImage()}
                        
                    </div>
                </div>
                <div className="col-md-5" >
                    <div className="card text-center" style={{borderRadius: '40px'}}>
                        <form onSubmit={onFormSubmit}>
                            <h3 className="mt-3 ">{`${offer.brand} ${offer.model}`}</h3>
                            <p className="mt-4 mb-0">Skrzynia Biegów:</p> {renderTransmission()} 
                            <p className='mb-0 mt-2'>Liczba miejsc: </p>{renderPassangers()} 
                            <p className='mb-0 mt-2'>Miejscowość: </p>{renderCity()} 
                            <p className='mb-0 mt-2'>Adres: </p>{renderAdress()} 
                            <p className='mb-0 mt-2'>Cena: </p>{renderPrice()}<br></br>
                            {btn}
                            {editBtn}
                        </form>
                        
                    </div>
                    <div className={owner} style={{borderRadius: '40px'}}>
                            <h5 className="mt-3">Wystawiający:</h5>
                            <p>Imię i Nazwisko: <b>{`${user.firstName} ${user.lastName}`}</b> </p>
                            <p>Telefon: <b>{user.phone}</b></p>
                            <p>Email: <b>{user.username}</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(OfferPreview);
