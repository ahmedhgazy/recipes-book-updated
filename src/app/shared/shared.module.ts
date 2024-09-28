import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { BetterHighlightDirective } from './directives/change-color.directive';
import { HighlightDirective } from './directives/shadow-class.directive';
HighlightDirective;
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    BetterHighlightDirective,
    LoadingSpinner,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LoadingSpinner,
    BetterHighlightDirective,
    HeaderComponent,
    CommonModule,
    FormsModule,
    HighlightDirective,
    NgbDropdownModule,
  ],
})
export class SharedModule {}
