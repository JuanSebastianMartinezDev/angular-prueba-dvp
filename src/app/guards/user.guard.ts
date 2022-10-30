import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { User } from '../models/user.model';
import {UserService} from '../services/user.service';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, public modalService: NgbModal) {
  }

  public user: User = <User>{};

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      var score = Number(next.paramMap.get('score'));
      if (score) {
        if(score<30.0){
           this.router.navigate(['/']).then(() => { 
              const modalRef = this.modalService.open(ModalComponent);
              modalRef.componentInstance.title = "No puedes entrar al perfil de este usuario";        
              modalRef.componentInstance.message = "Este usuario cuenta con un score menor de:  30.0";        
           });  
        }
      }
      return true;
  }
}