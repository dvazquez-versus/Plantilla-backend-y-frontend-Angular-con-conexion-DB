import { Routes } from '@angular/router';
import { BuscadorEmpleadoComponent } from './components/buscador-empleado/buscador-empleado.component';
import { DbTestComponent } from './components/db-test/db-test.component';

export const routes: Routes = [
  { path: 'buscador-empleado', component: BuscadorEmpleadoComponent },
  { path: 'test', component: DbTestComponent }
];
