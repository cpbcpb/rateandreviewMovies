import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodocreateformComponent } from './todocreateform.component';

describe('TodocreateformComponent', () => {
  let component: TodocreateformComponent;
  let fixture: ComponentFixture<TodocreateformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodocreateformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodocreateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
