import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './common/services/toast.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'goni-juan-challenge';

  private readonly messageService = inject(MessageService);
  private readonly toastService = inject(ToastService);
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  toastChangedEffect = effect(() => {
    this.messageService.add(this.toastService.toast()!);
  })

}
