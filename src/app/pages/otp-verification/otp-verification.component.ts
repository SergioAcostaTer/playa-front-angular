// otp-verification.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OTPVerificationComponent implements AfterViewInit {
  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    if (!this.input1 || !this.input2 || !this.input3 || !this.input4) {
      console.error('Algunas referencias de input no están definidas');
    } else {
      console.log('Inputs inicializados correctamente');
    }
  }

  onKeyUp(event: KeyboardEvent, inputNumber: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (/^[a-zA-Z0-9]$/.test(event.key)) {
      if (value.length === 1) {
        switch(inputNumber) {
          case 1:
            this.input2.nativeElement.focus();
            break;
          case 2:
            this.input3.nativeElement.focus();
            break;
          case 3:
            this.input4.nativeElement.focus();
            break;
          case 4:
            input.blur();
            break;
        }
      }
    }
    else if (event.key === 'Backspace' && !value) {
      switch(inputNumber) {
        case 2:
          this.input1.nativeElement.focus();
          break;
        case 3:
          this.input2.nativeElement.focus();
          break;
        case 4:
          this.input3.nativeElement.focus();
          break;
      }
    }
  }

  onSubmit() {
    const otp = [
      this.input1.nativeElement.value,
      this.input2.nativeElement.value,
      this.input3.nativeElement.value,
      this.input4.nativeElement.value
    ].join('');
    console.log('OTP ingresado:', otp);
  }
}