import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./task-list.component.css'],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err: any) => alert('Erro ao carregar tarefas')
    });
  }

  toggleStatus(task: any) {
    const novoStatus =
      task.status === 'pendente'
        ? 'em_andamento'
        : task.status === 'em_andamento'
        ? 'concluida'
        : 'pendente';
  
    this.taskService.updateTaskStatus(task.id, novoStatus).subscribe({
      next: (updatedTask) => {
        task.status = updatedTask.status; // atualiza na lista local
      },
      error: () => alert('Erro ao alterar status')
    });
  }

  delete(id: number) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (err: any) => alert('Erro ao excluir tarefa')
      });
    }
  }
}
