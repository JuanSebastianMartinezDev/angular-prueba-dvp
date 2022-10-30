import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserAdapter } from '../models/user.model';
import { ModalComponent } from '../modal/modal.component';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient,
    public modalService: NgbModal,
    private adapter: UserAdapter
    ) { }

  getAllUsers(): Observable<User[]> {
    this.http.get('https://api.github.com/search/users?q=').pipe(
      // Adapt with each cycle
      map((data: any) =>  {
        console.log(data);
        return data.items.slice(0,10).map((item: any) => this.adapter.adapt(item)) 

      })
    );  

    return of([]);
  }

  getUsersByStringName(name: string): Observable<User[]> {
    return this.http.get('https://api.github.com/search/users?q='+name).pipe(
      // Adapt with each cycle
      map((data: any) =>  {
        console.log(data);
        return data.items.slice(0,10).map((item: any) => this.adapter.adapt(item)) 

      })
    );

    return of([]);
  }

  getUserDetailByName(name: string): Observable<User> {
    return this.http.get('https://api.github.com/users/'+name).pipe(
      // Adapt with each cycle
      map((data: any) =>  {
        console.log(data);
        return this.adapter.adapt(data);
      })
    );

    return of();
  }

  getReposByNameUser(url: string){
    let promise = new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(
          (res: any) => { // Success
            console.log('Success resulta repos');
            var repos=res.map((data: any) =>  {
              console.log(data);
              return this.adapter.adapt(data);
            })
            resolve(repos);
          },
          (msg: any) => { // Error
            reject(msg);
          }
        );
    });
    return promise;    

  }


}