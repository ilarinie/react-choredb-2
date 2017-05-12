var apiUrl = 'https://choredb-api.herokuapp.com/';

function post(url, data, callBack) {
    console.log(data)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(event) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callBack(null, xhr.responseText);
            } else {
                if (xhr.responseText === "") {
                  callBack("Request could not be completed", null);
                }else {
                  callBack(xhr.responseText, null);
                }
            }
        }
    }
    xhr.send(data);
}

function get(url, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhr.onreadystatechange = function(event) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callBack(null, xhr.responseText);
            } else {
                callBack(xhr.responseText, null);
            }
        }
    }
    xhr.send();
}

function authenticate(username, password, callBack) {
    post(apiUrl + 'auth/login', JSON.stringify({username: username, password: password}), callBack);
}

function register(username, password, callBack) {
    post(apiUrl + 'auth/register', JSON.stringify({username: username, password: password}), callBack);
}

function logout() {
    localStorage.removeItem("token");
    location.reload();
}

function completeChore(chore, callBack) {
    post(apiUrl + 'chores/' + chore.id + '/do', null, callBack);
}

function getCommune(callBack){
  get(apiUrl + 'communes', callBack);
}
function postCommune(data, callBack){
  post(apiUrl + 'communes', data, callBack);
}

module.exports = {
    completeChore,
    authenticate,
    register,
    getCommune,
    postCommune,
    logout
}
