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

* @Input()

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

* Built-In directives

  + ngStyle
  + ngClass

```html
<button [class]="user.isAuthenticated ? 'auth-user' : 'not-auth-user'"></button>
```

Note: La plupart des attributs des élements du DOM, peuvent être passé comme directive.

* Custom directives

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

* Built-in attributes (Attributs inclus dans le framework)

  + ngIf
  + ngFor
  + ngSwitch

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

## Modules

[https://angular.io/guide/architecture-modules]

Un module angular packet regroupant élement de la vue et/ou services dédiés à une tâche spécifique.
Il nous permet d'isoler une implémentation du reste de notre application et d'exposer des fonctionnalités par des interfaces bien définie.

Pour créer un module:

* Using angular/cli

> ng g module </path/to/module>

```ts
// Import declaration ...

import {NgModule} from '@angular/core';

@NgModule({

  // Déclaration des élements vue du module
  declrations: [ TodoListComponent ],

  // Importation d'autre modules
  import: [
    // ... Liste des modules à importer
  ],

  // Les exporations
  exports: [ TodoListComponent ],

  // Déclaration des services
  providers: [
    TodoService
  ],

  // Les éléments de la vue à charger lorsque le module est initialisé par le framework
  entryComponents: [
    // ... 
  ]

})
export class TaskModule {

}
```

## Services

[https://angular.io/guide/architecture-services]

Les services sont des classes dédiées à l'implémentation de fonctionnalités specifiques.
Ils décorés par `@Injectable()` .

Les service ont aussi un cycle de vie que nous pourrions écouter en utilisant les interface
Ces cycles de vie sont:

  + OnDestroy()

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }
}

```

* Injection des services

Le framework angular recherche des serice à injecter effectue une opération à 3 Niveaux:

* R1 -> Consiste à rechercher le service dans les `providers` du composant l'utilisant.
* R2 -> La recherche au niveau 2 consiste à rechercher le service dans les providers du composant parent ou dans les providers de tout composant dans l'hierarchie
* R3 -> Consiste à rechercher le service dans le module dans lequel le composant est déclaré comme élement de la vue, ou éventuellement dans les modules parentes à cet module.

Règle:

* Si le service maintient un état devant ête modifier au cours de l'éxécution de votre application, portez sa déclaration dans le module principale.

--- Injection simple

```ts
// ... Module definition

// ... Imports

@NgModule({
    // ...
    providers: [
      Classe
    ]
})
export class ModuleName {}

// Composant pour injection

export class NomComponent {

    contructor([ACCESS_MODIFIER] variable: Classe) {

    }
}
```

-- Injection par création

[https://refactoring.guru/fr/design-patterns/creational-patterns]

L'injection par création s'inspire de la technique du patron de création.
Le dévéloppeur déclare dans le DI d'angular une fonction de création qui crée et retourne l'instance de la classe à injectée.

```ts
// ... Module definition

// ... Imports

@NgModule({
    // ...
    providers: [{
        provide: < Classe > ,
        useFactory: () => {
            // Créer et retourner l'instance
        },
        deps: [ < Dependances > ]
    }]
})
export class ModuleName {}

// Composant pour injection

export class NomComponent {

    contructor([ACCESS_MODIFIER] variable: Classe) {

    }
}
```

-- Injection par association Interface - Classe

Cette technique d'injection permet au DI (Gestionnaire de dépendance) d'Angular de fournir une instance d'une classe lorsqu'une interface est demandée.

Note: Dû à la perte de la notion de type, lorsque le code source est compilé en Javascript, ce type d'injection requiert la création au préable d'une constante (Token d'injection) qui sera l'implémentation utilisé par les utilisateur de notre module.

```ts
// Fichier tokens.ts
import {InjectionToken} from '@angular/core';

export const NOM_TOKEN = new InjectionToken<Type>(
  'DESCRIPTION DU TOKEN'
);

// Module
@NgModule({
  // ...
  providers: [
    {
      provide: <NOM_TOKEN>,
      useClass: <Classe>,
    }
  ]
})
export class ModuleName {}

// Nous pourrions utiliser cette association avec une fonction de création

// Module
@NgModule({
  // ...
  providers: [
    {
      provide: <NOM_TOKEN>,
      useFactory: () => {
        // Créer et retourner l'instance
      },
      deps: [<Dependances>]
    }
  ]
})
export class ModuleName {}

// Injection dans le composant
// Composant pour injection

export class NomComponent {

  contructor(@Inject(NOM_TOKEN) [ACCESS_MODIFIER] variable: Type) {}
}
```

-- Injection d'une valeur

Ce type d'injection nous permet de fournir une valeur primitive/object à la demande.

```ts
// Module
@NgModule({
  // ...
  providers: [
    {
      provide: <NOM_TOKEN>,
      useValue: <VALEUR_A_FOURNIR>
    }
  ]
})
export class ModuleName {}
```
