import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoeditformComponent } from './todoeditform.component';

describe('TodoeditformComponent', () => {
  let component: TodoeditformComponent;
  let fixture: ComponentFixture<TodoeditformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoeditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoeditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
