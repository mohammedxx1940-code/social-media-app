import { Component } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-with-navbar',
  imports: [NavbarComponent , RouterOutlet],
  templateUrl: './layout-with-navbar.component.html',
  styleUrl: './layout-with-navbar.component.css',
})
export class LayoutWithNavbarComponent {

}
