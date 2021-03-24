import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilService } from './../../shared/services/util.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public btnDisabled: boolean;

  public typeInput = 'password'
  public showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iniciaFormulario();
    this.verificaToken();
    this.observaBtnDisabled();
  }

  observaBtnDisabled() {
    this.utilService.btnDisableSubscrible.subscribe((value: boolean) => {
      this.btnDisabled = value;
    });
  }

  verificaToken() {
    if (this.utilService.token) {
      this.router.navigate(['/home']);
    }
  }

  iniciaFormulario() {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  autentica() {
    this.utilService.setBtnDisabled(true);
    this.loginService.geraToken(this.loginForm.value).subscribe((auth: any) => {
      const { token, usuario } = auth;

      localStorage.setItem('tokenpub', token);
      localStorage.setItem('userpub', JSON.stringify(usuario));

      this.router.navigate(['/home']);
      this.utilService.setBtnDisabled(false);
    });
  }

  passwordVisibleAndNotVisible() {
    if(!this.showPassword) {
      this.showPassword = true;
      this.typeInput = 'text';
    } else {
      this.showPassword = false;
      this.typeInput = 'password';
    }



  }
}
