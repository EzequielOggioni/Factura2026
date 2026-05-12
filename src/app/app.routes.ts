import { Routes } from '@angular/router';
import { Lista } from './componentes/lista/lista';
import { Error } from './componentes/error/error';
import { NotFound } from './componentes/not-found/not-found';
import { Principal } from './componentes/principal/principal';
import { usuariologueadoGuard } from './guardian/usuariologueado-guard';
import { AdminUsuarios } from './componentes/administrar/admin-usuarios/admin-usuarios';
import { AdminFacturas } from './componentes/administrar/admin-facturas/admin-facturas';
import { Registro } from './componentes/registro/registro';

export const routes: Routes = [
    {path:'login' , component:Registro},
    {path:'lista' , component:Lista},
    {path:'error', component: Error},
    {path:'', component:Principal},
    {path:'factura', loadComponent: () => import('./componentes/factura/factura').then(t=> t.FacturaComponent) },
    {path:'factura/:variable', loadComponent: () => import('./componentes/factura/factura').then(t=> t.FacturaComponent) },
    {   path:'administrar', 
        loadComponent: () => import('./componentes/administrar/administrar').then(t=> t.Administrar) ,
        canActivate: [usuariologueadoGuard],
        loadChildren: () => [  
            {path: 'usuarios', component: AdminUsuarios},
            {path: 'facturas', component: AdminFacturas}
        ]0
    },  
    {path:'**', component:NotFound}
];
