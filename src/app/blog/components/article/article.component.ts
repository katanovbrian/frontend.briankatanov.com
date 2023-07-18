import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/blog';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  inputs: ['id: article-id']
})
export class ArticleComponent implements OnInit{
  id!: string|null;
  blog!: Blog;
  blogContent!: string;

  constructor(private blogService: BlogService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.fetchBlog();
  }

  fetchBlog() {
    this.blogService.getBlogPost(`${this.id}`).subscribe(
      {
        next:(data) => {
          this.blog = data;
        },
        error: (error) => {
          console.log('Error fetching blog :', error);
        }
      }
    );
  }

  getBlogContentUrl(){
    return '/blog-file/'+this.blog.content
  }
}
