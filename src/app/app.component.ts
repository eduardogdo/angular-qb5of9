import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private elementRef: ElementRef) {
    /*setTimeout(() => {
      let data = { storeId: "324db9b9-5b34-438c-9306-1226d9c859a6" };
      window.setAppData(JSON.stringify(data));
    }, 5000);*/
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
