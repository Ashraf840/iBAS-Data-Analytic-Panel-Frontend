import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/idap-admin/dashboard/dashboard.component';
// import { routes } from './routers/routes';


const routes: Routes = [

  { path: '', component: DashboardComponent },
  {
    path: "idap-admin",
    loadChildren: () =>
      import("./modules/idap-admin/idap-admin.module").then(
        (m) => m.IdapAdminModule
      ),
  },
]
@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
