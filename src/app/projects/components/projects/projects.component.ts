import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Project } from '../../models/project';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProject = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    imageFile: new FormControl(''),
    tags: new FormArray([] as FormControl[])
  });

  updateFlag : boolean = false;
  updateId : string|null=null;

  constructor(private projectService: ProjectsService, 
              private authService:AuthService) {}
            
  public canEdit() {
    return this.authService.canEdit()
  }
  
  ngOnInit() {
    this.fetchProjectList();
  }

  fetchProjectList() {
    this.projectService.getProjects().subscribe(
      {
        next:(data) => {
          this.projects = data;
        },
        error: (error) => {
          console.log('Error fetching project list:', error);
        }
      }
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.newProject.patchValue({
      imageFile: file
    });
  }

  clearForm(){
    this.newProject.reset();
    const tagsFormArray = this.newProject.get('tags') as FormArray;
    tagsFormArray.clear();
  }

  onSubmit() {
    if(!this.canEdit()) {
      console.log("Not Authorized");
      return;
    }

    if(this.newProject) {
      const formData = new FormData();
      formData.append('title', this.newProject.get('title')?.value || '');
      formData.append('description', this.newProject.get('description')?.value || '');
      formData.append('link', this.newProject.get('link')?.value || '');
      formData.append('imageFile', this.newProject.get('imageFile')?.value || '');
      formData.append('tags', 
        JSON.stringify(this.newProject.get('tags')?.value.filter(x=>x!=="") || [])
      );

      const fn = (this.updateFlag && this.updateId) ? this.projectService.updateProject(this.updateId,formData) : this.projectService.createProject(formData)
      fn.subscribe({
        next : (data)=> {
          this.fetchProjectList()
        },
        error : (error)=>{
          console.log(error)
        }
      })
    }

  }

  addProject() {
    this.updateFlag = false;
    this.clearForm();
    this.addTag();
  }

  updateProject(project : Project) {
    this.updateFlag = true;
    this.updateId = project._id;
    this.clearForm();
    this.patchForm(project);
  }

  deleteProject(project : Project) {
    if(!this.canEdit()) {
      console.log("Not Authorized");
      return;
    }
    this.projectService.deleteProject(project._id).subscribe({
      next : (data)=> {
        this.fetchProjectList()
      },
      error : (error)=>{
        console.log(error)
      }
    })

  }

  patchForm(project : Project){
    this.newProject.patchValue(project);
    this.setTags(project.tags)
    this.addTag()
  }

  getTags() : FormArray{
    return this.newProject.get('tags') as FormArray;
  }

  setTags(tags : string[]) {
    const tagsFormArray = this.newProject.get('tags') as FormArray;
    for (let i in tags) {
      const tag = tags[i]
      tagsFormArray.push(new FormControl(tag));
    }
  }

  addTag() {
    const tagsFormArray = this.newProject.get('tags') as FormArray;
    tagsFormArray.push(new FormControl(''));
  }

  removeTag(index: number) {
    const tagsFormArray = this.newProject.get('tags') as FormArray;
    tagsFormArray.removeAt(index);
  }
}
