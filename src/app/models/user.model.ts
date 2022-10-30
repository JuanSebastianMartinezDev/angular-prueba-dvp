import { Injectable } from "@angular/core";
import { Adapter } from "../adapter";

export class User {


  constructor(
    public id: number,
    public login: string,
    public name: string,
    public avatar_url: string,
    public location: string,
    public company: string,
    public repos_url: string,
    public html_url: string,
    public bio: string,
    public url: string,
    public followers: number,
    public following: number,    
    public score: number,    
  ){}
}


@Injectable({
  providedIn: "root",
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return new User(item.id,
    item.login,
    item.name,
    item.avatar_url,
    item.location,
    item.company,
    item.repos_url,
    item.html_url,
    item.bio,
    item.url,
    item.followers,
    item.following,
    item.score);
  }
}