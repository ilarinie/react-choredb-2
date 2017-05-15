
import { ResultObject } from '../components/models/result_object';

type CallbackFunction = (errorString: any, result?: any) => void;

export module ApiService {
    var apiUrl = 'https://choredb-api.herokuapp.com/';

    /*function setHeaders(){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "JWT " + localStorage.getItem("token"));
        return headers;
    }*/

    export function post(path : any, data : any, callBack : CallbackFunction ) {
        var url = apiUrl + path;
        /*var init = {
        method: 'POST',
        headers: setHeaders(),
        cache: 'default',
        body: data
        }

        var request = new Request(url, init);
        fetch(request).then((response) => {
        if (response.ok) {
            console.log(response);
            callBack(null, response);
        } else {
            return response.json();
            callBack(response, null);
        }
        })*/

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
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
        /*  var init = {
        method: 'GET',
        headers: setHeaders(),
        cache: 'default'
    }

    var request = new Request(url, init);
    fetch(request).then((response) => {
        console.log(response);
    })*/

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', 'JWT ' + localStorage.getItem('token'));
        xhr.onreadystatechange = function (event : any) {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    let resultObject: ResultObject = JSON.parse(xhr.responseText) as ResultObject;
                    if (resultObject) {
                        callBack(null, resultObject);
                    } else {
                        callBack('Server response could not be parsed after GET');
                    }
                    
                } else {
                    let errorObject = JSON.parse(xhr.responseText);
                    callBack(errorObject.message);
                }
            }
        };
        xhr.send();
    }

    export function authenticate(username: any, password: any, callBack: any) {
        post('auth/login',
             JSON.stringify({ username: username, password: password }),
             (error: any, result: any) => {
                 let token = result.contents.token;
                 if (token) {
                    localStorage.setItem('token', token);
                    callBack(null, 'Succesfully logged in.');
                } else {
                    callBack('Could not get a token from the server');
                }
        });
    }

    export function register(username : any, password : any, callBack : any) {
        post('auth/register', JSON.stringify({username: username, password: password}), callBack);
    }

    export function logout() {
        localStorage.removeItem('token');
        location.reload();
    }

    export function completeChore(chore : any, callBack : any) {
        post('chores/' + chore.chore_id + '/do', null, callBack);
    }

    export function getCommune(callBack : any) {
        get('communes', (error, result) => {
            if (!error) {
                let commune = JSON.parse(result.contents);
                callBack(null, commune);
            } else {
                callBack('Could not parse Commune object from the server response');
            }
        });
    }
    export function postCommune(data : any, callBack : any) {
        post('communes', data, callBack);
    }

    export function postChore(chore : any, callBack : any) {
        post('chores', JSON.stringify(chore), callBack);
    }

    export function postPurchase(purchase : any, callBack : any) {
        post('purchases', JSON.stringify(purchase), callBack);
    }
    export function getPurchases(callBack : any) {
        get('purchases', callBack);
    }
}

export default ApiService;