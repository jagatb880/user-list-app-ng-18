import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    NgIf,
    HeaderComponent,
    MatIconModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: any[] = [];
  page: number = 1;
  loading: boolean = false;
  userNotFound: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.page);
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe((response) => {
      if (response.data.length) {
        this.users = response.data;
        this.loading = false;
        this.userNotFound = false;
      } else {
        this.users = response.data;
        this.loading = false;
        this.userNotFound = true;
      }
    });
  }

  nextPage() {
    this.page++;
    this.fetchUsers(this.page);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchUsers(this.page);
    }
  }
}
