import { NgModule }     from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import  { HomeComponent } from './home/home.component';

// import { AuthGuardService } from './auth-guard.service';
// import { AdminGuardService } from './admin-guard.service';
// import { ReAuthGuardService } from './reauth-guard.service';
// import { ReAdminGuardService } from './readmin-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: '/home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
            { path: 'user', loadChildren: './dash/dash.module#DashModule'}, //,canLoad:[ReAuthGuardService]},
            // { path: '**', redirectTo:'404' }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}