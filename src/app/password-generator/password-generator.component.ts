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
  password = '';

  length = 8;
  includeLetters = true;
  includeNumbers = true;
  includeSymbols = true;

  readonly maxLength = 20;
  readonly minLength = 6;

  onGeneratePassword(): void {
    this.normalizeLength();

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+';
    const enabledCharacterSets: string[] = [];

    if (this.includeLetters) enabledCharacterSets.push(letters);
    if (this.includeNumbers) enabledCharacterSets.push(numbers);
    if (this.includeSymbols) enabledCharacterSets.push(symbols);

    if (enabledCharacterSets.length === 0) {
      this.password = '';
      return;
    }

    const validChars = enabledCharacterSets.join('');
    const generatedPassword = enabledCharacterSets.map(
      characterSet => characterSet[this.secureRandomIndex(characterSet.length)]
    );

    while (generatedPassword.length < this.length) {
      generatedPassword.push(validChars[this.secureRandomIndex(validChars.length)]);
    }

    for (let i = generatedPassword.length - 1; i > 0; i--) {
      const swapIndex = this.secureRandomIndex(i + 1);
      [generatedPassword[i], generatedPassword[swapIndex]] =
        [generatedPassword[swapIndex], generatedPassword[i]];
    }

    this.password = generatedPassword.join('');
  }

  onLengthBlur(): void {
    this.normalizeLength();
  }

  private normalizeLength(): void {
    const numericLength = Number(this.length);
    const safeLength = Number.isFinite(numericLength)
      ? Math.trunc(numericLength)
      : this.minLength;

    this.length = Math.max(this.minLength, Math.min(safeLength, this.maxLength));
  }

  private secureRandomIndex(upperBound: number): number {
    const range = 0x1_0000_0000;
    const unbiasedLimit = range - (range % upperBound);
    const randomValue = new Uint32Array(1);

    do {
      crypto.getRandomValues(randomValue);
    } while (randomValue[0] >= unbiasedLimit);

    return randomValue[0] % upperBound;
  }
}
