import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from "@angular/core";
import { EventsService } from "../events.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"]
})
export class TopBarComponent implements OnInit {
  title = "My Store";
  constructor(private eventSrv: EventsService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.eventSrv.currentMessage.subscribe(message => {
      this.title = message;

      this.cd.detectChanges();
    });
  }

  close() {
    window.interface.close();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
