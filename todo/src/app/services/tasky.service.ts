import { Injectable } from '@angular/core';
import{Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class TaskyService {

  constructor(private http: Http) { }
  theNewTask:any;
  theTodoList:Array<any>;
  createTask(theNewTask){
    return this.http.post('http://localhost:3000/api/tasks/create', theNewTask)
    .map((responsefromapi)=>responsefromapi.json())
  }  
  getTaskList() {
    return this.http.get('http://localhost:3000/api/tasks')
      .map((res) => res.json());
  }
  getOneTask(taskId){
    return this.http.get('http://localhost:3000/api/tasks/'+taskId)
      .map((res) => res.json());

  }
  editOneTask(taskId, edited){
    return this.http.patch('http://localhost:3000/api/tasks/update/'+taskId, edited)
      .map((res) => res.json());

  }
  deleteTask(taskId){
return this.http.delete('http://localhost:3000/api/tasks/delete/'+taskId)
    .map((res)=>res.json())
    // .subscribe(res => {
      
    // })
  }
}
