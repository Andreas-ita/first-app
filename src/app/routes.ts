import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Registration Page'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'My Profile',
        canActivate: [authGuard], // Protect the profile route(only logged in users can access)
    },
    {
        path: '**',
        redirectTo: '',
    }

];
export default routeConfig;


//bootstrap the app with the routeConfig to start the app using appcomponent to allowing the app to start without a root module.
bootstrapApplication(AppComponent, {
    providers: [provideRouter(routeConfig)],
});