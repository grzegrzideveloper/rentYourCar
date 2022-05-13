import _ from 'lodash'
export default (state = {}, action) => {
    switch(action.type){
        case 'CREATE_OFFER':
            return action.payload;
        case 'EDIT_OFFER':
            return action.payload;
        case 'FETCH_OFFER':
            return action.payload;
        case 'FETCH_OFFER_BY_USER':
            return {..._.mapKeys(action.payload, 'id')};
        case 'FETCH_OFFERS':
            return {..._.mapKeys(action.payload, 'id')};
        case 'DELETE_OFFER':
            return _.omit(state, action.payload.id);
        default:
            return state;
    }
}