import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import bookingReducer from "./bookingReducer";
import loginReducer from "./loginReducer";
import offerReducer from "./offerReducer";
import userReducer from "./userReducer";


export default combineReducers({
    form: formReducer,
    auth: loginReducer,
    offer: offerReducer,
    user: userReducer,
    booking: bookingReducer
});