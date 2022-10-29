import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = {
    id: '',
    login: '',
    name: '',
    avatar_url: '',
    location: '',
    company: '',
    repos_url: '',
    html_url: '',
    bio: '',
    url: '',
    followers: '',
    following: ''
  };

  repos : any[] = [];

  name = "" ;

  constructor(
	  private route: ActivatedRoute,
	  private http: HttpClient
  ) { }

  ngOnInit(): void {

	this.name = String(this.route.snapshot.paramMap.get('name'));
	console.log(name);
	this.searchUserInfo();

  }

  searchUserInfo(){
  	this.http.get('https://api.github.com/users/'+this.name).subscribe( (data: any) => {
  		if(!data.errors){
  			console.log(data);
  			this.user = data;
        this.searchReposUser();
  		}
  	});
  }  


  searchReposUser(){
     this.http.get(this.user.repos_url).subscribe( (data: any) => {
      if(!data.errors){
        console.log(data);
        this.repos = data;
      }
    });
  }  

}
