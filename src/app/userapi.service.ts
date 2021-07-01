import { Injectable, OnInit } from '@angular/core';

import { User } from './app.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserapiService implements OnInit {
  users = new BehaviorSubject<Array<User>>([]);
  localusers: Array<User> = JSON.parse(localStorage.getItem('users')) || [];
  activeUser!: User;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() { }

  getAllUsers() {
    this.users.next(this.localusers);
    return this.users;
  }

  getSingleUser(id: number) {
    return this.localusers.find(u => u.id === id);
  }

  createUser(newuser: User) {
    return this.http.post('https://reqres.in/api/users', newuser).pipe(
      map((data: any) => data)
    )
      .subscribe((data: User) => {
        this.localusers.push(data);
        localStorage.setItem('users', JSON.stringify(this.localusers));
        this.users.next(this.localusers);
      });
  }

  deleteUser(id: number) {
    this.localusers = this.localusers.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(this.localusers));
    this.users.next(this.localusers);
  }

  updateUser(id: number, updateUser: User) {
    let userIndex = this.localusers.findIndex(u => this.activeUser === u);
    this.localusers[userIndex] = { ...this.localusers[userIndex], ...updateUser };
    localStorage.setItem('users', JSON.stringify(this.localusers));
    this.users.next(this.localusers);
  }

}
