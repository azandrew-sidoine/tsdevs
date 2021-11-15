# Navigation

[https://angular.io/guide/router]

## Library

La librairie de navigation en angular est le paquet `@angular/router` .

## Concept

Concept d'affichage de fragments l'application en fonction des rêgles de navigation défini.

## Configuration

* Générer les définitions de routage avec le `@angular/cli`

> ng new routing-app --routing --defaults

* Module de routage

Le module de routage en Angular est le `RouterModule` .

Le RouterModule expose 2 methodes statiques:

-- forRoot()

    Définie les règles de navigation à l'aborescence de l'application Angular.

```ts
const ROUTES: Routes = [
  // Règle de navigation par redirection
  // Note: Définir cette rêgle avant tout autre règle
  {
    // Chemin vers lequel nous navigons
    path: '',
    // Chemin de redirection
    redirectTo: 'todos',
    // Règle de correspondance
    pathMatch: 'full',
  },
  // Chemin vers composant todos
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'todos/:id',
    component: TodoDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // Chemin vers lequel l'utilisateur est navigué si aucun chemin n'est correspondant
  // Note: Cette règle doit toujours et toujours être le dernier élement
  // dans votre configuration
  {
    path: '**',
    component: App404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

Note: Il vous faut appelé cette méthode seulement dans le module de navigation principal de votre application.

-- forChild()

    Définie les règles de navigation dans les modules enfants d'une application angular de l'application Angular.

## Le RouterOutlet

C'est le composant servant de `placeholder` pour les composants vers lesquels l'application angular navigue.

Note: Sans l'utilisation de ce composant le framework n'a aucune notion de la noeud où il faut placer le composant vers lequel l'application navigue:

```html
<!-- HTML Contents -->
<router-outlet></router-outlet>
```

## Navigation par directive

C'est juste une navigation se servant d'une directive pour afficher/naviguer vers un component.

Cela consiste à l'utilisation des directives `routerLink` et `routerLinkActive` du module de routage d'angular.

```html
<!-- OTHER COMPONENTS -->

<!-- NAVIGATION DEFINITIONS -->
<div class="header-nav">
    <!-- Utilisation d'URL de navigation -->
    <a routerLink="todos" routerLinkActive="active" class="nav-link nav-text">
        Todos
    </a>
    <!-- Utilisation de fragment de navigation -->
    <a [routerLink]="['/about']" routerLinkActive="active" class="nav-link nav-text">
        About
    </a>
</div>
<!-- OTHER COMPONENTS -->
```

## Navigation impérative (Utilisation du service `Router` )

Cette navigation fait intervenir, le service de navigation `Router` pour afficher les composant vers lesquels nous navigons.

### Les services

* Router

Le router est le service de gestion de la navigation dans une application angular. Il utilise le Browser navigation and Browser history API pour avoir des information sur les états de la navigation du navigateur.

Il dispose de deux methods fondamentales de navigation:

    - navigateByUrl() - Permettant de faire une navigation basé sur un string

    - navigate() - Permettant de faire une navigation en utilisant un tableau des fragments d'url

```ts
import { Router } from '@angular/router';

@Component({
    //...
})
export class ViewComponent {
  constructor(
    // Service permettant de naviger entre vos composants
    // et modules
    private router: Router
  ) {}

  public onNavigationButtonClicked(id: number) {
      // Navigation par fragment
      this.router.navigate(['path', id]);
      // Navigation par url
      this.router.navigateByUrl(`path/${id}`);
  }
}
```

* Le chemin de navigation activé (`ActivatedRoute`)

Le module de gestion de routage offre de même un service de gestion de l'état du chemin actuellement actif.

Il nous permet de récupérer les paramètres passés dans l'url de navigation, l'url actuelment actif, etc...

```ts

// Pour une règle de navigation suivante:
// module-routing.module.ts
const ROUTES: Routes = [
  // ...
  {
    path: 'todos/:id',
    component: TodoDetailComponent,
  },
  // ...
];
// 

// Nous pourrions récupérer le paramètre id dans notre composant:
// todo-detail.component.ts
@Component({
  // ...
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo | undefined;

  constructor(
    // Service permettant de récupérer des informations du chemin courant
    // dans le module de gestion de navigation
    // Injection du service
    private route: ActivatedRoute,
    @Inject(TODO_SERVICE) private service: TodoService
  ) {}

  ngOnInit(): void {
    // Récupération des paramètres dans le ActivatedRoute Service
    const id = +this.route.snapshot.params['id'];
    this.service.todos$
      .pipe(
        tap((todos) => {
            // Utilisation de l'identifiant pour la récupération d'une tâche
          this.todo = todos.find((todo) => +todo.id === id);
        })
      )
      .subscribe();
  }
}

```

## Examples
