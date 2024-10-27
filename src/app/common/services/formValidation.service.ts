import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  private readonly toastService = inject(ToastService);

  constructor() { }

  public isNotValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    console.log('va error')
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'max':
          return `Valor máximo (${errors['max'].max}) excedido`;
        case 'min':
          return `Valor mínimo (${errors['max'].min}) no alcanzado`;
        case 'required':
          return 'El campo es requerido';
        case 'requiredTrue':
          return 'El campo debe tener un valor verdadero';
        case 'email':
          return 'Email inválido';
        case 'minlength':
          return `Largo mínimo (${errors['minlength'].requiredLength}) no alcanzado`;
        case 'maxlength':
          return `Largo máximo (${errors['maxlength'].requiredLength}) excedido. Largo actual: ${errors['maxlength'].actualLength}`;
        case 'pattern':
          return `Valor no permitido`;
      }
    }
    return null;
  }

  checkFormValidity(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      this.toastService.setToast({ severity: 'error', summary: 'Error', detail: 'Verifique los datos ingresados' })
      throw Error;
    }
  }

}
