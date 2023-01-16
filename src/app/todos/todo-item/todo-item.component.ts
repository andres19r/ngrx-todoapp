import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = {} as Todo;
  @ViewChild('inputRef') txtInputRef: ElementRef = {} as ElementRef;
  chkCompleted: FormControl = new FormControl(false);
  txtInput: FormControl = new FormControl('', Validators.required);
  editing: boolean = false;

  constructor() {}

  ngOnInit() {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
  }

  edit() {
    this.editing = true;
    setTimeout(() => {
      this.txtInputRef.nativeElement.select();
    }, 1);
  }

  finishEdit() {
    this.editing = false;
  }
}
