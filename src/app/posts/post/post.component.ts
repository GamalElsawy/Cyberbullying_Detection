import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  
  constructor() { }

  ngOnInit(): void {
    this.post.createdAt = new Date(this.post.createdAt);
  }

  


}
