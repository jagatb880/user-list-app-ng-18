import { HttpErrorResponse } from "@angular/common/http";
import { LoggerService } from "./logger.service";
import { NotificationService } from "./notification.service";

export class ExceptionHandlingService {
  
  constructor(private loggerService: LoggerService, private notificationService: NotificationService) {}

  // Handle any type of error or exception
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      this.handleHttpError(error);
    } else if (error instanceof TypeError) {
      // Handle Type errors (usually caused by incorrect variable types)
      this.handleTypeError(error);
    } else if (error instanceof Error) {
      // Handle general errors (like syntax, logic, etc.)
      this.handleGenericError(error);
    } else {
      // Unknown errors
      this.handleUnknownError(error);
    }

    // Optionally log the error
    this.logError(error);

    // Notify the user or developer
    this.notifyUser(error);
  }

  private handleHttpError(error: HttpErrorResponse): void {
    // You can handle different HTTP status codes here
    if (error.status === 404) {
      console.error('Error 404: Resource not found.');
    } else if (error.status === 500) {
      console.error('Error 500: Server error.');
    } else {
      console.error('An HTTP error occurred:', error.message);
    }
  }

  private handleTypeError(error: TypeError): void {
    console.error('A TypeError occurred:', error.message);
  }

  private handleGenericError(error: Error): void {
    console.error('An error occurred:', error.message);
  }

  private handleUnknownError(error: any): void {
    console.error('An unknown error occurred:', error);
  }

  private logError(error: any): void {
    // Use a logging service to log the error details (could be stored in files, remote services, etc.)
    this.loggerService.logError(error);
  }

  private notifyUser(error: any): void {
    // Notify users (show user-friendly message) or developers (email/slack)
    const errorMessage = this.getErrorMessage(error);
    this.notificationService.notify(errorMessage);
  }

  private getErrorMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      return `HTTP Error: ${error.status}`;
    } else if (error instanceof TypeError) {
      return `Type Error: ${error.message}`;
    } else if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return 'Unknown error occurred';
    }
  }
}
