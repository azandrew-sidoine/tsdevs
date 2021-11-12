import { HttpClient as NgHttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { HttpClient } from '../../contracts/http-client';

export type Client = NgHttpClient | HttpClient;

export const HTTP_CLIENT = new InjectionToken<Client>(
  'Provides an instance of HTTPClient'
);
