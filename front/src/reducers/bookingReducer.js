import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_BOOKING':
            return action.payload;
        case 'FETCH_BOOKING_BY_USER':
            return {..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
};