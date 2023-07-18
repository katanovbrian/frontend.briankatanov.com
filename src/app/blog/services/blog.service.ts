import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getBlogPost(postId:string) {
    return this.http.get<Blog>(`/api/blog/${postId}`)
  }
  updateBlogPost(postId:string,formData:FormData){
    return this.http.put<Blog>(`/api/blog/${postId}`,formData)
  }
  createBlogPost(formData:FormData){
    return this.http.post('/api/blog/',formData)
  }
  getBlog(){
    return this.http.get<Blog[]>('/api/blog/')
  }
  deleteBlogPost(postId:string){
    console.log(postId)
    return this.http.delete(`/api/blog/${postId}`)
  }
}
