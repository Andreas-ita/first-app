import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page',
    },

    {
        path: 'Details/:id',
        component: DetailsComponent,
        title: 'Details Page',
        canActivate: [authGuard]
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
        path: '**',
        redirectTo: '',
    },

];
export default routeConfig;


//bootstrap the app with the routeConfig to start the app using appcomponent to allowing the app to start without a root module.
bootstrapApplication(AppComponent, {
    providers: [provideRouter(routeConfig)],
});