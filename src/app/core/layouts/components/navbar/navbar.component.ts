import { Component, inject} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../../services/flowbite.service';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";
@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent{
  flowbiteService = inject(FlowbiteService);
  authS = inject(AuthService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  logOut(){
    this.authS.logOut();
  }
}