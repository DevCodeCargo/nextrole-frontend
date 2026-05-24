import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-layout.html'
})
export class AppLayout implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }


}
