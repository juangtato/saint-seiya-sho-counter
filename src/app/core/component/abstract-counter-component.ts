import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class AbstractCounterComponent {
  @Input({ required: true })
  counterControl!: FormControl<number>;

  update(value: number): void {
    const previous = this.counterControl.value;
    this.counterControl.setValue(previous + value);
    if (this.counterControl.invalid) {
      this.counterControl.setValue(previous);
    } else {
      this.counterControl.markAsDirty();
    }
  }
}
