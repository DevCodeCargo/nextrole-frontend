import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ToastContainerComponent } from '../platform/utils/toast-container/toast-container';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  templateUrl: './app-layout.html'
})
export class AppLayout implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }


}
