import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { routes } from './routers/routes';
import { idapAdminModuleRoutes } from './modules/idap-admin/idap-admin-routing.module';


@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(idapAdminModuleRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
