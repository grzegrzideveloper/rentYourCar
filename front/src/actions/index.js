import history from "../history";
import axios from "axios";
import BookingSuccess from "../components/Booking/BookingSuccess";


//AUTH ACTIONS

export const login = ({username, password}) => async (dispatch) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/users/authenticate',
        data: {
            "username": username,
            "password": password
        },
        config: { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          }}
    }).then(
        response => {
            const auth = {...response.data, isLoggedIn: true}
            localStorage.setItem('auth', JSON.stringify(auth));
            dispatch({type: 'LOGIN', payload: auth});
            history.push('/');
        }
    ).catch((err) => {        
        alert(err.response.data.message);    
    });
    
    

};

export const logout = () => {
    localStorage.removeItem('auth');
    return {
        type: 'LOGOUT'
    };
};


//USERS ACTIONS

export const editUser = (formValues, token, id) => async (dispatch) => {
    

    axios({
        method: 'put',
        url: `http://localhost:4000/users/${id}`,
        data: formValues,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
    }).then(
        response => {
            const auth = {...response.data, token: token, isLoggedIn: true}
            localStorage.removeItem('auth');
            localStorage.setItem('auth', JSON.stringify(auth));
            dispatch({type: 'LOGIN', payload: auth});
            alert('Pomyślnie Zedytowano');
            history.push('/userpanel');
        }
    ).catch((err) => {        
        alert(err.response.data.message);    
    });
};

export const fetchUser = (id) => async (dispatch) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    
    dispatch({type: 'FETCH_USER', payload: response.data});
}






// OFFERS ACTIONS

export const createOffer = (formData) => async (dispatch) => {

    const response = await axios.post('http://localhost:4000/cars/AddCar', formData);
    dispatch({type: 'CREATE_OFFER', payload: response.data});
    history.push(`/offer/show/${response.data.id}`);

};

export const editOffer = (id, formData, redirect = true) => async (dispatch) => {
    //const response = await axios.put(`http://localhost:4000/cars/${id}`, formData);
    axios({
        method: 'put',
        url: `http://localhost:4000/cars/${id}`,
        data: formData
    }).then(
        response => {
            dispatch({type: 'EDIT_OFFER', payload: response.data});
            if(redirect) history.push(`/offer/show/${response.data.id}`);
            console.log('dupa');
        }
    ).catch((err) => {        
        alert(err.response.data.message);    
    });
}

export const fetchOffersByUser = (id) => async (dispatch) => {
    const response = await axios.get(`http://localhost:4000/cars/user/${id}`);
    dispatch({type: 'FETCH_OFFER_BY_USER', payload: response.data});
};

export const fetchOffer = (id) => async (dispatch) => {
    const response = await axios.get(`http://localhost:4000/cars/${id}`);
    dispatch({type: 'FETCH_OFFER', payload: response.data});
};

export const fetchOffers = () => async (dispatch) => {
    const response = await axios.get('http://localhost:4000/cars');
    dispatch({type: 'FETCH_OFFERS', payload: response.data});
};

export const deleteOffer = (id) => async (dispatch) => {
    const response = await axios.delete(`http://localhost:4000/cars/${id}`);
    dispatch({type: 'DELETE_OFFER', payload: response.data});
};


//BOOKING ACTIONS

export const createBooking = (CarId, UserId, StartDate, EndDate) => async (dispatch) => {
    const response = await axios.post('http://localhost:4000/bookings/AddBooking', {CarId, UserId, StartDate, EndDate});
    
    dispatch({type: 'CREATE_BOOKING', payload: response.data});
    
    history.push('/booking/success');
};

export const fetchBookingsByUser = (userId) => async (dispatch) => {
    const response = await axios.get(`http://localhost:4000/bookings/user/${userId}`);

    dispatch({type: 'FETCH_BOOKING_BY_USER', payload: response.data});
}