import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  cachedUsers: any = {};

  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    if (this.cachedUsers[id]) {
      return of({ data: this.cachedUsers[id] });
    }

    return this.http
      .get(`${this.baseUrl}/${id}`)
      .pipe(tap((response: any) => (
        setTimeout(()=>{
          this.cachedUsers[id] = response.data
        },3000)
        )));
  }
}
