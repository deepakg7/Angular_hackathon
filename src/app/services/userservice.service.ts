import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService implements OnInit {
user:User[]=[];
  constructor(private httpClient:HttpClient) { 
    
  }
  ngOnInit(): void {
    
  }

  getUser():Observable<User[]>{
    return this.httpClient.get<User[]>('http://localhost:3000/users')
  }
  
  addUser(user:any):Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/users',user)
  }

  login(cuser:any):any{
    this.getUser().subscribe(
      res=>{
        this.user=res;
      }
    )
    
    return this.user.find(
      _user=> _user.email === cuser.email && _user.password === cuser.password
    )
  }
}
