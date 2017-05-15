var apiUrl = 'https://choredb-api.herokuapp.com/';

/*function setHeaders(){
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "JWT " + localStorage.getItem("token"));
    return headers;
}*/

function post(path: any, data: any, callBack: any) {
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
    xhr.onreadystatechange = function(event: any) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callBack(null, xhr.responseText);
            } else {
                if (xhr.responseText === '') {
                  callBack('Request could not be completed', null);
                }else {
                  callBack(xhr.responseText, null);
                }
            }
        }
    };
    xhr.send(data);
}

function get(path: any , callBack: any) {
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
  xhr.onreadystatechange = function(event: any ) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callBack(null, xhr.responseText);
            } else {
                callBack(xhr.responseText, null);
            }
        }
    };
  xhr.send();
}

function authenticate(username : any, password : any, callBack : any) {
    post('auth/login', JSON.stringify({username: username, password: password}), callBack);
}

function register(username : any, password : any, callBack : any) {
    post('auth/register', JSON.stringify({username: username, password: password}), callBack);
}

function logout() {
    localStorage.removeItem('token');
    location.reload();
}

function completeChore(chore : any, callBack : any) {
    post('chores/' + chore.chore_id + '/do', null, callBack);
}

function getCommune(callBack : any) {
  get('communes', callBack);
}
function postCommune(data : any, callBack : any) {
post('communes', data, callBack);
}

function postChore(chore : any, callBack : any) {
  post('chores', JSON.stringify(chore), callBack);
}

function postPurchase(purchase : any, callBack : any) {
  post('purchases', JSON.stringify(purchase), callBack);
}
function getPurchases(callBack : any) {
  get('purchases', callBack);
}

module.exports = {
    completeChore,
    authenticate,
    register,
    getCommune,
    postCommune,
    postPurchase,
    getPurchases,
    postChore,
    post,
    logout
};
