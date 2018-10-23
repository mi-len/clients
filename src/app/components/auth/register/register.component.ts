import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : RegisterModel;

  constructor(
    private authService : AuthService, 
    private router : Router) {
    this.model = new RegisterModel('', '', '', '', '', 18)
   }

  ngOnInit() {
  }

  register() {
    let modelExcPass = Object.assign({}, this.model)
    // delete modelExcPass['confirmPassword']

    this.authService.register(modelExcPass)
      .subscribe(
        data => {
          this.router.navigate(['/login'])
      })
  }

}

