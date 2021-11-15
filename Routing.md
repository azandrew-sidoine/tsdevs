# Navigation

[https://angular.io/guide/router]

## Library

La librairie de navigation en angular est le paquet `@angular/router`.

## Concept

Concept d'affichage de fragments l'application en fonction des rêgles de navigation défini.

## Configuration

- Générer les définitions de routage avec le `@angular/cli`

> ng new routing-app --routing --defaults

- Module de routage

Le module de routage en Angular est le `RouterModule`.

Le RouterModule expose 2 methodes statiques:

-- forRoot()
    Définie les règles de navigation à l'aborescence de l'application Angular.

Note: Il vous faut appelé cette méthode seulement dans le module de navigation principal de votre application.

-- forChild()
    Définie les règles de navigation dans les modules enfants d'une application angular de l'application Angular.

## Modules elements [RouterOutlet,RouteLink,Router,Route]

## Navigation par directive

C'est juste une navigation se servant d'une directive pour afficher/naviguer vers un component.

## Navigation impérative

Cette navigation fait intervenir, le service de navigation `Router` pour afficher les composant vers lesquels nous navigons.

## Examples
