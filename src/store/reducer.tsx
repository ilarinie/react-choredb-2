import {combineReducers} from 'redux';
import { RootState } from './types/rootState';
import {
    LOG_IN,
    LOG_OUT,
    SET_COMMUNE,
    SET_LOADING
} from './types/action_creators';

export type State = {
    readonly rootState: RootState,
};

export const initialState: State = {
    rootState: new RootState(),
};

export const rootReducer = combineReducers({
    mainReducer
});

function mainReducer(state: any = initialState, action = { type: '' }) {
    switch (action.type) {
        case 'LOG_IN':
            return state.update('rootState.loggedIn', (value) => true);
        default:
            return state;    
    }
  
}
