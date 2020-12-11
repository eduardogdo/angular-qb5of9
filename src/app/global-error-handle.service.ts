import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandleService implements ErrorHandler {
  constructor() {}
  handleError(error: Error): void {
    if (window.interface) {
      window.interface.logError(error.message);
    }
    console.error(error.stack);
  }
}
