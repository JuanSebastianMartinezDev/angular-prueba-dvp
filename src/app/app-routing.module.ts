import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
	{ path: '', component: UserSearchComponent },
	{ path: 'user-search', component: UserSearchComponent },
	{ path: 'user-profile/:name', component: UserProfileComponent },
	{ path: 'modal-component', component: ModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
