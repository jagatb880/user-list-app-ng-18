import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'  // This ensures that the service is available globally
})
export class NotificationService {

  notify(message: string): void {
    // You can display a user-friendly error message using Angular’s UI elements like MatSnackBar
    // For server-side apps, you might send email or slack notifications to the developer team
    console.log('User notification:', message);
    // For example, in frontend: this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
