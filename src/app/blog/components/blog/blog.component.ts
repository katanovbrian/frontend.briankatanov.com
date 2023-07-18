import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Blog } from '../../models/blog';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  newBlog = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    imageFile: new FormControl(''),
    contentFile:new FormControl(''),
  });
  updateFlag : boolean = false;
  updateId : string|null=null;

  constructor(private blogService: BlogService,
              private authService:AuthService) {}

  ngOnInit() {
    this.fetchBlogList();
  }

  public canEdit(){
    return this.authService.canEdit()
  }

  fetchBlogList() {
    this.blogService.getBlog().subscribe({
      next : (data)=>{
        this.blogs=data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.newBlog.patchValue({
      imageFile: file
    });
  }

  onContentChange(event: any) {
    const file = event.target.files[0];
    this.newBlog.patchValue({
      contentFile: file
    });
  }

  clearForm(){
    this.newBlog.reset();
  }

  parseFormData(){
    const formData = new FormData();
    formData.append('title', this.newBlog.get('title')?.value || '');
    formData.append('description', this.newBlog.get('description')?.value || '');
    formData.append('imageFile', this.newBlog.get('imageFile')?.value || '');
    formData.append('contentFile', this.newBlog.get('contentFile')?.value || '');
    return formData;
  }

  onSubmit() {
    if(!this.authService.canEdit()) {
      console.log("Not Authorized");
      return;
    }

    if(this.newBlog) {
      
      const formData = this.parseFormData()
      
      if (this.updateFlag && this.updateId) {
        this.blogService.updateBlogPost(this.updateId,formData).subscribe({
          next : (data)=>{
            this.fetchBlogList();
          },
          error: (error) => {
            console.log(error)
          }
        });
      }
      else {
        this.blogService.createBlogPost(formData).subscribe({
          next : (data)=>{
            this.fetchBlogList();
          },
          error: (error) => {
            console.log(error)
          }
        });
      }

      this.clearForm()
    }
  }

  addPost() {
    this.clearForm();
    this.updateFlag = false;
  }

  updatePost(blog : Blog) {
    this.updateId = blog._id;
    this.clearForm();
    this.patchForm(blog);
    this.updateFlag = true;
  }

  deletePost(blog : Blog) {
    if(!this.authService.canEdit()) {
      console.log("Not Authorized");
      return;
    }
    this.blogService.deleteBlogPost(blog._id).subscribe({
      next : (data)=>{
        this.fetchBlogList();
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  patchForm(blog : Blog){
    this.newBlog.patchValue(blog);
  }

}
