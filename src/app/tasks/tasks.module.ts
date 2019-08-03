import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { MessageComponent } from './../elements/message/message.component';
import { DeleteDialogComponent } from '../elements/delete-dialog/delete-dialog.component'

// Material
// import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    TaskListComponent, 
    TaskFormComponent, 
    MessageComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Material
    // MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    TaskListComponent, 
    MessageComponent,
    DeleteDialogComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
  ]
})
export class TasksModule { }
