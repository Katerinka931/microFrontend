import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../../services/login_service/login.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token_storage_service/token-storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private tokenStorage: TokenStorageService) {
    this.loginForm = this.fb.group({
      login_username: ['', Validators.required],
      login_password: ['', Validators.required]
    })
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data['token']);
          this.tokenStorage.saveUserRole(data['role']);
          this.router.navigate(["/api/advertisement/"]);
        }, error: () => {
          alert("Не удалось выполнить вход. Неверный логин и/или пароль")
        }
      })
    }
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value['password'] == this.registerForm.value['re_password']) {
        this.loginService.register(this.registerForm.value).subscribe({
          next: () => {
            alert("Регистрация прошла успешно! Перейдите на вкладку входа и войдите на сайт")
          }, error: () => {
            alert("Не удалось зарегистрироваться!")
          }
        })
      } else {
        alert('Пароли не совпадают!')
      }
    }
  }
}
