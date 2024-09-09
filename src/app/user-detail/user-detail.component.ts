import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  user: any;
  loading: boolean = false;
  userNotFound: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.fetchUser(id);
  }

  fetchUser(id: number) {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: response => {
        this.user = response.data;
        this.loading = false;
        this.userNotFound = false;
      },
      error: () => {
        this.userNotFound = true;
        this.loading = false;
      }
    });
  }
}
