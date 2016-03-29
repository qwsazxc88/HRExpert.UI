import {Component, View} from 'angular2/core';
import { Router } from 'angular2/router';
import {Http, Headers, RequestOptions, Response} from "angular2/http";
// login.js
@Component({
	templateUrl: 'app/login/login.html',
    selector: 'login'
})

export class Login {
  // We inject the router via DI
  constructor(router: Router) {
    this.router = router;
  }

  submit() {
    // This will be called when the user clicks on the Login button
    event.preventDefault();

    // We call our API to log the user in. The username and password are entered by the user
    fetch('http://localhost:5000/connect/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        this.username, this.password
      })
    })
    .then(status)
    .then(json)
    .then((response) => {
      // Once we get the JWT in the response, we save it into localStorage
      localStorage.setItem('jwt', response.id_token);
      // and then we redirect the user to the home
      this.router.parent.navigate('/home');
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.message);
    });
  }
}