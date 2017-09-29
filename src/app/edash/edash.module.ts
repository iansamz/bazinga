import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EdashComponent } from './edash.component';

import { EdashRoutingModule } from './edash.routing';
import { CreateComponent } from './create/create.component';
import { JobsComponent } from './jobs/jobs.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteComponent } from './quote/quote.component';
import { AddijComponent } from './addij/addij.component';
import { CatsService } from './cats.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplComponent } from './appl/appl.component';
import { DialogCloseIComponent } from './dialog-close-i/dialog-close-i.component';
import { AppljComponent } from './applj/applj.component';
import { DialogAcceptComponent } from './dialog-accept/dialog-accept.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    EdashRoutingModule,
    FormsModule
  ],
  entryComponents:[
     DialogCloseIComponent,
     DialogAcceptComponent
  ],
  declarations: [
    EdashComponent, 
    CreateComponent, 
    JobsComponent,
    QuotesComponent, 
    QuoteComponent,
    AddijComponent,
    DashboardComponent, 
    ApplComponent,
    DialogCloseIComponent,
    AppljComponent,
    DialogAcceptComponent
    ],
  providers: [
    CatsService
  ]
})
export class EdashModule { }
