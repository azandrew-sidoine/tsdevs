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

## Pipes

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
