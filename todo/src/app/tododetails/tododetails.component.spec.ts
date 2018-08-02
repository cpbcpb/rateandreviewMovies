import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TododetailsComponent } from './tododetails.component';

describe('TododetailsComponent', () => {
  let component: TododetailsComponent;
  let fixture: ComponentFixture<TododetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TododetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TododetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
