import { ChangeDetectorRef, Component, ElementRef } from "@angular/core";
import { EventsService } from "../events.service";

import { products, stores } from "../products";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  store: any;
  products: any;
  appNativeData: any;

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private eventSrv: EventsService
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

  ngAfterViewInit() {
    const token =
      "Vk5eWlFGY5P-Fy2HVsSajBx6wmFB92HVrzYFSs5MzE98qc-rfFJzM6WbgeOuoGNKF_h1MnQSkir60DQgWJDHzFBjoK2n0_HRZ1WR5nDVKGzzymY8tCaQMFufQOUG7YRa91lCaT9OkPLFcaihmNCD2gdSchXdPH9kgqi4yOlydbsHWuO-CMvTUWNlBo3I40rEjpkIVOJ_yqUQDleUx5NvsaS4tjRrySOljEYI6TUQf7DmMiZU5OIWrwK8uQ4jqwTjIFfyS3zQfasJv9htwTvGDyBuRf3HNEsys5R_Dzw3QPYn5C3tuluP3_IlPcpJeBG7hNzu7w";
    window.interface.onPageLoad(token);
  }

  share(product: any) {
    //window.alert("The product has been shared!");
    window.interface.onComplete(
      product.id,
      product.price, //entero
      product.name,
      product.currency //ISO Code eje. USD
    );
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
