import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './features/accounts/accounts.component';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailComponent } from './features/accounts/account-detail/account-detail.component';


const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/:id', component: AccountDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
