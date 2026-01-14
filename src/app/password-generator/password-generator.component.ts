import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent {
  password: string = '';

  length: number = 8;
  includeLetters: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;

  maxLength: number = 20; // límite máximo
  minLength: number = 6;  // límite mínimo

  onGeneratePassword() {
    // Forzar rango permitido (6..20)
    this.length = Math.max(this.minLength, Math.min(this.length, this.maxLength));

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+';
    let validChars = '';

    if (this.includeLetters) validChars += letters;
    if (this.includeNumbers) validChars += numbers;
    if (this.includeSymbols) validChars += symbols;

    // Si no hay opciones marcadas, no se puede generar
    if (!validChars) {
      this.password = '';
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.password = generatedPassword;
  }

  // Opcional: recorta el valor cuando el usuario termine de editar (blur)
  onLengthBlur() {
    this.length = Math.max(this.minLength, Math.min(this.length, this.maxLength));
  }
}
