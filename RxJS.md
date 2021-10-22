# RxJS Library
* Qu'est ce que RxJS ?

C'est une implémentation de la programmation réactive dans le language Javascript.

* C'est quoi la programmation réactive ?

## Les fonctions ou opérateurs RXJS

* Création d'un observable à partir du constructeur Observable

```js
talkObservable$ = new Observable < string > (observer => {
    let index = 0;
    const interval = setInterval(() => {
        ++index;
        // Production de la donnée
        observer.next(`Talking for the ${index} time!`);
    }, 1000);

    const timeout = setTimeout(() => {
        observer.next("Talking for the last time!");
        // Cloturer la production
        observer.complete();
        clearTimeout(timeout);
        clearInterval(interval);
    }, 10000);
});
```

* Opérateurs de création

-- Création à partir d'une promesse `from`

```ts

interface Task {
    id: number;
    label: string;
    completed: boolean;
    createAt: string|Date;
    completedAt: string|Date;
}

export class TasksHandler {

    create(task: Partial<Task>) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                // Insert The task to the database
                resolve(task);
                clearTimeOut(timeout);
            }, 1000);
        });
    }
}

// task-list.component.ts
import {from} from 'rxjs';
// ...
const taskHandler = new TasksHandler();

async onCreate() {
    /**
     * @var Observable
     * 
     **/
    const result = from(taskHandler.create({
        label: 'Faire du GYM',
        createdAt: new Date()
    })).pipe(

    ).subscribe();
}

```

--- Subject - Stateless  subject

```ts
import {Subject} from  'rxjs';

const subject = new Subject<number>();

// Production de la valeur
subject.next(1);

// Récupération des données produites par le suject en observable
const observable$ = subject.asObservable();
const observable2$ = subject.pipe();

// Souscription au sujet
const subscription = subject.subscribe();
```

--- Stateful - Subject

* Behaviour subject - Qui agit comme le sujet précédent mais maintient un cache de la donnée précédemment produit.

```ts
import {BehaviorSubject} from  'rxjs';

const subject = new BehaviorSubject<number>(0);

// Production de la valeur
// subject.next(1);

// Récupération des données produites par le suject en observable
const observable$ = subject.asObservable();
const observable2$ = subject.pipe();

// Souscription au sujet
const subscription = subject.subscribe();
```

* ReplaySubject subject - Similaire à BehaviorSubject, sauf que à l'initialisation nous définissons plutôt la taille de mémoire.

-- Produire un observable a base de valeur simple `of`

L'opérateur nous permet d'observer les types primitives (Array, object, string, number, etc...); 

```ts
import {of} from 'rxjs';

const observable$ = of(5);

const list$ = of([1, 2, 3, 4, ...]);
```

-- Méthodes de concatenation

* Opérateurs de jointure d'observables

* Opérateurs de transformation

Les méthodes de transformation sont des méthodes appliqués sur les valeur de la pile. `pipe`

-- Map
    Permet de transformer la valeur produit par un observable

```ts
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

const list$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9 ,10]);

list$.pipe(
    map(state => state.map(x => x * 10))
);
```

-- MergeAll `mergeAll`

-- ToArray `toArray`
    Produit une liste a partir des valeur produit par un observable

-- Filter `filter`
    Applique un filtre sur la valeur produite par un observable

* Cutom operator

```ts

function filterMap(source: Observable<>)
```