import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username.validators';
import { passwordValidator } from './shared/password.validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  get userName() {
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray ;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {}
  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = this.fb.group({
      // userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]], // zero index je default value
      // drugi index je valdiation rules
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]], // zero index je default value
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      }),
      alternateEmails: this.fb.array([])
    }, { validator: passwordValidator });

    this.registrationForm.get('subscribe').valueChanges
    .subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  // ovako bi bilo bez form buildera
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Slobodan'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  loadApiData() {
    // this.registrationForm.setValue({ // ne bi radilo ako bi izbrisao npr adrress ceo jer je osetljiv, zato se koristi patch value ako ne popunjavam sva polja
    //   userName: 'Slobodan',
    //   password: 'sloba',
    //   confirmPassword: 'sloba',
    //   address: {
    //     city: 'NS',
    //     state: 'Serbia',
    //     postalCode: '123456'
    //   }
    // });



    this.registrationForm.patchValue({
      userName: 'Slobodan',
      password: 'sloba',
      confirmPassword: 'sloba',
      address: {
        city: 'NS',
        state: 'Serbia',
        postalCode: '123456'
      }
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);

  }

}
