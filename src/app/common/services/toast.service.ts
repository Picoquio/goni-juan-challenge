import { Injectable, computed, signal } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  #toast = signal<Message | undefined>(undefined);
  public toast = computed(() => this.#toast());

  public setToast(incomingToast: Message) {
    this.#toast.set(incomingToast);
  }

  constructor() { }

}
