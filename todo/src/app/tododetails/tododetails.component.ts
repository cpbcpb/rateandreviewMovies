import { Component, OnInit } from '@angular/core';
import { TaskyService } from '../services/tasky.service';
import {Router, ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-tododetails',
  templateUrl: './tododetails.component.html',
  styleUrls: ['./tododetails.component.css']
})
export class TododetailsComponent implements OnInit {


  theChosenOne:any={};
  edited:any={};

  constructor(private thisVeryRoute: ActivatedRoute, 
    private theService: TaskyService,
    private router: Router,
  ) { }
editTask(){
  console.log(this.edited)
  this.thisVeryRoute.params
  .subscribe((params)=>{
    this.theService.editOneTask(params['id'], this.edited)
    .subscribe((fromService)=>{
      this.getATask();
      this.theChosenOne=this.edited;
    })
  })
}

getATask(){
  this.thisVeryRoute.params
  .subscribe((params)=>{
    this.theService.getOneTask(params['id'])
    .subscribe((fromService)=>{
      this.theChosenOne=fromService
    }) 
  })
}

deleteATask(IdtoDelete){
  console.log(IdtoDelete)
    this.theService.deleteTask(IdtoDelete)
    .subscribe((fromService)=>{
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
  this.thisVeryRoute.params
  .subscribe((params)=>{
    this.theService.getOneTask(params['id'])
.subscribe((fromService)=>{
  this.theChosenOne=fromService
})  })
  }

}
