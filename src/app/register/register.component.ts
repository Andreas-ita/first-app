import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerModel = { username: '', email: '', password: '' };  // Add username
    message: string = '';

    constructor(private http: HttpClient, private router: Router) { }  // Add Router if you want redirect

    onRegister() {
        if (!this.registerModel.username || !this.registerModel.email || !this.registerModel.password) {
            this.message = 'All fields are required';
            return;
        }

        this.http.post('http://localhost:3001/api/auth/register', this.registerModel)
            .subscribe({
                next: (response: any) => {
                    this.message = response.message || 'User registered successfully';
                    this.registerModel = { username: '', email: '', password: '' };
                    // Optional: redirect to login after 2 seconds
                    setTimeout(() => this.router.navigate(['/login']), 2000);
                },
                error: (error) => {
                    this.message = error.error?.error || 'Registration failed';
                }
            });
    }
}