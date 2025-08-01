import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';

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
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
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