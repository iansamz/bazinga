import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdashComponent } from './adash.component';

import { AdashRoutingModule } from './adash.routing';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AdashRoutingModule
  ],
  declarations: [
    AdashComponent,
    ]
})
export class AdashModule { }
