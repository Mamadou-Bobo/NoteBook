import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  formError: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {

    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;

    if(password !== confirmPassword && (password !== "" && confirmPassword !== "")) {
      this.formError = true;
      this.errorMessage = "Les mots de passe ne correspondent pas";
    } else if(email === "" || password === "" || confirmPassword === "") {
      this.formError = true;
      this.errorMessage = "Veuillez renseigner tous les champs";
    } else {

      this.authService.createNewUser(email,password).then(
        () => {
          this.router.navigate(['/auth/sign-in']);
        },
        (error) => {
          this.formError = true;
          if(password.length < 6 || confirmPassword.length < 6) {
            this.formError = true;
            this.errorMessage = "Le mot de passe doit avoir au moins 6 caractères";
          } else if(error.code === "auth/email-already-in-use") {
            this.formError = true;
            this.errorMessage = "Cet utilisateur existe déjà";
          } else {
            this.formError = true;
            this.errorMessage = "Email ou mot de passe incorrecte";
          }
        }
      );
    }
  }

}
