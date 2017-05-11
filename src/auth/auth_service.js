
export class AuthService {

  diidaduudadd = function() {
    console.log("asd")
  }

}



function authenticate(username, password, caller){
  var xhr = new XMLHttpRequest();
  var data = JSON.stringify({ username: username, password:password});
  xhr.open("POST", "http://localhost:3000/auth/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(event){ 
    if (xhr.readyState === 4){
      if (xhr.responseText.indexOf('Succesfully authenticated') !== -1) {
        var res = JSON.parse(xhr.responseText);
        caller(null, res.message);
        localStorage.setItem("token", res.token);
      } else {
        caller(xhr.responseText);
      }
    }
  }
  xhr.onerror = function() {
    console.log("errorii")
    caller.callBack(xhr.response.error);
  }

  xhr.send(data);
}

function register(username, password, caller) {
  var xhr = new XMLHttpRequest();
  var data = JSON.stringify({ username: username, password:password});
  xhr.open("POST", "http://localhost:3000/auth/register", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(event){ 
    if (xhr.readyState === 4){
      console.log(xhr.responseText);
    }
  }
  xhr.onerror = function() {
    console.log("errorii")
    caller.callBack(xhr.response.error);
  }

  xhr.send(data);
}

function logout(){
  localStorage.removeItem("token");
  location.reload();
}

module.exports = {
  authenticate,
  register,
  logout
}
