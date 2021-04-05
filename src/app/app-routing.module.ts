import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ClientesComponent } from './ophelia/clientes/clientes.component';
import { ProductosComponent } from './ophelia/productos/productos.component';
import { VentasComponent } from './ophelia/ventas/ventas.component';
import { VentasPorProductoComponent } from './ophelia/ventas-por-producto/ventas-por-producto.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'clientes', component: ClientesComponent, data: { permission: 'Pages.Clientes' }, canActivate: [AppRouteGuard] },
                    { path: 'productos', component: ProductosComponent, data: { permission: 'Pages.Productos' }, canActivate: [AppRouteGuard] },
                    { path: 'ventas', component: VentasComponent, data: { permission: 'Pages.Ventas' }, canActivate: [AppRouteGuard] },
                    { path: 'ventas-por-producto', component: VentasPorProductoComponent, data: { permission: 'Pages.Ventas' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent },
                    { path: 'update-password', component: ChangePasswordComponent },                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
