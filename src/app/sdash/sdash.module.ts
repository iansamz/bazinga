import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SdashComponent } from './sdash.component';

import { SdashRoutingModule } from './sdash.routing';
import { JobsComponent } from './jobs/jobs.component';
import { MyjobsComponent } from './myjobs/myjobs.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplyjComponent } from './applyj/applyj.component';
import { ViewiComponent } from './viewi/viewi.component';
import { ViewjComponent } from './viewj/viewj.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    SdashRoutingModule
  ],
  declarations: [
    SdashComponent, 
    JobsComponent, 
    MyjobsComponent, 
    QuotesComponent, 
    ApplyComponent, 
    ApplyjComponent, ViewiComponent, ViewjComponent
    ]
})
export class SdashModule { }
