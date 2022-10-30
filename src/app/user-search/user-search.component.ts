import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users: any[] = [];
  searchString = "";
  submitted = false;

  formSearch = new FormGroup({
    searchString:  new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("^(?!.*doublevpartners).*$")
    ])
  });

  constructor(private http: HttpClient, public modalService: NgbModal){}

  ngOnInit(){
   
  }

  searchUsersByName(){
  	 this.http.get('https://api.github.com/search/users?q='+this.f['searchString'].value)
     .subscribe( (data: any) => {
    		if(!data.errors){
    			this.users=data.items.slice(0,10);
    		}else{
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.message = 'Error al momento de consultar los datos';
          modalRef.result.then((result) => {
            console.log(result);  
          }).catch((error) => {
            console.log(error);
          });  
        }
    	},
      error => {
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.message = 'Error al momento de consultar los datos';
          modalRef.result.then((result) => {
            console.log(result);  
          }).catch((error) => {
            console.log(error);
          });          
      }
    );
  }


  get f() { return this.formSearch.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.formSearch.invalid) {
        return;
    }else{
      this.searchUsersByName();
    }

  }

  onReset() {
      this.submitted = false;
      this.formSearch.reset();
  }


}
