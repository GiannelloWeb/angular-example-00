import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
isSuported;
  constructor() { }

  ngOnInit() {

     if ("wakeLock" in navigator) {
       this.isSuported=false;
      console.log("Screen Wake Lock API supported!");
    } else {
      this.isSuported=true;
      console.log("Wake lock is not supported by this browser.");
    }
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/