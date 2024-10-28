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
          return `Max. value (${errors['max'].max}) exceeded.`;
        case 'min':
          return `Min. value (${errors['max'].min}) not provided.`;
        case 'required':
          return 'Field is required';
        case 'email':
          return 'Invalid email';
        case 'minlength':
          return `Min. length is (${errors['minlength'].requiredLength}).`;
        case 'maxlength':
          return `Max. length is (${errors['maxlength'].requiredLength}).`;
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
