import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {
  u_to_a: number = 0;
  a_to_u: number = 0;
  private notif = new Subject<void>();
  public notifer$ = this.notif.asObservable();

  constructor() { }

  new_ac_to_unac() {
    this.a_to_u++;
    this.notif.next();
  }

  new_unac_to_ac() {
    this.u_to_a++;
    this.notif.next();
  }

  get_ac_to_unac() : Observable<number>{
    return of(this.a_to_u);
  }

  get_unac_to_ac() : Observable<number>{
    return of(this.u_to_a);
  }
}
