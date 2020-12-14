import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from "@angular/core";
import { EventsService } from "../events.service";

import { products, stores } from "../products";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  store: any;
  products: any;
  appNativeData: any;
  token: string;

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private eventSrv: EventsService,
    private http: HttpClient
  ) {
    const self = this;
    window.setAppData = function(data) {
      //{storeId: string}
      if (typeof data === "string" || data instanceof String) {
        self.appNativeData = JSON.parse(data);
      } else {
        self.appNativeData = data;
      }

      self.store = stores.find(x => x.id == self.appNativeData.storeId);

      self.products = [...self.store.products];
      self.eventSrv.changeMessage(self.store.name);
      self.cd.detectChanges();
    };
  }

  ngOnInit(): void {
    const model = {
      client_id: "B3ATvqt770yzOyW7Hq24vQ",
      client_secret: "jznBKgcgYUWNhbCGmzOlkA",
      company_code: "0190383989001"
    };
    this.getToken(model);
  }

  ngAfterViewInit() {}

  share(product: any) {
    //window.alert("The product has been shared!");
    window.interface.onComplete(
      product.id,
      product.price, //entero
      product.name,
      product.currency, //ISO Code eje. USD
      this.token
    );
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }

  getToken(model: any) {
    model.grant_type = "client_credentials";
    model.type = 2;
    let params = this.toHttpParams(model);

    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "es"
    });
    return this.http
      .post<any>(`https://payphone-pay2.azurewebsites.net/token`, params, {
        headers: headers
      })
      .subscribe((resp: any) => {
        this.token = resp.access_token;
        window.interface.onPageLoad(this.token);
      });
  }

  protected toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
