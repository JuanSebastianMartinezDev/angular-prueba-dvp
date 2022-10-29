import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  login: string;
  avatar_url: string;
  avatar_url: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  
  private users: User[];
  private user: User;

  constructor(private http: HttpClient;
    this.users = [];
    this.user = new Subject();
  ) { }

  getAllUsers(): Observable<User[]> {
    let users=[];
    this.http.get('https://api.github.com/search/users?q=').subscribe( (data: any) => {
      if(!data.errors){
        this.users=data.items.slice(0,10);
      }
    });    

    return users;
  }

  getUsersByStringName(name: string): Observable<User> {
    this.http.get('https://api.github.com/search/users?q='+name).subscribe( (data: any) => {
      if(!data.errors){
        users=data.items.slice(0,10);
      }
    });

    return users;
  }

  getUserByName(name: string): Observable<User> {
    let user='';
    this.http.get('https://api.github.com/users/'+name).subscribe( (data: any) => {
      if(!data.errors){
        user=data.items.slice(0,10);
      }
    });

    return user;
  }


}