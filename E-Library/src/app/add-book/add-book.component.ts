import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../ApiService/api.service';

@Component({
  selector: 'app-add-book',
  imports: [FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
  standalone: true
})
export class AddBookComponent {

  result: any = [];
  task = "";
  
  constructor(private http: ApiService, private router: Router){}

  addBook(){
    let body = new FormData();
    body.append("task", this.task) 
    this.http.post("task", body).subscribe((res: any)=>{
        this.result =  res;
    }, (er=>{
      console.log(er);
    }));
    this.task = "";
    this.router.navigate(["/book-list"])
  } 
}
