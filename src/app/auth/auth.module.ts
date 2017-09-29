import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './auth.service'

import { firebaseConfig } from '../../environments/environment';
import { LoginEmailComponent } from './login-email/login-email.component';
import { SignupComponent } from './signup/signup.component';
import { SignupEmailComponent } from './signup-email/signup-email.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [LoginComponent,LoginEmailComponent,SignupComponent,SignupEmailComponent,AuthComponent],
  declarations: [LoginComponent, AuthComponent, LoginEmailComponent, SignupEmailComponent, SignupComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
 }
