import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Nova Tarefa</h2>
    <form (ngSubmit)="save()">
      <input [(ngModel)]="title" name="title" placeholder="Título" required>
      <textarea [(ngModel)]="description" name="description" placeholder="Descrição"></textarea>
      <button type="submit">Salvar</button>
    </form>
  `
})
export class TaskFormComponent {
  title = '';
  description = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  save() {
    this.taskService.createTask(this.title, this.description).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err: any) => alert('Erro ao salvar tarefa')
    });
  }
}
