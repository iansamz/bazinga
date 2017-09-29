import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

import { LoginComponent } from './login/login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { SignupEmailComponent } from './signup-email/signup-email.component';
import { SignupComponent } from './signup/signup.component'

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: 'signup',
                        component: SignupComponent,
                    },
                    {
                        path: 'signup-email',
                        component: SignupEmailComponent,
                    },
                    {
                        path: 'login',
                        component: LoginComponent,
                    },
                    {
                        path: 'login-email',
                        component: LoginEmailComponent,
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule {
}