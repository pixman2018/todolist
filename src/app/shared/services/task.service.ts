import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Tasks } from '../interfaces/Taks.interface';
import { map } from 'rxjs/operators';

const taskUrl: string = 'http://localhost:3000/api/tasks/';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  allTaskCount: number = 0;

  constructor( private http: HttpClient) { }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(taskUrl);
  }

  getAllNotDoneTask(): Observable<Tasks[]> {
    const params = new HttpParams()
      .append('done', 'false');
    return this.http.get<Tasks[]>(taskUrl, {
      params: params
    });
  }

  getAllDoneTask(): Observable<Tasks[]> {
    const params = new HttpParams()
      .append('done', 'true');
    return this.http.get<Tasks[]>(taskUrl, {
      params: params
    });
  }

  getLastTaskId():any  { // Buch Observable<HttpResponse<Tasks[]>>
    const params = new HttpParams()
      .append('_sort', 'id')
      .append('_order', 'DESC')
      .append('_limit', '1');
    return this.http.get<Tasks[]>(taskUrl, {
      params: params
    });


  getTaskById(id: number) {
    return this.http.get<Tasks[]>(`${taskUrl}${id}/`);
  }

  createTask(task: Tasks) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post<Tasks>(taskUrl, JSON.stringify(task), {
      headers: headers
    });
  }

  updateTask(task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(taskUrl + task.id, task);
  }

  deleteTask(task: Tasks): Observable<HttpResponse<Tasks>> {
    console.log('delete2')
    return this.http.delete<Tasks>(taskUrl + task.id, {
      observe: 'response'
    });
  }

  // getTaskCount() {
  //   // TODO: Configure in json-express that the header is sent
  //   return this.http.head<any>(taskUrl, {observe: 'response'});
  // }
  getTaskCount() {
    this.getAllTasks().subscribe( task => {
      this.allTaskCount = task.length;
    });
  }

  getTaskByLimit() {
    const params = new HttpParams()
      .append('_start', '0')
      .append('_end', '10')
      .append('_limit', '10');
    return this.http.get<Tasks[]>(taskUrl, {
      params: params,
      observe: 'response'
    });
  }
}
