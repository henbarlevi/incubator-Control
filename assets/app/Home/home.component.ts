import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="jumbotron">
  <h1>ברוכים הבאים למערכת השליטה של החממה</h1>
  <h2>כאן תוכלו לשלוט ולבקר על סטטוס של כל מיזם</h2>
  <ul>
  <li>להוסיף מיזמים חדשים</li>
  <li>לערוך מיזמים קיימים</li>
  <li>ליצור הרשאות למשתמשים</li>
  <li>לשלוח הודעות</li>
  <li>להעלות\להוריד קבצים הקשורים למיזמים</li>  
  </ul>
  <b>יוזר ללא הרשאות מהאדמין אינו יכול לבצע את הפעולות הנ"ל</b>
  
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
