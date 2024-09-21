export class LoggerService {
  
  logError(error: any): void {
    // Log the error to the console (could also log to files, or external services like Sentry, Datadog, etc.)
    console.error('Logging error:', error);
    // Optionally implement logic to send the error to a remote server
  }
}
