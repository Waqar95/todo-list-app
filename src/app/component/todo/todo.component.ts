import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

interface Todo {
  task: string;
  completed: boolean;
  category: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
  ],
})
export class TodoComponent implements OnInit {
  newTask = '';
  newCategory = 'Personal';
  categories: string[] = ['Personal', 'Work', 'Groceries', 'Home'];
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  ngOnInit(): void {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  }

  addTodo() {
    if (this.newTask.trim()) {
      this.todos.push({
        task: this.newTask.trim(),
        completed: false,
        category: this.newCategory,
      });
      this.newTask = '';
      this.saveTodos();
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  setFilter(value: 'all' | 'active' | 'completed') {
    this.filter = value;
  }

  filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }
  editingIndex: number | null = null;

  startEditing(index: number) {
    this.editingIndex = index;
  }

  finishEditing() {
    this.editingIndex = null;
    this.saveTodos();
  }
  getTodosByCategory(category: string): Todo[] {
    return this.filteredTodos().filter((todo) => todo.category === category);
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
