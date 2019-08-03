import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Tasks } from '../interfaces/Taks.interface';

const taskUrl: string = 'http://localhost:3000/api/tasks/';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  

  constructor( private http: HttpClient) { }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(taskUrl);
  }

  getLastTaskId():any  { // Buch Observable<HttpResponse<Tasks[]>>
    const params = new HttpParams()
      .append('_sort', 'id')
      .append('_order', 'DESC')
      .append('_limit', '1');
    return this.http.get<Tasks[]>(taskUrl, {
      params: params
    });
  }

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
}
