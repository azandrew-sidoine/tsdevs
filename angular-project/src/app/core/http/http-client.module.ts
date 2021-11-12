import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_CLIENT } from './angular/token/http-client';
import { HttpClientStub } from './core/http-client.stub';

@NgModule({})
export class HttpClientModule {
  static forRoot(): ModuleWithProviders<HttpClientModule> {
    return {
      ngModule: HttpClientModule,
      providers: [
        HttpClientStub,
        {
          provide: HTTP_CLIENT,
          useClass: HttpClientStub,
        },
      ],
    };
  }
}
