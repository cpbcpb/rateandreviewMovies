import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { TododetailsComponent } from './tododetails/tododetails.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoeditformComponent } from './todoeditform/todoeditform.component';
import { TodocreateformComponent } from './todocreateform/todocreateform.component';
import { TaskyService } from './services/tasky.service';
import { UserComponent } from './user/user.component';
import { AuthService } from './services/auth.service';



const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '',  component: TodolistComponent},
  {path: 'tasks/:id', component: TododetailsComponent},
  {path: 'todo/create', component: TodocreateformComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    TododetailsComponent,
    TodolistComponent,
    TodoeditformComponent,
    TodocreateformComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TaskyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
