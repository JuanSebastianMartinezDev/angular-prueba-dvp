import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: any[] = [];
  searchString = "";

  formSearch = new FormGroup({
    searchString:  new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("^(?!.*doublevpartners).*$")
    ])
  });

  constructor(
    public modalService: NgbModal,
    private userService: UserService
  ){}

  ngOnInit(){
   
  }
  
  // Search users api by name
  searchUsersByName(){
  	 this.userService.getUsersByStringName(String(this.f['searchString'].value))
     .subscribe( (users: User[]) => {
    		  this.users=users;
      },error => {
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.message = "Error al momento de consultar los datos";        
      });
  }


  get f() { return this.formSearch.controls; }

  onSubmit() {
    if(this.formSearch.invalid) {
        return;
    }else{
      this.searchUsersByName();
    }
  }

  onReset() {
      this.formSearch.reset();
  }

}
