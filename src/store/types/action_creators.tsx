import {Commune} from './commune';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_COMMUNE = 'SET_COMMUNE';
export const SET_LOADING = 'SET_LOADING';

export const actionCreators = {
    logIn: () => ({ type: LOG_IN as typeof LOG_IN }),
    logOut: () => ({ type: LOG_IN as typeof LOG_IN }),
    setCommune: (payload: Commune) => ({
        type: SET_COMMUNE as typeof SET_COMMUNE, payload,
    }),
    setLoading: (payload: boolean) => ({
        type: LOG_OUT as typeof SET_COMMUNE, payload,
    })

};