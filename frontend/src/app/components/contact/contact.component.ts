import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  loading = false;

  // messages globaux
  successMsg = '';
  errorMsg = '';

  private readonly apiUrl = 'http://localhost:8000/api/client/contactus';

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Helper: get control
  c(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  // Champ invalide + touché/dirty
  isInvalid(name: string): boolean {
    const control = this.c(name);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Message d'erreur par champ (obligatoire, email, minlength...)
  fieldError(name: string): string {
    const control = this.c(name);
    if (!control || !(control.dirty || control.touched) || !control.errors) return '';

    if (control.errors['required']) return 'Ce champ est obligatoire.';
    if (control.errors['email']) return 'Email invalide.';
    if (control.errors['minlength']) {
      const req = control.errors['minlength'].requiredLength;
      return `Minimum ${req} caractères.`;
    }
    return 'Valeur invalide.';
  }

  submit() {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg = 'Veuillez corriger les champs obligatoires.';
      return;
    }

    const payload: ContactPayload = this.form.getRawValue() as ContactPayload;

    this.loading = true;

    this.http.post(this.apiUrl, payload, { observe: 'response' }).subscribe({
      next: (res) => {
        if (res.status >= 200 && res.status < 300) {
          this.successMsg = 'Message envoyé ✅';
          this.form.reset();
        } else {
          this.errorMsg = 'Erreur lors de la transmission. Veuillez réessayer.';
        }
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        // Gestion erreurs backend (Laravel souvent: errors:{field:[...]})
        const backendMessage =
          (err.error?.message as string) ||
          (typeof err.error === 'string' ? err.error : '');

        this.errorMsg = backendMessage || 'Erreur lors de la transmission. Veuillez réessayer.';
        this.loading = false;
      },
    });
  }
}
