import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from './core/services/auth.service';
import { GrowlerService, GrowlerMessageType } from './core/growler/growler.service';
import { LoggerService } from './core/services/logger.service';

@Component({
  selector: 'cm-app-component',
  templateUrl: './app.component.html'
})
export class AppComponent {

  app_title: String;
  isCollapsed: boolean;
  loginLogoutText = 'Login';

  constructor(
    private router: Router,
    //private authservice: AuthService,
    private growler: GrowlerService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.app_title = 'Customer Manager';
  }  

  loginOrOut() {
    /*const isAuthenticated = this.authservice.isAuthenticated;
    if (isAuthenticated) {
        this.authservice.logout()
            .subscribe((status: boolean) => {
                this.setLoginLogoutText();
                this.growler.growl('Logged Out', GrowlerMessageType.Info);
                this.router.navigate(['/customers']);
                return;
            },
            (err: any) => this.logger.log(err));
    }
    this.redirectToLogin();*/
}

redirectToLogin() {
    //this.router.navigate(['/login']);
}

setLoginLogoutText() {
    //this.loginLogoutText = (this.authservice.isAuthenticated) ? 'Logout' : 'Login';
}  
}
