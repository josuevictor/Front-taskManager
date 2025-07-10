import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-task-edit',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./task-edit.component.css'],
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {
  title = '';
  description = '';
  due_date = ''; // nova propriedade
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
        this.due_date = task.due_date; // ← carrega a data
      },
      error: () => alert('Erro ao carregar tarefa')
    });
  }

  update() {
    const updated = {
      title: this.title,
      description: this.description,
      due_date: this.due_date // ← envia a data
    };

    this.taskService.updateTask(this.id, updated).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => alert('Erro ao atualizar tarefa')
    });
  }
}
