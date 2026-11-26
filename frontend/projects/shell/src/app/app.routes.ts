import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalogo' },
  {
    path: 'catalogo',
    loadChildren: () =>
      loadRemoteModule('catalogo', './routes').then((m) => m.routes),
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      loadRemoteModule('pedidos', './routes').then((m) => m.routes),
  },
  {
    path: 'resumen',
    loadChildren: () =>
      loadRemoteModule('resumen', './routes').then((m) => m.routes),
  },
];