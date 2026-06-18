import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-layout-with-footer',
  imports: [FooterComponent],
  templateUrl: './layout-with-footer.component.html',
  styleUrl: './layout-with-footer.component.css',
})
export class LayoutWithFooterComponent {

}
