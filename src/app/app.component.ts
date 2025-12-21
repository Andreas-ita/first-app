import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@Component({
  standalone: true,
    selector: 'app-root',
    imports: [HomeComponent, RouterModule, HeaderComponent, LoginComponent, CommonModule, RegisterComponent,
        ProfileComponent ],
    templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'homes';

    isMenuOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }
}