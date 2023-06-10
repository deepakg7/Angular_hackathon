import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  // user:User[]=[];
  // user:User;
  // registerForm:FormGroup;
  registerForm = this.fb.group({
    email:['', [Validators.required, Validators.email, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]],
    name:['', [Validators.required]],
    address:[''],
    accountno:[''],
    mobileno:['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]{10}$")]],
    password:['', [Validators.required,Validators.minLength(6)]]
  })
 
  
constructor(private fb:FormBuilder,private userService:UserserviceService,private router:Router){

}

  ngOnInit() {
    
  }

  getEmail(){
    return this.registerForm.get('email')
  }
  getName(){
    return this.registerForm.get('name')
  }
  getAddress(){
        return this.registerForm.get('address')
      }
  getAccountNo(){
    return this.registerForm.get('accountno')
  }
  getMobileNo(){
    return this.registerForm.get('mobileno')
  }
  getPassword(){
    return this.registerForm.get('password')
  }

  getEmailError():string{
    if(this.getEmail()?.invalid && (this.getEmail()?.dirty||this.getEmail()?.touched)){
      if(this.getEmail()?.hasError('required')){
        return 'Email is Required'
      }
      else{
        if(this.getEmail()?.hasError('pattern')){
          return 'Invalid Email'
        }
      }
    }
    return ''
    
  }

  getNameError():string{
    if(this.getName()?.invalid && (this.getName()?.dirty || this.getName()?.touched)){
      if(this.getName()?.hasError('required')){
        return 'Name is required'
      }
    }
    return ''
  }

  getMobileNoError(): string{
    if(this.getMobileNo()?.invalid &&(this.getMobileNo()?.dirty || this.getMobileNo()?.touched)){
      if(this.getMobileNo()?.hasError('required')){
        return 'Mobile no is Required'
      }
    }
    if(this.getMobileNo()?.hasError('minlength')){
      return 'Mobile no should be of length 10'
    }
    if(this.getMobileNo()?.hasError('maxlength')){
      return 'Mobile no must contain only 10 digits'
    }
    if(this.getMobileNo()?.hasError('pattern')){
      return 'Mobile no invalid'
    }
    return ''
  }

  getPasswordError(): string{
    if(this.getPassword()?.invalid &&(this.getPassword()?.dirty || this.getPassword()?.touched)){
      if(this.getPassword()?.hasError('required')){
        return 'Password is Required'
      }
      if(this.getPassword()?.hasError('minlength')){
        return 'Password must be more than 5 characters'
      }
    }
    return ''
  }

  signUp(){

    if(this.registerForm.valid){
    this.userService.addUser(this.registerForm.value).subscribe(
      res=>{
        alert('Registration Completion');
        this.registerForm.reset();
        this.router.navigate(['login'])
      },
      err=>{
        console.log(err)
        alert(err.message)
      }
    )
  }
  else {
    alert('Form field required')
  }

}
}
