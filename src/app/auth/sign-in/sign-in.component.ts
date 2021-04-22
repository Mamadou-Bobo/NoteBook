import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  formError: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private autService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.autService.signInUser(email,password).then(
      () => {
        this.router.navigate(['/']);
      },
      () => {
        this.formError = true;
        if(email === "" || password === "") {
          this.errorMessage = "Veuillez renseigner tous les champs";
        } else {
          this.errorMessage = "Email ou mot de passe incorrecte";
        }
      }
    )

  }

}
