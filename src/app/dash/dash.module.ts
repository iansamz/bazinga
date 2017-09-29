import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashRoutingModule } from './dash.routing';

import { DashComponent } from './dash.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    DashRoutingModule
  ],
  declarations: [ 
    DashComponent 
  ]
})
export class DashModule { }
