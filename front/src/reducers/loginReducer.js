const INITIAL_STATE = {
    isLoggedIn: null
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state, ...action.payload, isLoggedIn: true}
        case 'LOGOUT':
            return {...state, isLoggedIn: false}
        default:
            return state;
    }
};