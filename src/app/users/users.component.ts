import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserapiService } from '../userapi.service';
import { User } from '../app.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  Users: Array<User> = [];
  constructor(
    private userservice: UserapiService ,
    private router: Router
      ) { }

  ngOnInit() {
    this.userservice.getAllUsers();
    this.userservice.users.subscribe((data: Array<User>) => {
      this.Users = data;
    });
  }

  OnDeleteHandler(id:number) {
    this.userservice.deleteUser(id);
  }

  OnUpdateHandler(user: User) {
    this.userservice.activeUser = user;
    this.router.navigate(['/create', user.id])
  }

}
