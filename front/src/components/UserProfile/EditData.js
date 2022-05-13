import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { editUser } from "../../actions";
const EditData = (props) => {



    const renderInput = ({input, type, label, initialValue, disabled}) => {
        if(!disabled){
           return(
                <div className="text-start">
                    <label htmlFor="brand" className="form-label"><b>{label}</b></label>
                    <input {...input} id={input.name} type={type} placeholder={initialValue} className="form-control mb-2"/>
                </div>
            ) ;
        }
        
        return (
            <div className="text-start">
                    <label htmlFor="brand" className="form-label"><b>{label}</b></label>
                    <input {...input} id={input.name} disabled type={type} placeholder={initialValue} className="form-control mb-2"/>
            </div>
        );
        
    };

    const onSubmit = (formValues ) => {
        if (Object.keys(formValues).length===0){
            alert('Nie wprowadzono żadnych zmian');
        }else{
           props.editUser(formValues, props.auth.token, props.auth.id); 
        }
    }

    return (
        <form className="form mt-3" onSubmit={props.handleSubmit(onSubmit)}>
                    <div className="row mt-5 m-1">
                        <div className="col-md-6">
                            <Field 
                                name="firstName"
                                component={renderInput}
                                {...{
                                    type:'text',
                                    label: 'Imię',
                                    initialValue: props.auth.firstName
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                                <Field 
                                    name="lastName"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'Nazwisko',
                                        initialValue: props.auth.lastName
                                    }}
                                />
                            </div>
                    </div>
                    <div className="row mt-4 m-1">
                        <div className="col-md-6">
                                <Field 
                                    name="username"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'Email',
                                        initialValue: props.auth.username,
                                        disabled: true
                                    }}
                                />
                        </div>
                        <div className="col-md-6">
                                <Field 
                                    name="phone"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'Nr Telefonu',
                                        initialValue: props.auth.phone
                                    }}
                                />
                        </div>
                    </div>
                    <div className="row mt-4 m-1">
                        <div className="col-md-5">
                                <Field 
                                    name="adress"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'Ulica nr domu',
                                        initialValue: props.auth.adress
                                    }}
                                />
                        </div>
                        <div className="col-md-5">
                                <Field 
                                    name="city"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'Miejscowość',
                                        initialValue: props.auth.city
                                    }}
                                />
                        </div>
                        <div className="col-md-2">
                        <Field 
                                    name="postalCode"
                                    component={renderInput}
                                    {...{
                                        type:'text',
                                        label: 'ZIP',
                                        initialValue: props.auth.postalCode
                                    }}
                                />
                        </div>
                        <div className="col-12 mt-3 d-flex justify-content-end">
                            <button type="submit" className="btn btn-danger">Edytuj</button>
                        </div>
                    </div>                   
                </form>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
}
const formWrapped = reduxForm(
    {
        form: 'editUser'
    }
)(EditData)
export default connect(mapStateToProps, {editUser})(formWrapped);

