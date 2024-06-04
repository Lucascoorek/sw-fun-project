import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const matModules = [MatButtonModule, MatCardModule];

@NgModule({
  declarations: [],
  imports: [...matModules],
  exports: [...matModules],
})
export class MaterialModule {}
