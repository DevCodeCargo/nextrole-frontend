import { Component, HostListener, inject, signal } from '@angular/core';
import { AuthService, EmailCheckRequest } from '../../../platform/services/auth.service';
import { FormsModule } from '@angular/forms';
import { StorageHelper } from '../../../platform/utils/storage-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  imports: [FormsModule]
})
export class Landing {
  // Signal tracking nav shadow state
  isScrolled = signal(false);

  emailId = signal("");

  private authService = inject(AuthService);
  private router = inject(Router);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  onSignUpSubmit(event: Event) {
    event.preventDefault();

    let exp: RegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

    if (this.emailId() && exp.test(this.emailId())) {

      let payload: EmailCheckRequest = {
        email: this.emailId()
      }

      this.authService.checkEmail(payload).subscribe((res) => {
        console.log(res.data);


        StorageHelper.setSession('email', this.emailId());

        if (res.data.exists) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/register']);
        }

      });

    } else {
      console.error("Email Id is not valid");
    }

  }
}