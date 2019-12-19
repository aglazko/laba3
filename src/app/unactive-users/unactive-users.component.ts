import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service'
import {CounterServiceService } from '../counter-service.service'
import { User } from '../users'


@Component({
  selector: 'app-unactive-users',
  templateUrl: './unactive-users.component.html',
  styleUrls: ['./unactive-users.component.css']
})
export class UnactiveUsersComponent implements OnInit {
  users: User[];
  constructor(private user_service: UserServiceService, private counter_service: CounterServiceService) { }

  ngOnInit() {
    this.user_service.notifer$.subscribe(() => {
      this.getUsers();});
    this.getUsers();
  }

  getUsers(): void {
    function getUnactive(el, ind, arr){
    return (el.status == 'unactive');
    }
    this.user_service.getUsers().subscribe(users => this.users = users.filter(getUnactive));
  }

  setActive(user: User) {
    this.user_service.deleteUser(user);
    this.user_service.addUser(user.name, 'active');
    this.counter_service.new_unac_to_ac();
  }
}
