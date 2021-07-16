import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'promise';

  public returnPromise(){
    new Promise((resolve) => {
      setTimeout(()=>{
        console.log("function11111");
        resolve(true);
      }
      ,3000);

    })
    .then(_=> new Promise(resolve => {
      setTimeout(()=>{
        console.log("function22222");
        resolve(true);
      }
      ,2000);
      })
    )
    .then(_=> new Promise(resolve => {
      setTimeout(()=>{
        console.log("function3333333");
        resolve(true);
      }
      ,1000);
      })
    );
  }

}
