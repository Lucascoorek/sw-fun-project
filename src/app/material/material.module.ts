import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

const matModules = [MatButtonModule, MatCardModule, MatDividerModule];

@NgModule({
  declarations: [],
  imports: [...matModules],
  exports: [...matModules],
})
export class MaterialModule {}
