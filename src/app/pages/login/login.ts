import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      username : [''],
      password : ['']
    })
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.errorMsg = 'Username and password are required.';
      return;
    }
    this.loading = true;
    const { username, password } = this.form.value;
    this.auth.login({ username: username ?? '', password: password ?? '' }).subscribe({
      next: (uname) => {
        sessionStorage.setItem('username', uname);
        this.router.navigate(['/welcome']);
      },
      error: () => {
        this.errorMsg = 'Invalid username or password.';
        this.loading = false;
      }
    });
  }

}
