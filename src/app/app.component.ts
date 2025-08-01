import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HousingLocationComponent } from './housing-location/housing-location.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
    selector: 'app-root',
    imports: [HomeComponent, HousingLocationComponent, RouterModule, HeaderComponent, LoginComponent, CommonModule ],
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