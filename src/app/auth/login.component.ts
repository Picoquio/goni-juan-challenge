import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@Component({
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule
  ]
})
export default class LoginComponent {

}
