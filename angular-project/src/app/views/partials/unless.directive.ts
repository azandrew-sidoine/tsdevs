import { Directive } from '@angular/core';

// Décorateur - Fonction typescript ou Javascript qui ajoute des données descriptives (métadonnées) à une classe, une propriété de classe, ou une autre fonction
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {

  constructor() { }

}
