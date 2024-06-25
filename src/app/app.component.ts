import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PasswordGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-generator-app';
}
