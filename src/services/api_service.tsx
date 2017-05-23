
import { ResultObject } from '../models/result_object';
import {consoleTestResultsHandler} from "tslint/lib/test";
import {Chore} from "../models/chore";
import {Commune} from "../models/commune";
import {Purchase} from "../models/purchase";
import {User} from "../models/user";
import {errorComparator} from "tslint/lib/test/lintError";

type CallbackFunction = (errorString: any, result?: any) => void;

export module ApiService {
    var apiUrl = 'http://localhost:3000/';

    export function fetchSend(method: string, path : string, dataPacket : any): Promise<any> {
        return fetch(apiUrl + path, {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token')
            },
            body: JSON.stringify(dataPacket)
            })
            .then((data) => {
                return data.json();
            })
            .catch((error) => {
                return error;
            })
    }

    export function fetchGet(path : any): Promise<any> {
        return fetch(apiUrl + path, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'JWT ' + localStorage.getItem('token')
            }
        })
            .then((data) => {
                return data.json();
            })
            .catch((error) => {
                return error;
            })
    }

    export function send(method: string, path : string, dataPacket : any, callBack : CallbackFunction ) {
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
        xhr.send(dataPacket);
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

    export function authenticate(username: any, password: any) {
        return fetchSend('POST', 'auth/login', {username: username, password: password}).then((result) => {
                    localStorage.setItem('token', result.contents.token);
                    return result;
                });



    /*
        fetchSend('POST', 'auth/login',
             JSON.stringify({ username: username, password: password }),
             (error: any, result: Promise<any>) => {
                 if (!error) {
                    result.then((resultObject) => {
                        console.log(resultObject);
                        let token = resultObject.contents.token;
                        if (token) {
                            localStorage.setItem('token', token);
                            callBack(null, 'Succesfully logged in.');
                        } else {
                            callBack('Could not get a token from the server');
                        }
                    })
                 } else {
                     callBack('Username or password wrong, try again.');
                 }

        });*/
    }


    //AUTH
    //____________________________________________________________________________________________//
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

    //_____________________________________________________________________________________________//

    // GETS
    //_____________________________________________________________________________________________//
    export function getChores(): Promise<Chore[]> {
        return fetchGet('chores').then((promise) => {
            return promise.contents as Promise<Chore[]>;
        });
    }

    export function getCommune(): Promise<Commune> {
        return fetchGet('communes').then((promise) => {
            return promise.contents as Promise<Commune>;
        });
    }

    export function getPurchases(): Promise<Purchase[]> {
        return fetchGet('purchases').then((promise) => {
            return promise.contents as Promise<Purchase[]>;
        })
    }

    export function getUsers(): Promise<User[]> {
       return fetchGet('users').then((promise) => {
           return promise.contents as Promise<User[]>;
       })
    }

    export function getUser(): Promise<User> {
        return fetchGet('users/profile').then((promise) => {
            return promise.contents as Promise<User>;
        })
    }

    // PUTS
    // ___________________________________________________________________________________________ //
    export function postCommune(data : any, callBack : any) {
        send('POST', 'communes', data, callBack);
    }

    export function updateUser(user: User): Promise<any> {
        return fetchSend('PUT', 'users', user);
    }

    export function postChore(chore: Chore): Promise<any> {
        if (chore.chore_id) {
            return fetchSend('PUT', 'chores/' + chore.chore_id, chore);
        } else {
            return fetchSend('POST', 'chores', chore);
        }
    }
    export function deleteChore(chore : any , callBack : any) {
        send('DELETE', 'chores/' + chore.id, null, callBack );
    }

    export function postPurchase(purchase : any, callBack : any) {
        send('POST', 'purchases', JSON.stringify(purchase), callBack);
    }


    export function deletePurchase(purchase : Purchase, callBack: any) {
        send('DELETE', 'purchases/' + purchase.purchase_id, null, callBack);
    }
}

export default ApiService;