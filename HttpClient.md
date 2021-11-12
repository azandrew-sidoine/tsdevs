# Handling HTTP Request

Http Client: C'est le module de gestion des requêtes Http dans votre application Angular

## Library

Le module HTTP Client requiert le packet `@angular/common`

## Usage

- Requirements

```ts
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    //...
    imports: [
        HttpClientModule
    ]
})
export class AppModule {}
```

- HTTP Client service

c'est une classe ou un service angular nous permettant d'effectuer des requêtes HTTP vers nos serveurs de ressources.

- Methodes

Le client une méthode base:

> request(<HttpRequest>) - Method générique de requêtes HTTP
> get(<URL>, <PARAMS>) - Faire une requête /GET
> post(<URL>, <BODY>, [<PARAMS>]) - Faire une requête /POST
> put(<URL>, <BODY>, [<PARAMS>]) - Faire une requête /PUT
> delete(<URL>, [<PARAMS>]) - Faire une requête /DELETE

## Examples


## Les intercepteurs de requêtes
