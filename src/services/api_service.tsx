
import { ResultObject } from '../models/result_object';
import {consoleTestResultsHandler} from "tslint/lib/test";
import {Chore} from "../models/chore";
import {Commune} from "../models/commune";
import {Purchase} from "../models/purchase";
import {User} from "../models/user";

type CallbackFunction = (errorString: any, result?: any) => void;

export module ApiService {
    var apiUrl = 'https://choredb-api.herokuapp.com:3000/';

    export function send(method: string, path : string, data : any, callBack : CallbackFunction ) {
        var url = apiUrl + path;
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'JWT ' + localStorage.getItem('token'));
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function (event : any) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let resultObject: ResultObject = JSON.parse(xhr.responseText) as ResultObject;
                    if (resultObject) {
                        callBack(null, resultObject);
                    } else {
                        callBack('Server response could not be parsed after POST');
                    }
                    
                } else {
                    if (xhr.responseText === '') {
                        callBack('Request could not be completed');
                    } else {
                        let error = JSON.parse(xhr.responseText);
                        callBack(error.message);
                    }
                }
            }
        };
        xhr.send(data);
    }

    export function get(path : any, callBack : CallbackFunction ) {
        var url = apiUrl + path;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', 'JWT ' + localStorage.getItem('token'));
        xhr.onreadystatechange = function (event : any) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let resultObject = JSON.parse(xhr.responseText);
                    if (resultObject) {
                        callBack(null, resultObject);
                    } else {
                        callBack('Server response could not be parsed after GET');
                    }
                    
                } else {
                    callBack(xhr.responseText);
                }
            }
        };
        xhr.send();
    }

    export function authenticate(username: any, password: any, callBack: any) {
        send('POST', 'auth/login',
             JSON.stringify({ username: username, password: password }),
             (error: any, result: any) => {
                 if (!error) {
                    let token = result.contents.token;
                    if (token) {
                        localStorage.setItem('token', token);
                        callBack(null, 'Succesfully logged in.');
                    } else {
                        callBack('Could not get a token from the server');
                    }
                 } else {
                     callBack('Username or password wrong, try again.');
                 }

        });
    }

    export function changePassword(password: string, callBack: any) {
        send('PUT', 'auth/change_password', JSON.stringify({password: password}), callBack);
    }

    export function register(username : string, password : string, callBack : any) {
        send('POST', 'auth/register', JSON.stringify({username: username, password: password}), callBack);
    }

    export function logout() {
        localStorage.removeItem('token');
        location.reload();
    }

    export function completeChore(chore : Chore, callBack : any) {
        send('POST', 'chores/' + chore.chore_id + '/do', null, callBack);
    }
    export function getChores(callBack: any) {
        get('chores', (err, res) => {
            if (!err) {
                let chores: Chore[] = res.contents as Chore[];
                callBack(null, chores);
            } else {
                callBack("Could not get chores from the server.");
            }
        });
    }

    export function getCommune(callBack : any) {
        get('communes', (error, result) => {
            if (!error) {
                let commune: Commune = result.contents as Commune;
                callBack(null, commune);
            } else {
                callBack('Could not parse Commune object from the server response');
            }
        });
    }
    export function postCommune(data : any, callBack : any) {
        send('POST', 'communes', data, callBack);
    }

    export function postChore(chore: Chore, callBack : any) {
        if (chore.chore_id) {
            send('PUT', 'chores/' + chore.chore_id, JSON.stringify(chore), callBack);
        } else {
            send('POST', 'chores', JSON.stringify(chore), callBack);
        }
    }
    export function deleteChore(chore : any , callBack : any) {
        send('DELETE', 'chores/' + chore.id, null, callBack );
    }

    export function postPurchase(purchase : any, callBack : any) {
        send('POST', 'purchases', JSON.stringify(purchase), callBack);
    }
    export function getPurchases(callBack : any) {
        get('purchases', (err : any, result : any) => {
            if (!err) {
                let purchases: Purchase[] = result.contents as Purchase[];
                callBack(null, purchases);
            } else {
                callBack('Could not parse purchases from server response.');
            }
        });
    }

    export function getUsers(callBack: any) {
        get('users', (err, res) => {
            if (!err) {
                let users: User[] = res.contents as User[];
                callBack(null, users);
            } else {
                callBack("Could not get users from the server.");
            }
        });
    }

    export function getUser(callBack: any) {
        get('users/profile', (err, res) => {
            if (!err) {
                let user: User = res.contents as User;
                callBack(null, user);
            } else {
                callBack("Could not get users from the server.");
            }
        });
    }

    export function deletePurchase(purchase : Purchase, callBack: any) {
        send('DELETE', 'purchases/' + purchase.purchase_id, null, callBack);
    }
}

export default ApiService;