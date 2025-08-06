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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  category: string;
  dueDate?: string;
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class TodoComponent implements OnInit {
  // Inputs
  newTask = '';
  newCategory = 'Personal';
  newDueDate: Date | null = null;

  // Static categories
  categories: string[] = ['Personal', 'Work', 'Groceries', 'Home'];

  // Tasks
  todos: Todo[] = [];

  // Filters
  filter: 'all' | 'active' | 'completed' = 'all';

  // Currently editing task
  editingId: number | null = null;

  ngOnInit(): void {
    const saved = localStorage.getItem('todos');
    if (saved) {
      this.todos = JSON.parse(saved);
    }
  }

  addTodo() {
    if (this.newTask.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        task: this.newTask.trim(),
        completed: false,
        category: this.newCategory,
        dueDate: this.newDueDate ? this.newDueDate.toISOString() : undefined,
      };
      this.todos.push(newTodo);
      this.newTask = '';
      this.newDueDate = null;
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

  startEditing(todoId: number) {
    this.editingId = todoId;
  }

  finishEditing() {
    this.editingId = null;
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
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

  getTodosByCategory(category: string): Todo[] {
    return this.filteredTodos().filter((todo) => todo.category === category);
  }

  isToday(dateStr?: string): boolean {
    if (!dateStr) return false;
    const today = new Date();
    const date = new Date(dateStr);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  isUpcoming(dateStr?: string): boolean {
    if (!dateStr) return false;
    const today = new Date();
    const date = new Date(dateStr);
    return date > today && !this.isToday(dateStr);
  }

  getTodayTasks(): Todo[] {
    return this.filteredTodos().filter((todo) => this.isToday(todo.dueDate));
  }

  getUpcomingTasks(): Todo[] {
    return this.filteredTodos().filter((todo) => this.isUpcoming(todo.dueDate));
  }
}
