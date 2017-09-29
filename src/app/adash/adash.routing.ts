import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdashComponent } from './adash.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            // {
            //     path: '',
            //     redirectTo: '',
            //     pathMatch: 'full'
            // },
            {
                path: '',
                component: AdashComponent,
                children: [
                    // {
                    //     path: 'signup',
                    //     component: SignupComponent,
                    // },
                    // {
                    //     path: 'signup-email',
                    //     component: SignupEmailComponent,
                    // },
                    // {
                    //     path: 'login',
                    //     component: LoginComponent,
                    // },
                    // {
                    //     path: 'login-email',
                    //     component: LoginEmailComponent,
                    // }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdashRoutingModule {
}