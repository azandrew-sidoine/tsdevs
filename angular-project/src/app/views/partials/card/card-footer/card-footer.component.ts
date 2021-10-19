import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
})
export class CardFooterComponent {
  @Input() footer!: string;
}
