import { Injectable } from '@angular/core';
import { User } from './users'
import { USERS } from './mock_users'
import { Observable, Subject, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  users: User[];
  private notif = new Subject<void>();
  public notifer$ = this.notif.asObservable();
  constructor() {
    this.users = USERS;
  }
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(name:string, status:string) {
    this.users.push({name: name, status: status});
    this.notif.next();
  }

  deleteUser(user:User) {
    let idx = this.users.indexOf(user);
    if (idx > -1) {
      this.users.splice(idx, 1);
    }
  }
}
