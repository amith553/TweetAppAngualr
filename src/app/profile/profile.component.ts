import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { ViewUser } from '../user/view-user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  userDetail: ViewUser;
  userSubscription : Subscription;
 DOB: string;

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userService.getUsers(param['id']);
    });

    this.userSubscription =  this.userService.userDetail.subscribe((userDetail) =>{
      this.userDetail = userDetail;
      this.DOB = this.userDetail.dateOfBirth.toString();
      this.DOB = this.DOB.substring(0,10)
    })
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
