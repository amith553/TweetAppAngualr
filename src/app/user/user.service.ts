import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "./user.model";
import { ViewUser } from "./view-user.model";

@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private http: HttpClient){}
    apiurl = 'https://comtweetapp20220923173925.azurewebsites.net/api/v1.0/tweets/';
    userDetail = new Subject<ViewUser>();
    allUsers = new Subject<ViewUser[]>();

    getUsers(userId: string){
        this.http.get<ViewUser>(this.apiurl + 'user/search/'+userId).subscribe((user) => {
            this.userDetail.next(user);
        });
    }

    getAllUsers(){
        this.http.get<ViewUser[]>(this.apiurl + 'users/all').subscribe((users) => {
            this.allUsers.next(users);
        });
    }

}