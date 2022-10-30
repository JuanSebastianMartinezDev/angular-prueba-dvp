import { Injectable } from "@angular/core";
import { Adapter } from "../adapter";

export class Repository {
  constructor(
    public id: number,
    public name: string   
  ){}
}


@Injectable({
  providedIn: "root",
})
export class RepositoryAdapter implements Adapter<Repository> {
  adapt(item: any): Repository {
    return new Repository(item.id,item.name);
  }
}