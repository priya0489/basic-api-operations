import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { UserapiService } from '../userapi.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {

  name: any;
  job: any;

  UserId: number | undefined;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    job: new FormControl('', [Validators.required, Validators.minLength(4),],),

  });
  constructor(
    private userservice: UserapiService,
    private route: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.UserId = +param.id
      if (this.UserId)
        this.form.patchValue(this.userservice.activeUser)
    });

  }

  onSubmit() {
    if (!this.UserId) {
      this.userservice.createUser(this.form.value);
    } else {
      this.userservice.updateUser(this.UserId, this.form.value);
    }
    this.router.navigate(['/'])
  }

}
