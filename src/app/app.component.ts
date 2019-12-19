import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './user-service.service'
import {CounterServiceService } from './counter-service.service'
import { User } from './users'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app3';
  name:string;
  status:string = 'active';
  statuses = ['active', 'unactive'];
  u_to_a:number;
  a_to_u:number;
  constructor(private user_service: UserServiceService, private counter_service: CounterServiceService) {
    this.get_counters();
  }

  ngOnInit() {
    this.counter_service.notifer$.subscribe(() => {
      this.get_counters();
    });
  }
  addUser() {
    this.user_service.addUser(this.name, this.status);
  }

  get_counters() {
    this.counter_service.get_unac_to_ac().subscribe(data => this.u_to_a = data);
    this.counter_service.get_ac_to_unac().subscribe(data => this.a_to_u = data);

  }
}
