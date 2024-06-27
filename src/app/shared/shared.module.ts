import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomScalingDirective } from './directives/attribute/customScaling.directive';
import { UserPermissionsDirective } from './directives/structural/user-permissions.directive';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';


@NgModule({
  declarations: [ NumberFormatterPipe, DateFormatterPipe],
  imports: [
    MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatCheckboxModule, CommonModule, NgIf, FormsModule, ReactiveFormsModule,
    CustomScalingDirective, UserPermissionsDirective
  ],
  exports: [
    MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatCheckboxModule, CommonModule, NgIf, FormsModule, ReactiveFormsModule,
    MatProgressBarModule, CustomScalingDirective, UserPermissionsDirective, NumberFormatterPipe, DateFormatterPipe
  ]
})
export class SharedModule { }
