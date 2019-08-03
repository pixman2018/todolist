import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TaskService } from 'src/app/shared/services/task.service';
import { Tasks } from 'src/app/shared/interfaces/Taks.interface';
import { deleteTask, successTask } from '../../shared/model/messages.model';
import { RoutingStateService } from 'src/app/shared/services/routing-state.service';

// RxJs
import { timer } from 'rxjs';


// Material
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/elements/delete-dialog/delete-dialog.component';


@Component({
  selector: 'fk-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  tasks: Tasks[];
  task: any = null; // TODO: Besseren Typen finden
  countTask: number = 0;
  countTaskDone: number = 0;
  previousRoute: string;
  addTaskLink: string = '/addTask';
  isError: boolean = false;
  showMessage: boolean = false;
  message: string = '';

  constructor( 
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private taskService: TaskService,
    private routingState: RoutingStateService,
  ) { 
    this.routingState.loadRouting();
  }

  ngOnInit() {
    this.getAllTask();
    this.previousRoute = this.routingState.getPreviousUrl();
    const patternEdit = /\/editTask/;
    const patternAdd = /\/addTask/;
      if (patternEdit.test(this.previousRoute) || patternAdd.test(this.previousRoute)) {
        this.routingState.history = [];
      }
  }

  getAllTask() {
    this.taskService.getAllTasks().subscribe( (task) => {
      this.tasks = task;
      this.countTask = task.length;
      this.isTaskDone(task);
    }, (error: HttpErrorResponse) => {
      switch (error.status) {
        case 404:
          console.error('Der Endpunkt wurde nicht gefunden! ', error);
          break;
        case 500:
          console.error('Server-Fehler beim laden der Task! ', error);
          break;
        default:
          console.error('Irgendetwas anderes wirft einen Fehler! ', error)
      }
    });
  }

  changeTaskDone(task) {
    this.taskService.getTaskById(task.id).subscribe( (task) => {
      this.task = task;
      this.task.done = ! this.task.done;
      this.editTask();
    });
  }

  isTaskDone(tasks) {
    this.countTaskDone = 0;
    for (let task of tasks) {
      if (task.done) {
        this.countTaskDone++;
      }
    }
  }

  deleteTask(task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '80%', maxWidth: '450px',
      data: { ...deleteTask, ...{name: task.title}}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('delete')
        this.taskService.deleteTask(task).subscribe( _ => {
          // this.snackbar.open('Task gelöscht', '', {duration: 2000});
          this.message = successTask.delete;
          this.chanceMessage();
          this.getAllTask();
        });    
      }
    });    
  }

  editTask() {
    this.taskService.updateTask(this.task).subscribe(task=> {
      this.task = task;
      this.isTaskDone(this.tasks);
    }, (error: HttpErrorResponse) => {
      console.error(`Es ist ein Fehler aufgetretten: ${error}`);
    });
  }

  chanceMessage() {
    this.showMessage = true;
        timer(1800).subscribe( i => {
        this.showMessage = false;
        this.router.navigate(['/task']);
    });
  }

}
