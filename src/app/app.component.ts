import { Component } from '@angular/core';

export interface postsElement {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-cypress';
  spyData: number = 0;
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource: postsElement[] = [];

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((posts) => (this.dataSource = posts));
  }

  fetchStubedData() {
    fetch('https://jsonplaceholder.typicode.com/stubed')
      .then((res) => res.json())
      .then((posts) => (this.dataSource = posts));
  }

  spyOn() {
    this.spyData++;
    return this.spyData;
  }
}
