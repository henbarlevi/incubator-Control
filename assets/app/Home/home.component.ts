import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="jumbotron">
  <h1>ברוכים הבאים למערכת השליטה של החממה</h1>
  <p>כאן תוכלו לשלוט ולבקר על סטטוס של כל מיזם</p>
  <ul>
  <li>להוסיף מיזמים חדשים</li>
  <li>לערוך מיזמים קיימים</li>
  <li>לפתוח יוזרים למשתמשים</li>
  <li>לשלוח הודעות</li>
  <li>להעלות\להוריד קבצים הקשורים למיזמים</li>  
  </ul>
  </div>
  `,
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor() {

  }
  ngOnInit(){

  }



}
