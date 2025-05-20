import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db-service';

@Component({
  selector: 'app-db-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './db-test.component.html',
  styleUrls: ['./db-test.component.css'],
})
export class DbTestComponent {
  message: string = '';

  constructor(private dbService: DbService) {}


  //#################################################
  //                     GET
  //#################################################


  sendPing(): void {
    this.dbService.get('/ping').subscribe({
      next: (response) => {
        if (response === 'pong') {
          this.message = 'Se ha recibido el pong';
        } else {
          this.message = 'Respuesta inesperada del servidor';
        }
      },
      error: (err) => {
        console.error('Error en la petición:', err);
        this.message = 'Error al comunicarse con el servidor';
      },
    });
  }




  //#################################################
  //                     post
  //#################################################


  sendData(): void {
    const data = { key: 'value' }; // Datos que deseas enviar
    this.dbService.post('/ruta', data).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (err) => {
        console.error('Error en la petición:', err);
      },
    });
  }


//#################################################
//                     put
//#################################################

sendPutData(): void {
  const data = { key: 'newValue' }; // Datos que deseas actualizar
  this.dbService.put('/ruta', data).subscribe({
    next: (response) => {
      console.log('Respuesta del servidor:', response);
    },
    error: (err) => {
      console.error('Error en la petición PUT:', err);
    },
  });
}



//#################################################
//                     delete
//#################################################

sendDeleteData(): void {
  this.dbService.delete('/ruta').subscribe({
    next: (response) => {
      console.log('Elemento eliminado:', response);
    },
    error: (err) => {
      console.error('Error en la petición DELETE:', err);
    },
  });
}




//#################################################
//                cerraSession
//#################################################
cerraSession(): void {
  localStorage.removeItem('token');
  window.location.reload();
}

}