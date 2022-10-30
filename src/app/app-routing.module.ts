import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ModalComponent } from './modal/modal.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
	{ path: '', component: UserSearchComponent },
	{ path: 'user-search', component: UserSearchComponent },
	{ path: 'user-profile/:name/:score', component: UserProfileComponent, canActivate: [UserGuard] },
	{ path: 'modal-component', component: ModalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
