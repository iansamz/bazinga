import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfdetComponent } from './profdet/profdet.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileRoutingModule } from './profile.routing';
import { RouterModule } from '@angular/router';

import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateprojComponent } from './createproj/createproj.component';

import { CatsService } from './cats.service';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfileRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ProfileComponent,
    ProfdetComponent, 
    ProjectsComponent, 
    SettingsComponent, 
    CreateprojComponent, NotfoundComponent
    ],
   providers: [
     CatsService
   ] 
})
export class ProfileModule { }
