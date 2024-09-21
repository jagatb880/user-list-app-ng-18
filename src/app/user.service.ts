import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ExceptionHandlingService } from './exception-handling.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  cachedUsers: any = {};

  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient,private exceptionHandlingService: ExceptionHandlingService) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    if (this.cachedUsers[id]) {
      return of({ data: this.cachedUsers[id] });
    }

    return this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(
        tap((response: any) => (
          setTimeout(()=>{
            this.cachedUsers[id] = response.data
          },3000)
        )),
        catchError((error: HttpErrorResponse) => {
          // Delegate error handling to the common service
          this.exceptionHandlingService.handleError(error);
          // Rethrow the error to the component (if needed)
          return throwError(() => new Error('An error occurred while fetching products'));
        })
      );
  }

  // Example: Fetch product list (could be used in an eCommerce app)
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Delegate error handling to the common service
          this.exceptionHandlingService.handleError(error);
          // Rethrow the error to the component (if needed)
          return throwError(() => new Error('An error occurred while fetching products'));
        })
      );
  }

  // Example: Fetch a single product
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.exceptionHandlingService.handleError(error);
          return throwError(() => new Error('An error occurred while fetching the product'));
        })
      );
  }

  // Example: Create a new product (POST request)
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.exceptionHandlingService.handleError(error);
          return throwError(() => new Error('An error occurred while creating the product'));
        })
      );
  }
}
