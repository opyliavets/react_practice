import {AUTH_SUCCES, AUTH_LOGOUT} from '../Actions/actionTypes'

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCES: 
            return {
                ...state, token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state, token: null


                
            }
        default:
            return state
    }
}