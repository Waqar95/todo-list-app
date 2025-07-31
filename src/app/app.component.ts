import { Component } from '@angular/core';
import { TodoComponent } from './component/todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  template: `<app-todo></app-todo>`,
})
export class AppComponent {}
