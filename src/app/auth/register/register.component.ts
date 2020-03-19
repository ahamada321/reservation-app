import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    errors: any = []

    constructor(
        private authSservice: AuthService,
        private router: Router
        ) { }

    ngOnInit() {}

    register(registerForm) {
        this.authSservice.register(registerForm.value).subscribe(
            (result) => { 
                console.log("Success!")
                this.router.navigate(['/login'])
            },
            (err: HttpErrorResponse) => {
                console.error(err)
                this.errors = err.error.errors
            }
        )
    }
}
