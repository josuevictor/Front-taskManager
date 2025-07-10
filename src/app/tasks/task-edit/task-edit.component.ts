import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service'; // ajuste o caminho se necessário

@Component({
  standalone: true,
  selector: 'app-task-edit',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Editar Tarefa</h2>
    <form (ngSubmit)="update()">
      <input [(ngModel)]="title" name="title" placeholder="Título" required>
      <textarea [(ngModel)]="description" name="description" placeholder="Descrição"></textarea>
      <button type="submit">Atualizar</button>
    </form>
  `
})
export class TaskEditComponent implements OnInit {
  title = '';
  description = '';
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.id).subscribe({
      next: (task) => {
        this.title = task.title;
        this.description = task.description;
      },
      error: () => alert('Erro ao carregar tarefa')
    });
  }

  update() {
    const updated = {
      title: this.title,
      description: this.description
    };

    this.taskService.updateTask(this.id, updated).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => alert('Erro ao atualizar tarefa')
    });
  }
}
