import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { SpinnerModule } from 'src/app/feature-components/spinner/spinner.module';

@NgModule({ declarations: [
        RegisterComponent
    ], imports: [CommonModule,
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        SpinnerModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class RegisterModule { }
