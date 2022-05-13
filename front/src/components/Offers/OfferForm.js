import React, {useEffect, useState} from "react";
import noPhoto from "../../img/NoPhoto.png"
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import history from "../../history";
import axios from "axios";
import Select from 'react-select';
import { formValueSelector } from 'redux-form';
import './offers.css';
import { PencilSquare } from 'react-bootstrap-icons';
const OfferForm = (props) => {

    //State
    const defaultImageValues = { 
        imageName: '',
        imageSrc: noPhoto,
        imageFile: null
    };
    const [imageValues, setImageValues] = useState(defaultImageValues);
    const [carsBrands, setCarsBrands] = useState([]);
    const [currentBrand, setCurrentBrand] = useState({label: '', value: ''});
    const [carsModels, setCarsModels] = useState([]);

    //Api calls

    const getBrands = async () => {
        const response = await axios.get('https://private-anon-961e75781f-carsapi1.apiary-mock.com/manufacturers');

        setCarsBrands(response.data);
    };
    const getModels = async () => {
        const response = await axios.get(`https://private-anon-961e75781f-carsapi1.apiary-mock.com/cars`);
        setCarsModels(response.data);
    }

    useEffect(()=> {
        getBrands();
        getModels();
    }, []);

    useEffect(()=> {
        if(props.brand){
            setCurrentBrand(props.brand.value);
        }
        
    }, [props.brand])

    if(props.img && imageValues.imageSrc === noPhoto){
        setImageValues({...imageValues, imageSrc: props.img});
    }

    //Rendering 

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
                ...imageValues,
                imageFile: null,
                imageSrc: props.image === 'undefined' ? noPhoto : props.image
            })
        }
    };

    const renderError = ({error, touched}) => {
        if(error && touched){
            return (
                <div className="alert alert-danger mt-1" role="alert">
                    {error}        
                </div>
            ); 
        }
        
    }

    const renderInput = ({input, type, label, meta}) => {
        const className = `form-control mb-2 ${meta.error && meta.touched ? 'is-invalid' : ''}`;
        
        return(
            <React.Fragment>
                <label htmlFor={input.name} className="form-label">{label}</label>
                <input {...input} id={input.name} type={type} className={className} required/>
                <div>{renderError(meta)}</div>
            </React.Fragment>
        )
        
    };
   
    const renderSelect = ({input, label, options, meta, defaultValue}) => {
        return(
            <React.Fragment>
                <label htmlFor={input.name} className="form-label">{label}</label>
                <Select 
                    {...input}
                    onChange={value => {input.onChange(value);}}
                    onBlur={() => input.onBlur(input.value)}
                    options={options}
                    defaultValue={defaultValue}
                    required
                />
                <div>{renderError(meta)}</div>
            </React.Fragment>
        )
    };
    
    const populateBrandsSelect = () => {
        const brands = [];
        carsBrands.map(brand => {
            brands.push({label: brand.name.toUpperCase(), value: brand.name});
        });
        return brands;
    };

    const populateModelsSelect = () => {
        const modelsFiltered = carsModels.filter(model => model.make === currentBrand);
        const models = [];
        modelsFiltered.map(model => {
            models.push({label: model.model.toUpperCase(), value: model.model});
        });
        return models;
    };



    //Event Handlers

    const onSubmit=(formValues) => {
        const newValues = Object.assign({}, formValues, {
            brand: formValues.brand.value,
            model: formValues.model.value,
            transmission: formValues.transmission.value
          })
          newValues.imageName = imageValues.imageName;
          newValues.imageFile = imageValues.imageFile;

        props.onSubmit(newValues);
    }



    return (
                        
        <form className="form bg-light p-5 rounded " onSubmit={props.handleSubmit(onSubmit)}>
            
                <div className="mb-3">
                    {/* <div className="mb-3">
                        <img id="photo" src={imageValues.imageSrc} className="img-thumbnail mt-3" style={{maxWidth:'70%', display:'block', margin: 'auto'}}/>                                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageName" className="form-label">Dodaj zdjęcie</label>
                        <input onChange={showPreview} className="form-control" accept="image/*" type="file" id="imageName" required/>
                    </div>  */}
                    <div className="image-div mx-auto" style={{width: '30vw'}}>
                        <img src={imageValues.imageSrc} className="image" />
                        <div className="imagehover">
                            <div className="btn btn-dark p-3" style={{cursor:'default'}}>
                                Zmień Zdjęcie <PencilSquare/>
                                <input accept="image/*" type="file" className="form-control bg-dark text-light mt-3" onChange={showPreview}></input>
                            </div>
                        </div>
                    </div>    


                        <Field 
                            name="brand"
                            component={renderSelect}
                            {...{
                                label:'Marka',
                                options: populateBrandsSelect(),
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        
                        <Field 
                            name="model"
                            component={renderSelect}
                            {...{
                                label:'Model',
                                options: populateModelsSelect(),
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="city"
                            component={renderInput}
                            {...{
                                type:'text',
                                label: 'Miejscowość'
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="adress"
                            component={renderInput}
                            {...{
                                type:'text',
                                label: 'Adres'
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="postalCode"
                            component={renderInput}
                            {...{
                                type:'text',
                                label: 'Kod Pocztowy'
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="transmission"
                            component={renderSelect}
                            {...{
                                label:'Skrzynia Biegów',
                                options: [{label: 'Automatyczna', value: 'Automatyczna' },{label: 'Manualna', value: 'Manualna' } ],
                            }}
                        />
                        {/* <Field name="transmission" className="form-select" component="select">
                            <option value="Automatyczna">Automatyczna</option>
                            <option value="Manualna">Manualna</option>
                        </Field> */}
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="numPassangers"
                            component={renderInput}
                            {...{
                                type:'number',
                                label: 'Ilość miejsc'
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <Field 
                            name="pricePerDay"
                            component={renderInput}
                            {...{
                                type:'number',
                                label: 'Cena Za Dobę'
                            }}
                        />
                    </div>
                
            
            
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-6 text-center mt-5">
                        <button className="btn btn-dark fs-4 w-75" type="submit">Dodaj</button>        
                    </div>
                    <div className="col-md-6 text-center mt-5">
                        <button onClick={() => {history.push('/')}} className="btn btn-danger fs-4 w-75" >Anuluj</button>
                    </div>     
                </div>
            </div>
        </form>
                   
    );

};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.brand){
        errors.brand = "Wybierz markę";
    }
    if(!formValues.model){
        errors.model = "Wprowadź model";
    }
    if(!formValues.transmission){
        errors.transmission = "Wprowadź Skzrynie Biegów";
    }
    if(!formValues.city){
        errors.city = "Wprowadź miasto";
    }
    if(!formValues.adress){
        errors.adress = "Wprowadź adres";
    }
    if(!formValues.postalCode){
        errors.postalCode = "Wprowadź kod pocztowy";
    }
    if(!formValues.numPassangers){
        errors.numPassangers = "Wprowadź liczbę miejsc";
    }
    if(!formValues.pricePerDay){
        errors.pricePerDay = "Wprowadź cenę";
    }
 
    return errors;
};

const formWrapped = reduxForm(
    {
        form: 'offer',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        
        validate: validate
    }
)(OfferForm)
const selector = formValueSelector('offer');

export default connect(state => ( {brand: selector(state, 'brand')} ))(formWrapped);

