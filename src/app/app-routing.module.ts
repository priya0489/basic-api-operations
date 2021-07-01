import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path: "", component:UsersComponent},
  {path: "create", component:CreateComponent},
  {path: "create/:id", component:CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
