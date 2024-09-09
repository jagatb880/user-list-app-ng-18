import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule, MatLabel } from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule,
    MatInputModule,MatLabel, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchId!: number;
  showBackButton = false;
  title = 'User List';
  searchControl: FormControl = new FormControl('');

  constructor(private location: Location,private router: Router) {
    this.router.events.subscribe(() => {
      this.updateHeader(this.router.url);
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), 
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        if (searchTerm) {
          this.router.navigate(['/user_details', searchTerm]);
          this.searchControl.reset();
        }
      });
  }

  goBack() {
    this.location.back();
  }

  searchUser() {
    if (this.searchId) {
      this.router.navigate(['/user_details', this.searchId]);
    }
  }

  // Update header based on the route
  updateHeader(url: string) {
    if (url.includes('user_details')) {
      this.showBackButton = true;
      this.title = 'User Detail';
    } else {
      this.showBackButton = false;
      this.title = 'User List';
    }
  }
}