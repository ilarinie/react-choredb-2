import * as Rx from 'rx';
import ApiService from '../services/api_service';

var initialState = {
    commune: null,
    user: null,
    chores: null,
    purchases: null
};

export var choreStream = new Rx.Subject();
export var purchaseStream = new Rx.Subject();
export var communeStream = new Rx.Subject();
export var userStream = new Rx.Subject();
var state = initialState;

choreStream.onNext(initialState);

var setCommune = (commune) => {
    state = commune;
    communeStream.onNext(commune.commune);
    choreStream.onNext(state.chores);
    purchaseStream.onNext(state.purchases);
    userStream.onNext(state.user);
};

var setChores = (chores) => {
    var newState = state;
    newState.chores = chores;
    state = newState;
    choreStream.onNext(state.chores);
};

var setPurchases = (purchases) => {
    var newState = state;
    newState.purchases = purchases;
    state = newState;
    purchaseStream.onNext(state.purchases);
};

export var fetchCommune = () => {
    ApiService.getCommune((err, commune) => {
        if (!err) {
            setCommune(commune);
        } else {
            // set error
        }
    });
};

export var fetchChores = () => {
    ApiService.getCommune((err, commune) => {
        if (!err) {
            setChores(commune.chores);
        } else {
            // set error
        }
    });
};

export var fetchPurchases = () => {
    ApiService.getCommune((err, commune) => {
        if (!err) {
            setPurchases(commune.purchases);
        } else {
            // set error
        }
    });
};

