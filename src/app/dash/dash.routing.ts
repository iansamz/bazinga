import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashComponent } from './dash.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'client',
                pathMatch: 'full'
            },
            {
                path: '',
                component: DashComponent,
                children: [
                    {
                        path: 'auth', 
                        loadChildren: '../auth/auth.module#AuthModule'
                    }, //,canLoad:[ReAuthGuardService]},
                    { 
                        path: 'emp', 
                        loadChildren: '../edash/edash.module#EdashModule' 
                    }, //, canLoad:[AdminGuardService] },
                    { 
                        path: 'client', 
                        loadChildren: '../sdash/sdash.module#SdashModule' 
                    }, //, canLoad:[AdminGuardService] },
                    { 
                        path: 'admin', 
                        loadChildren: '../adash/adash.module#AdashModule' 
                    }, //, canLoad:[AdminGuardService] },
                    { 
                        path: 'profile', 
                        loadChildren: '../profile/profile.module#ProfileModule' 
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DashRoutingModule {
}