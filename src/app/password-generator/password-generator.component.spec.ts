import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordGeneratorComponent } from './password-generator.component';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('generates a password using cryptographically secure randomness', () => {
    const insecureRandom = spyOn(Math, 'random');

    component.length = 12;
    component.onGeneratePassword();

    expect(component.password).toHaveSize(12);
    expect(component.password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+]+$/);
    expect(component.password).toMatch(/[a-zA-Z]/);
    expect(component.password).toMatch(/[0-9]/);
    expect(component.password).toMatch(/[!@#$%^&*()_+]/);
    expect(insecureRandom).not.toHaveBeenCalled();
  });

  it('normalizes invalid and out-of-range lengths', () => {
    component.length = Number.NaN;
    component.onGeneratePassword();
    expect(component.length).toBe(component.minLength);
    expect(component.password).toHaveSize(component.minLength);

    component.length = 999;
    component.onGeneratePassword();
    expect(component.length).toBe(component.maxLength);
    expect(component.password).toHaveSize(component.maxLength);

    component.length = 9.8;
    component.onGeneratePassword();
    expect(component.length).toBe(9);
    expect(component.password).toHaveSize(9);
  });

  it('does not generate a password without an enabled character set', () => {
    component.includeLetters = false;
    component.includeNumbers = false;
    component.includeSymbols = false;

    component.onGeneratePassword();

    expect(component.password).toBe('');
  });
});
