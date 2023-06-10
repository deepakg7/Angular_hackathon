import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isValid:boolean;

  loginForm=this.fb.group({
    email:new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  constructor(private fb:FormBuilder, private userService:UserserviceService,private router:Router){
    this.isValid=false;
  
  }ngOnInit(): void {
      // this.isValid = this.userService.login(this.loginForm.value);
      // console.log(this.userService.login(this.loginForm.value));
      // console.log(this.isValid);
  }
  login(){
    if(this.userService.login(this.loginForm.value)) {
      // console.log('login',this.loginForm.value,this.userService.login(this.loginForm.value));
      // alert('Logged in Successfully')
      this.router.navigate(['dashboard'])
    }
    else{
      alert('user not found')
      this.loginForm.reset();
    }
  }
}
