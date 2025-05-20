import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DbService } from '../../services/db-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  errorMessageColor: string = 'red';




  // Para mostrar/ocultar la contraseña
  passwordType: string = 'password';
  isEyeChecked: boolean = false;

  // PARA EL ICONO DE CEREBRO
  isBrainChecked: boolean = false;

  constructor(
    private dbService: DbService,
    private router: Router,
    private http: HttpClient,
  ) {
     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
      this.router.navigate(['/inicio']);
          setTimeout(() => {
             window.location.reload();
          }, 50);
    }
   }

  togglePassword(): void {
    this.isEyeChecked = !this.isEyeChecked;
    this.passwordType = this.isEyeChecked ? 'text' : 'password';
  }

  sendData(form: NgForm): void {

    if (!this.correo || !this.contrasena) {
      if (!this.correo && !this.contrasena) {
        this.errorMessage = 'Falta el correo y la contraseña';
      } else if (!this.correo) {
        this.errorMessage = 'Falta el correo';
      } else {
        this.errorMessage = 'Falta la contraseña';
      }
      return;
    }
    this.errorMessage = '';

    if (!this.correo && !this.contrasena) {
      return; // no enviar si faltan campos
    }


    const payload = {
      correo: this.correo,
      contraseña: this.contrasena
    };

    this.dbService
      .post<{
        message: string;
        user: { id: number; nombre: string; correo: string; rol: number };
        token: string;
      }>('/login', payload)
      .subscribe({
        next: response => {
          localStorage.setItem('token', response.token);
          this.errorMessageColor = 'lime';
            this.errorMessage = 'Datos de acceso correctos';
              this.router.navigate(['/inicio']);
          setTimeout(() => {
             window.location.reload();
          }, 500);
        },
        error: err => {
          this.errorMessageColor = 'red';
          console.error('Error en la petición de login:', err);
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      });
  }
}
