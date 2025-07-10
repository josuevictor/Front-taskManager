import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./task-form.component.css'],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  title = '';
  description = '';
  due_date = ''; 

  constructor(private taskService: TaskService, private router: Router) {}

  save() {
    const data = {
      title: this.title,
      description: this.description,
      due_date: this.due_date
    };

    this.taskService.createTask(data).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => alert('Erro ao salvar tarefa')
    });
  }
}
