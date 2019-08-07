import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { TaskService } from 'src/app/shared/services/task.service';
import { Tasks } from 'src/app/shared/interfaces/Taks.interface';
import { deleteTask, successTask } from '../../../shared/model/messages.model';
import { RoutingStateService } from 'src/app/shared/services/routing-state.service';
import { DeleteDialogComponent } from 'src/app/elements/delete-dialog/delete-dialog.component';
import { ErrorsHandlerService } from 'src/app/shared/services/errors-handler.service';
import { MessageHandlerService } from 'src/app/shared/services/message-handler.service';

// RxJs
import { timer, Observable } from 'rxjs';

// Material
import { MatDialog } from '@angular/material';

@Component({
  selector: 'fk-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  allTasksDone$: Observable<Tasks[]>;
  allTasksNotDone$: Observable<Tasks[]>;
  countTask: number = 0;
  countTaskDone: number = 0;

   // paginator
   page:number = 1;
   pageSize: number = 10; 

  // tasks: Tasks[];
  task: any = null; // TODO: Besseren Typen finden
  previousRoute: string;
  addTaskLink: string = '/addTask';
  isError: boolean = false;
  showMessage: boolean = false;
  message: string = '';

 

  constructor( 
    // private router: Router,
    private dialog: MatDialog,
    private taskService: TaskService,
    private errorHandler: ErrorsHandlerService,
    private messageHandler: MessageHandlerService,
    private routingState: RoutingStateService,
    private activeRoute: ActivatedRoute,
  ) { 
    this.routingState.loadRouting();
  }

  ngOnInit() {
    // this.getAllTask();
    this.previousRoute = this.routingState.getHistory().join(',');
    const patternEdit = /\/edit/;
    const patternAdd = /\/add/;
    if (patternEdit.test(this.previousRoute) || patternAdd.test(this.previousRoute)) {
      this.routingState.history = [];
    }
    // // TODO: Configure in json-express that the header is sent
    // this.taskService.getTaskCount().subscribe(data => {
    //   let count = data.headers.getAll('x-total-count');
    // });
    this.getCountTask();
    this.getCountTaskDone();
    this.getAllTaskDone();
    this.getAllTaskNotDone();

    this.activeRoute.params
      .subscribe(params => {
        this.page = params.page;
    });
  }

  // getAllTask() {
  //   this.taskService.getAllTasks().subscribe( (task) => {
  //     this.tasks = task;
  //     this.countTask = task.length;
  //     // this.isTaskDone(task);
  //   }, (error: HttpErrorResponse) => {
  //     this.errorHandler.getResponseError(error);
  //   });
  // }

  getAllTaskDone() {
    this.allTasksDone$ = this.taskService.getAllDoneTask();
  }

  getAllTaskNotDone() {
    this.allTasksNotDone$ = this.taskService.getAllNotDoneTask();
  }

  getCountTask() {
    this.taskService.getAllTasks().subscribe( (task) => {
      this.countTask = task.length;
      // console.log(this.countTask)
      // this.isTaskDone(task);
    });
  }

  getCountTaskDone() {
    this.taskService.getAllDoneTask().subscribe( (task) => {
      this.countTaskDone = task.length;
      // console.log(this.countTaskDone)
    });
  }

  changeTaskDone(task) {
    this.taskService.getTaskById(task.id).subscribe( (task) => {
      this.task = task;
      this.task.done = ! this.task.done;
      this.editTask();
    }, (error: HttpErrorResponse) => {
      this.errorHandler.getResponseError(error);
    });
  }

  // isTaskDone(tasks) {
  //   this.countTaskDone = 0;
  //   for (let task of tasks) {
  //     if (task.done) {
  //       this.countTaskDone++;
  //     }
  //   }
  // }

  deleteTask(task) {
    const previousUrl = this.routingState.getPreviousUrl();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '80%', maxWidth: '450px',
      data: { ...deleteTask, ...{name: task.title}}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.deleteTask(task).subscribe( _ => {
          this.message = successTask.delete;
          this.messageHandler.chanceMessage(this.message, previousUrl);
          // this.getAllTask();
          timer(1500).subscribe( i => {
            this.reload();
          });
        }, (error: HttpErrorResponse) => {
          this.errorHandler.getResponseError(error);
        });    
      }
    });    
  }

  editTask() {
    this.taskService.updateTask(this.task).subscribe(task=> {
      this.task = task;
      // this.isTaskDone(this.tasks);
      this.reload();
    }, (error: HttpErrorResponse) => {
      this.errorHandler.getResponseError(error);
    });
  }

  reload() {
    window.location.reload();
  }

}
