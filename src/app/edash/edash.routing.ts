import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EdashComponent } from './edash.component';
import { CreateComponent } from './create/create.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddijComponent } from './addij/addij.component';
import { ApplComponent } from './appl/appl.component';
import { AppljComponent } from './applj/applj.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                component: EdashComponent,
                children: [
                    {
                        path: 'create',
                        component: CreateComponent,
                    },
                    {
                        path: 'jobs',
                        component: JobsComponent,
                    },
                    {
                        path: 'quotes',
                        component: JobsComponent,
                    },
                    {
                        path: 'dashboard',
                        component : DashboardComponent,
                    },
                    {
                        path: 'addij',
                        component : AddijComponent,
                    },
                    {
                        path: 'intapps/:id',
                        component : ApplComponent,
                    },
                    {
                        path: 'jobapps/:id',
                        component : AppljComponent,
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class EdashRoutingModule {
}