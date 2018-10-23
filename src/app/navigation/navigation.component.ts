import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService : AuthService, 
    private router : Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.authService.authtoken = '';
        this.router.navigate(['/landing'])
      })
  }

}
