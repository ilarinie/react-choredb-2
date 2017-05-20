import * as Rx from 'rx';
import ApiService from '../services/api_service';

var initialState = {
    commune: null,
    user: null,
    chores: null,
    purchases: null
};

var initialMeta = {
    loggedIn: false
};

var metaState = initialMeta;

export var choreStream = new Rx.Subject();
export var purchaseStream = new Rx.Subject();
export var communeStream = new Rx.Subject();
export var userStream = new Rx.Subject();
export var metaStream = new Rx.Subject();
var state = initialState;

choreStream.onNext(initialState);
metaStream.onNext(initialMeta);


getMeta();


// Function that is run on app start, checks to see if saved token is still valid.
function getMeta() {
    var newState = metaState;
    if (!localStorage.getItem('token')) {
        newState.loggedIn = false;
        metaState = newState;
        metaStream.onNext(metaState);
    } else {
        ApiService.get('auth/validate_token', (err, res) => {
            if (!err) {
                newState.loggedIn = true;
            } else {
                newState.loggedIn = false;
            }
            metaState = newState;
            metaStream.onNext(metaState);
        });
    }
}

export var login = () => {
    var newState = metaState;
    newState.loggedIn = true;
    metaState = newState;
    metaStream.onNext(metaState);
}

export var logout = () => {
    var newState = metaState;
    newState.loggedIn = false;
    metaState = newState;
    metaStream.onNext(metaState);
}

var setCommune = (commune) => {
    state = commune;
    communeStream.onNext(commune.commune);
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
            console.log("stat ovs");
            console.log(commune);
            setCommune(commune);
        } else {
            // set error
        }
    });
    fetchChores();
};

export var fetchChores = () => {
    ApiService.getChores((err, chores) => {
        if (!err) {
            setChores(chores);
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