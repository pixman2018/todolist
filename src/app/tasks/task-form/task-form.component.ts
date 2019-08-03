import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { TaskService } from 'src/app/shared/services/task.service';
import { Tasks } from 'src/app/shared/interfaces/Taks.interface';
import { TaskModel } from 'src/app/shared/model/Tasks.model';
import { successTask, errorTask } from './../../shared/model/messages.model';

// rxjs
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'fk-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @ViewChild(NgForm, {static: false}) form: NgForm;

  task: any = new TaskModel(0, '', false); //Tasks TODO: besseren Typen finden // Tasks | Observable<Tasks[]>
  subscription: Subscription;
  history: string[] = [];
  isError: boolean = false;
  showMessage: boolean = false;
  message: string = '';

  constructor ( 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
  ) {
  }

  ngOnInit() {

    this.subscription = this.activatedRoute.params
      .subscribe(params=> {
        const id = (params['id'] || '');
        const tempTask = id ? this.getById(id) : this.getLastTaskId();
        tempTask.subscribe((task) => {
          this.task = task;
        })
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveTaskItem(task) {
    if (!task.id) {
      this.taskService.getLastTaskId().subscribe((lastTask) => {
        const newTask: Tasks = new TaskModel( lastTask[0].id += 1, task.title, false );
        this.taskService.createTask(newTask).subscribe(task => {
          console.log('Aufgabe erfolgreich gespeichert!', task);
          this.task = task;
          this.message = successTask.add;
          this.chanceMessage();
          
        }, (error: HttpErrorResponse) => {
          this.isError = true;
          this.message = errorTask.add;
          console.error(`Es ist ein Fehler aufgetretten: ${error}`);
        });
      }, (error: HttpErrorResponse) => {
        // Error output?
        this.isError = true;
        console.error(`Es ist ein Fehler aufgetretten: ${error}`);
      });
      
    } else {
      console.log('edit');
      this.taskService.updateTask(this.task).subscribe(task=> {
        console.log('Aufgabe geändert!', task);
        this.task = task;
        this.message = successTask.edit;
        this.chanceMessage();
      }, (error: HttpErrorResponse) => {
        this.isError = true;
        this.message = errorTask.edit;
        console.error(`Es ist ein Fehler aufgetretten: ${error}`);
      });
    }
  }

  getById(taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  getLastTaskId() {
    return this.taskService.getLastTaskId();
  }

  chanceMessage() {
    this.showMessage = true;
        timer(1800).subscribe( i => {
        this.showMessage = false;
        this.router.navigate(['/task']);
    });
  }

}
