import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  newTask = '';
  todos: Todo[] = [];

  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push({ task: this.newTask.trim(), completed: false });
      this.newTask = '';
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
