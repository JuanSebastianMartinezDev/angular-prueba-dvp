import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

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

  constructor(
  private http: HttpClient,
  ){}

  ngOnInit(){
   
  }

  searchUserByName(){
    console.log(this.f['searchString']);
  	 this.http.get('https://api.github.com/search/users?q='+this.f['searchString'].value).subscribe( (data: any) => {
  		if(!data.errors){
  			this.users=data.items.slice(0,10);
  		}
  	});
  }

  get f() { return this.formSearch.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.formSearch.invalid) {
          return;
      }

      this.searchUserByName();
  }

  onReset() {
      this.submitted = false;
      this.formSearch.reset();
  }

}
