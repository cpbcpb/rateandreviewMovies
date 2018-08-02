import { Component, OnInit, OnChanges } from '@angular/core';
import {TaskyService} from '../services/tasky.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnChanges {

  theList: Array<any>;
  newTask:any={};
  constructor(private theService: TaskyService) {}

  addNewTask(){
    console.log(this.newTask);
    this.theService.createTask(this.newTask)
    .subscribe((blah)=>{
      this.getList();
      this.newTask={};
    })
  }
// deleteTask(){
// this.theService.deleteTask()
// .subscribe((deleted)=>{

// })
// }

  getList(){
    this.theService.getTaskList()
    .subscribe((newthing)=>{
      this.theList=newthing.reverse();
    })
  }
  
ngOnChanges(){
  this.getList();
}
  ngOnInit() {
    this.getList();

  }

}
