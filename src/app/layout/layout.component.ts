import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuBarComponent } from "./components/menu-bar.component";



@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  // styleUrl: './main-layout.component.css',
  imports: [MenuBarComponent, RouterModule]
})
export default class MainLayoutComponet {


}
