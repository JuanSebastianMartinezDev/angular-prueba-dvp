import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  users: any[] = [];
  search_string = "" ;

  constructor(
  private http: HttpClient
  ){}

  ngOnInit(){

  }

  searchUserByName(){
  	 this.http.get('https://api.github.com/search/users?q='+this.search_string).subscribe( (data: any) => {
  		if(!data.errors){
  			this.users=data.items.slice(0,10);
  		}
  	});
  }
}
