import { ErrorHandler, Injectable } from '@angular/core';
import { ExceptionHandlingService } from './exception-handling.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private exceptionHandlingService: ExceptionHandlingService) {}

  handleError(error: any): void {
    // Delegate error handling to the common service
    this.exceptionHandlingService.handleError(error);
  }
}
