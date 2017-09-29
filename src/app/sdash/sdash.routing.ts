import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SdashComponent } from './sdash.component';
import { JobsComponent } from './jobs/jobs.component';
import { MyjobsComponent } from './myjobs/myjobs.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplyjComponent } from './applyj/applyj.component';
import { ViewiComponent } from './viewi/viewi.component';
import { ViewjComponent } from './viewj/viewj.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'new',
                pathMatch: 'full'
            },
            {
                path: '',
                component: SdashComponent,
                children: [
                    {
                        path: 'new',
                        component: JobsComponent ,
                    },
                    {
                        path: 'myquotes',
                        component: QuotesComponent,
                    },
                    {
                        path: 'dashboard',
                        component: MyjobsComponent,
                    },
                    {
                        path: 'applyi/:id',
                        component: ApplyComponent,
                    },
                    {
                        path: 'viewi/:id',
                        component: ViewiComponent,
                    },
                    {
                        path: 'applyj/:id',
                        component: ApplyjComponent,
                    },
                    {
                        path: 'viewj/:id',
                        component: ViewjComponent,
                    },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SdashRoutingModule {
}