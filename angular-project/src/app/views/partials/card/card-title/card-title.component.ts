import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.component.html',
})
export class CardTitleComponent {
  @Input() title!: string;
}
