import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplePipe } from './pipes/sample.pipe';

@NgModule({
  imports: [CommonModule, SamplePipe],
  exports: [SamplePipe, CommonModule]
})
export class SharedModule {}
