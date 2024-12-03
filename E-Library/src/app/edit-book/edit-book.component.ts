import { Component } from '@angular/core';
import { ApiService } from '../ApiService/api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  task = "";
  task_id: number = 0;

  constructor(private http: ApiService, private router: ActivatedRoute, private route: Router){}

  ngOnInit(){
    this.router.params.subscribe(params => {
        console.log(params);
        this.task_id = params['id'];
      }
    );

    this.getBook();
  }

  getBook(){
    this.http.get("tasks/"+ this.task_id).subscribe((res: any)=>{
        this.task = res?.[0].task;
    }, (er=>{
      console.log(er);
    }));
    this.task = "";
  } 
  updateBook(){
    let body = new FormData();
    body.append("task", this.task) 
    this.http.put("task/"+this.task_id, body).subscribe((res: any)=>{
        this.task =  res;
    }, (er=>{
      console.log(er);
    }));
    this.task = "";
    this.route.navigate(["/book-list"])
  }
}

