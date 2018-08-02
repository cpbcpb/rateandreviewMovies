import { Component, OnInit, OnChanges } from '@angular/core';
import { TaskyService } from '../services/tasky.service';

@Component({
  selector: 'app-todocreateform',
  templateUrl: './todocreateform.component.html',
  styleUrls: ['./todocreateform.component.css']
})
export class TodocreateformComponent implements OnInit, OnChanges {
  newTask: any={}
  theList: any=[]
  addNewTask(){
    console.log(this.newTask);
    this.theService.createTask(this.newTask)
    .subscribe((blah)=>{
      this.theService.getTaskList();
      this.newTask={};
    })

  }
  constructor(private theService: TaskyService) { }
  ngOnChanges(){
    this.theService
    .getTaskList()
    .subscribe((newthing)=>{this.theList=newthing.reverse()}
  )
  }
  ngOnInit() {
    this.theService
    .getTaskList()
    .subscribe((newthing)=>{this.theList=newthing.reverse()}
    )}

}
