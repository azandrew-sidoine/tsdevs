# Angular

* UI Framework
* MVVM === MVC -> Model View (View Model) -> Model View (Controller)

Model - Réprésentation de nos entités (BD, Collection, List de données)
View - Interface Utilisateur
View-Model - Pont de communication entre le model et la vue

* Utilise Typescript comme langage de dev

## Core Composant

RxJS - Langage de Programmation réactive

// UI

* Directive - Ce sont les objects réprésentation & manipulation de la vue
* Transformatteur - Ce sont des object appliquant des logique de transformation sur les éléments de la vue

// Non UI

* Gestionnaire de dépendance - IoC - Fourni des classes ou des objects à la demande
* Providers -> Ils sont utilisé par le IoC pour créer les objects
* Services -> Classes créé qui ont des objectifs définie

## Client Console d'Angular

Permet de générer un projet angular et de manipuler les fichiers du projet.

* Création d'un projet Angular

> ng new <NOM_PROJET>

* Générer les éléments Typescript et HTML

> ng g <directive|component|service|pipe|class|interface> <CHEMIN_RELATIF_VERS_FICHIER> [--skip-tests]

## Directives

Les directives sont des sélecteurs d'éléments d'une vue. Ils nous permettent de manipuler (modifier les attributs class, styles, etc... & afficher l'élément sur la vue).
Ces directives sont des classes Typescript/Javascript décorées par `@Directives()`

```ts
document.getElementByID(); // Do not
document.querySelector(); // Do not

import { Directive } from '@angular/core';

// Décorateur - Fonction typescript ou Javascript qui ajoute des données descriptives (métadonnées) à une classe, une propriété de classe, ou une autre fonction
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {

  constructor() { }

}
```

## Components (VM)

Ce sont des directives, qui disposent d'une vue.

Ce sont des classes décoré par le décorateur `@Component()`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  constructor() { }
}

```

-- Abstraction des styles appliqués au composant

Tout style défini sur un composant est encapsulé(n'est appliqué que sur les éléments du composant) sur le composant, lui même. Ces styles ne s'étendent pas au parent , ni aux composants enfants de ce dernier.

-- Le selecteur :host

Selecteur faisant référence à l'élément/composant dans sa feuille de style.

-- ::ng-deep

Sélecteur permettant d'étendre les propriétés css déclarées dans la feuille de style composant à ces enfants.

### Le cycle de vie des composant

OnInit, AfterViewInit, OnChanges, OnDestroy.

### Affichage des élement sur la vue

Pour afficher la valeur d'une variable sur une vue Angular on utilisae l'opération de double interpolation: {{ <VARIABLE> }}

### Communication entre les composants

Les décorateur `@Input()` et `@Output()` offrent un API permettant au dévéloppeurs d'interagir avec les propriétes d'un composant et au composant de notifier son environment externe.

- @Input()

Le décorateur `@Input()` permet au dévéloppeur d'exposer une/des propriété(s) du composant à l'environment HTML
dans lequel le composant est utilisé.
Cela permet aux utilisateur du composant de passer/d'associer des valeurs aux propriétés du composant.

```ts
// Syntax
// @Input([attribut]) property[: <TYPE>] [= <VALUE>];

@Component({
  selector: 'app-button'
  //...
})
export class ButtonComponent {
  // Example
  @Input() disabled: boolean;
}
```

```html
<app-button [disabled]="true"> </app-button>
```

## Directives (Pure directives)

### Attribute directives

- Built-In directives

  * ngStyle
  * ngClass

```html
<button [class]="user.isAuthenticated ? 'auth-user' : 'not-auth-user'"></button>
```

Note: La plupart des attributs des élements du DOM, peuvent être passé comme directive.

- Custom directives


```ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeText]'
})
export class ChangeTextOnHoverDirective {

  constructor(private element: ElementRef) { }

  // Le décorateur @HostListener() permet d'écouter un évenement sur l'élément
  // référencé
  @HostListener('mouseenter')
  onMouseEnter() {
    (this.element.nativeElement as HTMLElement).innerHTML = 'TEXT CHANGED';
    (this.element.nativeElement as HTMLElement).style.fontSize = '32px';
  }

}

```

### Structural directives

- Built-in attributes (Attributs inclus dans le framework)

  * ngIf
  * ngFor
  * ngSwitch

```ts
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
```

## Pipes

Les pipes (Transformatteurs) sont des class décorées avec le décorateur `@Pipe` qui expose une fonction de transformation d'une valeur sur la vue.

Pour générer un pipe avec le @angular/cli:

> ng g pipe <Chemin/Vers/Fichier/Pipe>

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'case'
})
export class CasePipe implements PipeTransform {

transform(value: string, _case?: string): string {
    if (typeof value === 'number') {
      throw new Error('Invalid parameter passed!!');
    }
    _case = _case || 'uppercase'; // UPPERCASE // LOWERCASE
    switch (_case?.toLocaleLowerCase()) {
      case 'uppercase':
        return value?.toUpperCase();
      case 'lowercase':
        return value?.toLocaleLowerCase();
      default:
        return value;
        // throw new Error('Undefined case');
    }
  }

}

```

## Services

Les services sont des classes dédiées à l'implémentation de fonctionnalités specifiques.
Ils décorés par `@Injectable()`

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }
}

```
