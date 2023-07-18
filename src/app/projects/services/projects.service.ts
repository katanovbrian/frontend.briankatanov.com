import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http:HttpClient) { }

  getProjects(){
    return this.http.get<Project[]>(`/api/projects/`)
  }
  createProject(formData:FormData){
    return this.http.post<Project>(`/api/projects/`,formData)
  }
  updateProject(projectId : string, formData:FormData){
    return this.http.put<Project>(`/api/projects/${projectId}`,formData)
  }
  deleteProject(projectId : string){
    return this.http.delete<Project>(`/api/projects/${projectId}`)
  }
}
