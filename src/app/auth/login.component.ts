import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from "./auth.service";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormValidationService } from "../common/services/formValidation.service";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export default class LoginComponent {
  formValidationService = inject(FormValidationService);
  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  public form = this.fb.group({
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(4), Validators.maxLength(120)]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8), Validators.maxLength(120)]),
  });


  onLogin(): void {
    this.formValidationService.checkFormValidity(this.form);
    const { password, username } = this.form.value;
    const loginResult = this.authService.login(username!, password!);

    if (loginResult) {

      this.router.navigateByUrl('/users');
    } else {

    }
  }
}
