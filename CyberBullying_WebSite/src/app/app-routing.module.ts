import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'home',component:InfoComponent,canActivate:[AuthGuardGuard]},//,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
