import { ChangeDetectionStrategy, signal, Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { addIcons } from "ionicons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor(private route: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Email invalido');
    } else {
      this.errorMessage.set('');
    }
  }

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(40)
  ]);

  getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
    if (this.password.hasError('minlength')) {
      return 'La contraseña debe minimo 6 caracteres';
    }
    if (this.password.hasError('maxlength')) {
      return 'La contraseña no puede tener mas de 40 caracteres';
    }
    return '';
  }

  resetPage() {
    this.route.navigate(["/reset-password"])
  }

  profePage() {
    this.route.navigate(["/tabs/profe"])
  }

}
