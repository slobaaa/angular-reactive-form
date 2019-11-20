import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}

// znaci ako password i confirm password blank i password razlicito od confirm odna je mismath true u suprotnom null
// znaci ako je null onda je u redu
