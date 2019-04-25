import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rail } from '../class/rail';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  railData: Array<Rail> 


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRailData().subscribe(data => {
      // this.railData = data
      console.log(data)
    })
  }

  getRailData(){
    let url = 'http://127.0.0.1:5000/data'
    return this.http.get<Array<Rail>>(url)
  }
}
