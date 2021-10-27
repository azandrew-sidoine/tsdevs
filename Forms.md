# ANGULAR FORMS

[https://angular.io/guide/forms-overview]

Angular nous offre deux API de manipulation des formulaires HTML dans notre application:

* L'API Reactive (Reactive forms)
    Offre tout un API, de manipulation, d'écoute d'événements changement de valeurs, etc... pour la manipulation des formulaire HTML.

* L'API directive (Template driven forms)
    Permet l'utilisation des directive `ngModel` pour rattacher un model(object typescript) à un formulaire.

## Les formulaire directives

```ts

// model.ts
export interface TodoInputModel {
  label?: string;
  createdAt?: string | Date;
}

// component.ts
@Component({
    // ...
})
export class ComponentName {

    // ...
    model: TodoInputModel = {};

    // ... 

    // Modification des valeurs du formulaire
    ngOnInit() {
        timeout(() => {
        // this.model.label = 'ALLER AU RESTAURANT';
        // this.model.createdAt = new Date();
        this.model = {
            label: 'ALLER AU RESTAURANT',
            createdAt: new Date(),
        } as TodoInputModel;
        }, 2000);
    }
}

// template.html
<input
    clrInput
    placeholder="Saisir..."
    (ngModelChange)="onLabelControlChange($event)"
    required
    maxlength="20"
    name="label"
    [disabled]="performingAction ? true : false"
    [(ngModel)]="model.label"
  />
  <!-- DATE INPUT -->
  <clr-date-container>
    <input
      type="date"
      clrDate
      required
      name="demo"
      [(ngModel)]="model.createdAt"
    />
  </clr-date-container>
```

## Formulaires réactives

Note: Rappelez vous de toujours importer le `ReactiveFormsModule` pour utiliser l'API réactive.

-- Les classes

* Formcontrol -> Classe de gestion des controls/inputs du formulaire

```ts
import {FormControl} from "angular/forms";

const control =  new FormControl(<NOM_CONTROL>, [<VALEUR>], [<REGLE_DE_VALIDATION>]);
```

Le FormControl sur une vue HTML ou XML
--------------------------------------

Pour rattacher le control à un champ sur la vue l'utilisation de la directive `[formControl]` est requise comme suit:

```html
<input clrInput placeholder="Saisir..." [formControl]="control" />
```

* FormGroup -> Classe de gestion d'un ensemble de controls/input. Cette classe groupe les controls en objet clé - valeur

```ts
import {Formgroup} from "angular/forms";

const control =  new Formgroup({
    "firstname": [<VALEUR>, <FUNCTION_DE_VALIDATION>],
    "lastname": [<VALEUR>, <FUNCTION_DE_VALIDATION>],
});
```

Le FormGroup sur une vue HTML ou XML
------------------------------------

Associer le formulaire créé sur une vue HTML requiert l'utilisation de la directive `[formGroup]` sur le conteneur du formulaire.

Chaque champ `input` est associé à une entré de l'object formgroup en utilisant l'attribut `formControlName` comme ci-dessous.

```html
<form [formGroup]="model">
    <input clrInput placeholder="Saisir..." formControlName="label" />
    <!-- DATE INPUT -->
    <clr-date-container>
        <input type="date" clrDate formControlName="createdAt" />
    </clr-date-container>
</form>
```

* FormArray -> Même que le Formgroup, mais groupant les control en array.

```ts
import {FormArray} from "angular/forms";

const control =  new FormArray([
new FormControl(<NOM_CONTROL>, [<VALEUR>], [<REGLE_DE_VALIDATION>]),
new FormControl(<NOM_CONTROL>, [<VALEUR>], [<REGLE_DE_VALIDATION>])
]);
```

* FormBuilder -> Utilise la technique de patron ce création pour générer des instances des controls préalablement listé

```ts
import { FormBuilder } from "@angular/forms";

// component.ts
@Component({
    // ...
})
export class ComponentName {

    formgroup: FormGroup;
    formArray: FormArray;

    constructor(private builder: FormBuilder) {
        this.formgroup = this.builder.group({
            //...
            // Objet réprésentant les controls du formulaire
        });

        this.formArray = this.builder.array([
            // Liste des controls
        ]);
    }
}

```

-- Les fonctions de validation

Une fonction de validation est peut être une fonction javascript/typescript global ou une method statique d'une classe pure prenant en paramètre le control à validé, évalue les conditions de validation de ce dernier et retourne un objet d'erreur en cas d'erreur ou un null dans le cas contraire.

```ts
export function validateURL(control: AbstractControl) {
    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && !validator.required) {
        return null;
      }
    }
    if (!(/^((http|https|ftp):\/\/)/.test(control.value))) {
      // Retourne un objet spécifiant l'état d'erreur du champ
      return { url: true };
    }
    // Retourne null/undefined pour ne rien faire
    return null;
}
```

-- L'API Typescript de gestion des formulaire

* Evénement d'écoute des changement d'un control [`valueChanges`]

Angular forms offre une interface Observable, pour écouter et interagir avec un control quand sa valeur change.

```ts
const control = new FormControl(/* ... */);

const subscription = control.valueChanges
        .pipe(
            tap(value => {
                // Faire une action après modification du control
            })
        ).subscribe();
```

* Modification d'une valeur au control

```ts
// ...
// Modifie la valeur du control/formgroup
control.setValue('VALEUR');
```

* Accesseur de valeur

```ts
// ...
// Retourne la valeur du control/formgroup
control.value;
```

* Modification des règles de validation

```ts
// ...
import {Validators} from '@angular/forms';
// ...
control.setValidators(Validators.required);
```

* Nettoyage des règles de validation synchrone

```ts
// ...
control.clearValidators();
```

* Nettoyage des règles de validation asynchrone

```ts
// ...
control.clearAsyncValidators();
```

* Activation / Désactivation du control

```ts
// Désactivation du control
control.disable();

// Activation du control
control.enable();
```

* Accesseur d'état de désactivation

```ts
if (!control.disabled) {
    // Effectué une action si la condition est true
}
```

* Marquer un control comme sale/touché pour le rendre elligible à la validation

```ts
// Marque le control comme sale
control.markAsDirty();
// Marque le control comme touché
control.markAllAsTouched();

// Vérifie si le control a été touché
if (control.touched) {

}
```

* Vérification de l'état de validation

```ts
if (control.valid) {
    // Soumettre le formulaire
}
// Afficher les erreurs de validation à l'utilisateur
```

* Récupération des erreurs de validation

```ts
const errors = control.errors; // retourne une liste d'erreur
```

* Rénitializé la valeur du control

```ts
control.reset(); // Réinitialize le control à sa valeur initial
```

* Écouter l'événement de changement de status

Lors de la manipulation d'un control/groupe de control, ce dernier prend des états qui réflètent les manipulation sur le champ ou le group de champ. Angular expose un observable de ces changement d'état pour permettre au dévéloppeur d'interagir avec ces changements d'états.

```ts
control.statusChanges
.pipe(
    tap(state => {
        // Effectué une action
    })
).subscribe();
```

* Accesseur d'un champ dans un groupe de champ (Uniquement FormGroup)

```ts
formgroup.get('controlname'); // Retourne le champ ou undefined si cela n'existe pas
formgroup.controls['controlname']; // Accès par index de tableau
```

* Ajout d'un champ a un groupe de champ (Uniquement FormGroup)

```ts
// ...
import {FormControl} from "@angular/forms";
// ... 
formgroup.addControl('control', new FormControl(/*...*/))
```

* Suppression d'un champ a un groupe de champ (Uniquement FormGroup)

```ts
// ... 
formgroup.removeControl('control');
```

* Récupération de la valeur pure d'un groupe de champ (Uniquement FormGroup)

```ts
model.getRawValue(); // Retour un objet représentant le formulaire avec la valeur des champ désactivé incluse.
```
