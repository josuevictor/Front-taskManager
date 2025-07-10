import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  createTask(title: string, description: string = ''): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, { title, description });
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasksAll`);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }
  
  updateTask(id: number, data: { title: string; description?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, data);
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/status`, { status });
  }
}
