import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerModel = { username: '', email: '', password: '' };
    message: string = '';

    constructor(private http: HttpClient) { }

    onRegister() {
        this.http.post('http://localhost:3001/api/auth/register', this.registerModel)
            .subscribe({
                next: (response: any) => {
                    this.message = response.message;
                    this.registerModel = { username: '', email: '', password: '' };
                },
                error: (error) => {
                    this.message = error.error?.error || 'Registration failed';
                }
            });
    }
}
