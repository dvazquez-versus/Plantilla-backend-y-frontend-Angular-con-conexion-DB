import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription, of, startWith, switchMap, catchError } from 'rxjs';
import { DbService } from '../../services/db-service';

@Component({
  selector: 'app-server-starting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-starting.component.html',
  styleUrls: ['./server-starting.component.css']
})
export class ServerStartingComponent implements OnInit, OnDestroy {
  @Output() ready = new EventEmitter<void>();
  private pingSub?: Subscription;
  message = 'Encendiendo servidor. Esto puede llevar unos minutos...';

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.pingSub = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.dbService.get('/ping').pipe(
            catchError(error => {
              console.error('Error al enviar ping:', error);
              return of(null);
            })
          )
        )
      )
      .subscribe(response => {
        if (response === 'pong') {
          this.message = 'Se ha recibido el pong';
          this.pingSub?.unsubscribe();
          this.ready.emit();
        } else {
          console.log('Ping no responde, intentando de nuevo...');
        }
      });
  }

  ngOnDestroy(): void {
    this.pingSub?.unsubscribe();
  }
}