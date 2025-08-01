import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginModel = { username: '', password: '' };
    errorMessage: string | null = null;

    constructor(private http: HttpClient, private router: Router) { }

    onSubmit() {
        if (!this.loginModel.username || !this.loginModel.password) {
            this.errorMessage = 'Username and password are required';
            return;
        }
        this.errorMessage = null;
        this.http.post('http://localhost:3001/api/auth/login', this.loginModel)
            .subscribe({
                next: (response: any) => {
                    // Handle successful login
                    console.log('Login successful:', response);
                    // Store user data (and token if using JWT)
                    localStorage.setItem('user', JSON.stringify({
                        userId: response.userId,
                        username: response.username,
                        email: response.email,
                        token: response.token // If using JWT
                    }));
                    // Redirect to dashboard or home page
                    this.router.navigate(['']);
                },
                error: (error) => {
                    // Handle errors
                    this.errorMessage = error.error?.error || 'Login failed. Please try again.';
                    console.error('Login error:', error);
                }
            });
    }
}