import React from "react";
import car from "../img/car.jpg";
import { Link } from "react-router-dom";
const Search = () => {
    return (
        <div className="row rounded-bottom" style={{height:'83vh', backgroundImage: `url(${car})`, backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
            <div className="col-md-5 mt-3 text-center d-none d-xl-block d-xxl-block">

            </div>
            <div className="col-xl-7 d-flex align-items-center justify-content-center">
                <div className="card border border-2 border-secondary p-3 pb-0 bg-dark text-light" style={{opacity: '0.8', borderRadius: '20px'}}>
                    <div className="card-body ">
                        <h2 className="kanit">Znajdź swoje wymarzone auto</h2>
                        <form className="form form-inline">
                            <div className="row">
                                <div className="form-group col-md-6 ">
                                    <input id="marka" type="text" className="form-control mt-3" placeholder="Marka"/>
                                </div>
                                <div className="form-group col-md-6 ">
                                    <input id="model" type="text" className="form-control mt-3" placeholder="Model"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 ">
                                    <div className="row">
                                        <div className="form-group col-md-6 ">
                                            <input id="cenaod" type="number" className="form-control mt-3" placeholder="Cena Od"/>
                                        </div>
                                        <div className="form-group col-md-6 ">
                                        <input id="cenado" type="number" className="form-control mt-3" placeholder="Cena Do"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-6 ">
                                    <input id="miejscowosc" type="text" className="form-control mt-3" placeholder="Miejscowość"/>
                                </div>
                            </div>
                            <div className="row">
                                
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <Link to="/search" className="text-light me-2">Wyszukiwanie zaawansowane</Link>
                                <button className="btn btn-light mt-2">Wyszukaj</button>
                            </div>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Search;