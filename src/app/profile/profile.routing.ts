import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProfdetComponent } from './profdet/profdet.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateprojComponent } from './createproj/createproj.component';
import { ProfileComponent } from './profile.component';
import { NotfoundComponent } from './notfound/notfound.component'


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'settings',
                pathMatch: 'full'
            },
            {
                path: '',
                component: ProfileComponent,
                children: [
                    {
                        path: 'settings',
                        component: SettingsComponent,
                    },
                    {
                        path: 'createp',
                        component: CreateprojComponent,
                    },
                    {
                        path: ':id/projects',
                        component: ProjectsComponent,
                    },
                    {
                        path: '404',
                        component: NotfoundComponent,
                    },
                    {
                        path: ':id',
                        component: ProfdetComponent,
                    },
                    {
                        path: '**',
                        redirectTo: '404',
                    }
                ]
            },
            
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {
}