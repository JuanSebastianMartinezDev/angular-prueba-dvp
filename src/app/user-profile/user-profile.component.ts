import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Repository } from '../models/repository.model';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  private users: User[] = [];
  public user: User = <User>{};
  repos : Repository[] = [];

  name = "" ;

  constructor(
	  private route: ActivatedRoute,
	  private http: HttpClient,
    public modalService: NgbModal,
    private userService: UserService    
  ) { }

  ngOnInit(): void {
  	this.name = String(this.route.snapshot.paramMap.get('name'));
  	this.searchUserInfo();
  }

  // Search detail user by name
  searchUserInfo(){
  	this.userService.getUserDetailByName(this.name).subscribe( (userWanted: User) => {
  		if(userWanted){
  			this.user = userWanted;
        this.searchReposUser();
  		}
  	},error => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = "Error al momento de consultar los datos";        
    });
  }  

  // Search repositorys by user 
  searchReposUser(){
    this.userService.getReposByNameUser(this.user.repos_url).then((data: any) => {
        this.repos = data;
    }).catch((error) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = "Error al momento de consultar los datos";          
    });
  }  



}
