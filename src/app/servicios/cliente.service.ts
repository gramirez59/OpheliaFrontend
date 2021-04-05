import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, from } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { getRemoteServiceBaseUrl } from 'root.module';
import { ClienteInputDto } from 'app/dto/ClienteInputDto';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IClienteDto {
    id: number;
    cedula: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    edad: string;
    telefono: string;
}

export class ClienteDto implements IClienteDto {
  id: number;
  cedula: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  edad: string;
  telefono: string;

  constructor(data?: IClienteDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.id = data["id"];
          this.cedula = data["cedula"];
          this.primerNombre = data["primerNombre"];
          this.segundoNombre = data["segundoNombre"];
          this.primerApellido = data["primerApellido"];
          this.segundoApellido = data["segundoApellido"];
          this.edad = data["edad"];
          this.telefono = data["telefono"];
      }
  }

  static fromJS(data: any): ClienteDto {
      data = typeof data === 'object' ? data : {};
      let result = new ClienteDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["cedula"] = this.cedula;
      data["primerNombre"] = this.primerNombre;
      data["segundoNombre"] = this.segundoNombre;
      data["primerApellido"] = this.primerApellido;
      data["segundoApellido"] = this.segundoApellido;
      data["edad"] = this.edad;
      data["telefono"] = this.telefono;
      return data;
  }

  clone(): ClienteDto {
      const json = this.toJSON();
      let result = new ClienteDto();
      result.init(json);
      return result;
  }
}

export class PagedResultDtoOfClienteDto implements IPagedResultDtoOfClienteDto {
  totalCount: number | undefined;
  items: ClienteDto[] | undefined;

  constructor(data?: IPagedResultDtoOfClienteDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.totalCount = data["totalCount"];
          if (Array.isArray(data["items"])) {
              this.items = [] as any;
              for (let item of data["items"])
                  this.items.push(ClienteDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): PagedResultDtoOfClienteDto {
      data = typeof data === 'object' ? data : {};
      let result = new PagedResultDtoOfClienteDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["totalCount"] = this.totalCount;
      if (Array.isArray(this.items)) {
          data["items"] = [];
          for (let item of this.items)
              data["items"].push(item.toJSON());
      }
      return data;
  }

  clone(): PagedResultDtoOfClienteDto {
      const json = this.toJSON();
      let result = new PagedResultDtoOfClienteDto();
      result.init(json);
      return result;
  }
}

export interface IPagedResultDtoOfClienteDto {
  totalCount: number | undefined;
  items: ClienteDto[] | undefined;
}



@Injectable()
export class ClienteService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
    this.baseUrl = getRemoteServiceBaseUrl();
  }

  /**
     * @param keyword (optional)
     * @param isActive (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllClientes(WithPurchases: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfClienteDto> {
        let url_ = this.baseUrl + '/api/services/app/ClienteServicio/GetAllOrClientsWithPurchases?';
      if (WithPurchases !== undefined)
          url_ += "WithPurchases=" + encodeURIComponent("" + WithPurchases) + "&";      
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };
      //console.log('Url:' + url_);

      return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGetAll(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGetAll(<any>response_);
              } catch (e) {
                  return <Observable<PagedResultDtoOfClienteDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<PagedResultDtoOfClienteDto>><any>_observableThrow(response_);
      }));
  }

  /**
     * @param input (optional)
     * @return Success
     */
    create(input: ClienteInputDto | null | undefined): Observable<ClienteDto> {
        let url_ = this.baseUrl + "/api/services/app/ClienteServicio/CreateCliente";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<ClienteDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<ClienteDto>><any>_observableThrow(response_);
        }));
    }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfClienteDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PagedResultDtoOfClienteDto.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<PagedResultDtoOfClienteDto>(<any>null);
  }

  protected processCreate(response: HttpResponseBase): Observable<ClienteDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ClienteDto.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<ClienteDto>(<any>null);
}

  /**
     * @param id (optional)
     * @return Success
     */
    delete(id: number | null | undefined): Observable<void> {
      let url_ = this.baseUrl + "/api/services/app/Tenant/Delete?";
      if (id !== undefined)
          url_ += "Id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
          })
      };

      return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processDelete(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processDelete(<any>response_);
              } catch (e) {
                  return <Observable<void>><any>_observableThrow(e);
              }
          } else
              return <Observable<void>><any>_observableThrow(response_);
      }));
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return _observableOf<void>(<any>null);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<void>(<any>null);
  }
}


export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
  }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader();
          reader.onload = event => {
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob);
      }
  });
}