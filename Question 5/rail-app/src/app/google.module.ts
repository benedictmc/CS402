import {MatInputModule,MatSnackBarModule, MatListModule, MatDividerModule, MatProgressSpinnerModule, MatCardModule, MatToolbarModule ,MatMenuModule, MatRadioModule, MatButtonModule, MatIconModule, MatTabsModule, MatButtonToggleModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule
    ],
  exports: [
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonModule,  
    MatButtonToggleModule,
    MatTabsModule
    ],
})
export class GoogleModule { }