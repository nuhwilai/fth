import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}
