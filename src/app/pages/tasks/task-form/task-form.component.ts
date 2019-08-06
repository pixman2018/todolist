import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { TaskService } from 'src/app/shared/services/task.service';
import { Tasks } from 'src/app/shared/interfaces/Taks.interface';
import { TaskModel } from 'src/app/shared/model/Tasks.model';
import { successTask, errorTask } from '../../../shared/model/messages.model';

// rxjs
import { Subscription, timer } from 'rxjs';
import { priority } from 'src/app/shared/model/taskFormValue';
import { ErrorsHandlerService } from 'src/app/shared/services/errors-handler.service';
import { MatDialog } from '@angular/material';
import { MessageComponent } from 'src/app/elements/message/message.component';
import { MessageHandlerService } from 'src/app/shared/services/message-handler.service';


@Component({
  selector: 'fk-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @ViewChild(NgForm, {static: false}) form: NgForm;

  task: any = new TaskModel(0, '', false, ''); //Tasks TODO: besseren Typen finden // Tasks | Observable<Tasks[]>
  subscription: Subscription;
  history: string[] = [];
  isError: boolean = false;
  showMessage: boolean = false;
  message: string = '';
  priories: string[] = priority;

  messageDialogRef;

  constructor ( 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorsHandlerService,
    private messageHandler: MessageHandlerService,
    private taskService: TaskService,
    private messageDialog: MatDialog,
  ) {
  }

  ngOnInit() {

    this.subscription = this.activatedRoute.params
      .subscribe(params=> {
        const id = (params['id'] || '');
        const tempTask = id ? this.getById(id) : this.getLastTaskId();
        tempTask.subscribe((task) => {
          this.task = task;
        }, (error: HttpErrorResponse) => {
          this.errorHandler.getResponseError(error);
        });
      }, (error: HttpErrorResponse) => {
        this.errorHandler.getResponseError(error);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveTaskItem(task) {
    if (!task.id) {
      this.taskService.getLastTaskId().subscribe((lastTask) => {
        const newTask: Tasks = new TaskModel( lastTask[0].id += 1, task.title, false, task.priority );
        this.taskService.createTask(newTask).subscribe(task => {
          console.log('Aufgabe erfolgreich gespeichert!', task);
          this.task = task;
          this.message = successTask.add;
          this.messageHandler.chanceMessage(this.message, ['/task/:page']);
          
        }, (error: HttpErrorResponse) => {
          this.isError = true;
          this.message = errorTask.add;
          this.errorHandler.getResponseError(error);
        });
      }, (error: HttpErrorResponse) => {
        // Error output?
        this.isError = true;
        this.errorHandler.getResponseError(error);
      });
      
    } else {
      console.log('edit');
      

      this.taskService.updateTask(this.task).subscribe(task=> {
        console.log('Aufgabe geändert!', task);
        this.task = task;
        this.message = successTask.edit;
        this.messageHandler.chanceMessage(this.message, ['/task']);

      }, (error: HttpErrorResponse) => {
        this.isError = true;
        this.message = errorTask.edit;
        this.errorHandler.getResponseError(error);
      });
    }
  }

  getById(taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  getLastTaskId() {
    return this.taskService.getLastTaskId();
  }

  // chanceMessage( redirect) {

  //   this.messageDialog.open(MessageComponent, {
  //     data: { 
  //       title: this.message, 
  //       redirect: redirect 
  //     }
  //   });
  // }

}
