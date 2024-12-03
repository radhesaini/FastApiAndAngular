import { Component, Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../ApiService/api.service';

@Component({
  selector: 'app-books-details',
  imports: [RouterOutlet,CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './books-details.component.html',
  styleUrl: './books-details.component.css'
})
export class BooksDetailsComponent {
  title = 'E-Library';
  books: any = [];
  result: any = [];
  

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.get_tasks();
  }

  get_tasks(){
    this.apiService.get("get_tasks").subscribe((res: any)=>{
      this.books = res;
    });
  }

  remove_tasks(task_id: string){
    this.apiService.delete("task/"+task_id).subscribe((res: any)=>{
      this.get_tasks()
    }, err=>{
      console.log(err)
    });
  }
}
