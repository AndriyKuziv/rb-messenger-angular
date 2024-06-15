import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
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


@NgModule({
  declarations: [],
  imports: [
    MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatCheckboxModule, CommonModule, NgIf, FormsModule, ReactiveFormsModule
  ],
  exports: [
    MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatSelectModule, MatOptionModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatCheckboxModule, CommonModule, NgIf, FormsModule, ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }