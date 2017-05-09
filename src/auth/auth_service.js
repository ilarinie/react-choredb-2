
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PRIVATE_ROOT = '/topics';
const PUBLIC_ROOT = '/login';

const  isAuthenticated = () => {
    console.log("asd")
    //var token = localStorage.getItem('token');
    var token = "";
    if (token) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          console.log("asd2")
          return true;
        }
        xhr.onerror = function() {
          console.log("asd3")
          return false;
        }
        xhr.setRequestHeader("Authorization", "JWT " + token);
        xhr.open("GET", "http://localhost:3000/auth/validate_token", true);
        xhr.send();

    }
  }


  const AuthRoute = ({component, ...props}) => {
    const { isPrivate } = component;
    if (isPrivate === true){
      if (isAuthenticated()) {
        return <Route { ...props } component={ component } />;
      } else {
        return <Redirect to="/login/" />;
      }
    } else {
      return <Route { ...props } component={ component } />;
    }

  };


  AuthRoute.propTypes = {
    component: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.func
    ])
  };

  export default AuthRoute;
