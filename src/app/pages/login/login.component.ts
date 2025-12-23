import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;
  errorMessage: string | null = null;

  showPassword = false;
  showForgotModal = false;

  forgotEmail = "";
  forgotError: string | null = null;
  forgotSuccess = false;
  loadingForgotEmail = false;

  constructor(private loginService: LoginService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  openForgotModal(): void {
    this.showForgotModal = true;
    this.errorMessage = null;
    this.forgotError = null;
    this.forgotSuccess = false;
  }

  closeForgotModal(): void {
    this.showForgotModal = false;
    this.forgotEmail = "";
    this.forgotError = null;
    this.forgotSuccess = false;
  }

  // ✅ Méthode de validation d'email
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  submit(form: NgForm): void {
  this.errorMessage = null;
  this.loading = true;

  const code = form.value.code;

  this.loginService.login(code).subscribe({
    next: (response: any) => {  
      this.loading = false;

      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
     

      this.router.navigate(['/admin/dashboard']);
    },
    error: (error: any) => {
      this.loading = false;
      this.errorMessage =
        error.status === 401
          ? 'Code administrateur invalide. Veuillez réessayer.'
          : 'Erreur serveur. Veuillez réessayer plus tard.';
    }
  });
}


  sendRecoveryEmail(): void {
  if (!this.forgotEmail || !this.isValidEmail(this.forgotEmail)) {
    this.forgotError = "Veuillez entrer une adresse email valide.";
    return;
  }

  this.forgotError = null;
  this.forgotSuccess = false;
  this.loadingForgotEmail = true;

  this.loginService.sendRecoveryEmail(this.forgotEmail).subscribe({
    next: () => {
      this.loadingForgotEmail = false;
      this.forgotSuccess = true;
    },
    error: (err: any) => {
      this.loadingForgotEmail = false;
      this.forgotError =
        err.status === 404
          ? "Cet email n'est pas reconnu comme email administrateur."
          : "Erreur serveur. Veuillez réessayer plus tard.";
    }
  });
}
}
