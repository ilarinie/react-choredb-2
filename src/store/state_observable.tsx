import * as Rx from 'rx';
import ApiService from '../services/api_service';
import {State} from "../models/state";
import {Chore} from "../models/chore";
import {Purchase} from "../models/purchase";
import {User} from "../models/user";
import {Commune} from "../models/commune";

let mainState: State = {
    commune: null,
    current_user: null,
    commune_users: null,
    chores: null,
    purchases: null,
    loggedIn: true
}

export var mainStream = new Rx.Subject();

// Try if login has expired / exists:

export let getInitialState = () => {
    let newState = mainState;
    if (!localStorage.getItem('token')) {
        newState.loggedIn = false;
        mainState = newState;
        mainStream.onNext(mainState);
    } else {
        ApiService.get('auth/validate_token', (err, res) => {
            if (!err) {
                newState.loggedIn = true;
            } else {
                newState.loggedIn = false;
            }
            mainState = newState;
            mainStream.onNext(mainState);
        });
    }
}

mainStream.onNext(mainState);

export let fetchCommune = () => {
    ApiService.getCommune().then((commune) => {
        let newState: State = mainState;
        newState.commune = commune;
        mainState = newState;
        mainStream.onNext(mainState);
    });
}

export let fetchChores = () => {
    ApiService.getChores().then((chores) => {
        let newState: State = mainState;
        newState.chores = chores;
        mainState = newState;
        mainStream.onNext(mainState);
    });
}

export let fetchPurchases = () => {
    ApiService.getPurchases().then((purchases) => {
        let newState: State = mainState;
        newState.purchases = purchases;
        mainState = newState;
        mainStream.onNext(mainState);
    });
}

export let fetchUsers = () => {
    ApiService.getUsers().then((commune_users) => {
        let newState: State = mainState;
        newState.commune_users = commune_users;
        mainState = newState;
        mainStream.onNext(mainState);
    });
}

export let fetchCurrentUser = (): Promise<User> => {
    return ApiService.getUser().then((user) => {
        let newState: State = mainState;
        newState.current_user = user;
        mainState = newState;
        mainStream.onNext(mainState);
        return user;
    });
}

export let fetchAll = () => {
    fetchCurrentUser().then((user) => {
        let newState: State = mainState;
        newState.current_user = user;
        mainState = newState;
        mainStream.onNext(mainState);
        if (user.commune_id) {
            fetchCommune();
            fetchChores();
            fetchUsers();
            fetchPurchases();
        }
    });

}

export let login = () => {
    let newState: State = mainState;
    newState.loggedIn = true;
    mainState = newState;
    mainStream.onNext(mainState);
}

export let logout = () => {
    let newState: State = mainState;
    newState.loggedIn = false;
    mainState = newState;
    mainStream.onNext(mainState);
}
