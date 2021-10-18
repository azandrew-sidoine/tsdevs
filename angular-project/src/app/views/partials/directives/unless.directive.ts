import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// Décorateur - Fonction typescript ou Javascript qui ajoute des données descriptives (métadonnées) à une classe, une propriété de classe, ou une autre fonction
@Directive({
  selector: '[unless]',
})
export class UnlessDirective {
  private _hasView = false;
  @Input('unless') set unless(condition: boolean) {
    if (!condition && !this._hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this._hasView = true;
    } else if (condition && this._hasView) {
      this.viewContainer.clear();
      this._hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
