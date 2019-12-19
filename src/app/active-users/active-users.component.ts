import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service'
import {CounterServiceService } from '../counter-service.service'
import { User } from '../users'


@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: User[];
  constructor(private user_service: UserServiceService, private counter_service: CounterServiceService) { }

  ngOnInit() {
    this.getUsers();
    this.user_service.notifer$.subscribe(() => {
      this.getUsers();});
  }

  getUsers(): void {
    function getActive(el, ind, arr){
      return (el.status == 'active');
    }
    this.user_service.getUsers().subscribe(users => this.users = users.filter(getActive));
  }

  setUnactive(user) {
    this.user_service.deleteUser(user);
    this.user_service.addUser(user.name, 'unactive');
    this.counter_service.new_ac_to_unac();
  }
}
