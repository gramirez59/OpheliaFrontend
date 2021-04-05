import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf, from } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { getRemoteServiceBaseUrl } from 'root.module';
import { ClienteInputDto } from 'app/dto/ClienteInputDto';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IVentaDto {
    id: number;
    fecha: string;
    valorTotal: number;
    cliente: string;
    cantidadArticulos: number;
}

export class VentaDto implements IVentaDto {
    id: number;
    fecha: string;
    valorTotal: number;
    cliente: string;
    cantidadArticulos: number;

  constructor(data?: IVentaDto) {
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
          this.fecha = data["fecha"];
          this.valorTotal = data["valorTotal"];
          this.cliente = data["cliente"];
          this.cantidadArticulos = data["cantidadArticulos"];
      }
  }

  static fromJS(data: any): VentaDto {
      data = typeof data === 'object' ? data : {};
      let result = new VentaDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["fecha"] = this.fecha;
      data["valorTotal"] = this.valorTotal;
      data["cliente"] = this.cliente;
      data["cantidadArticulos"] = this.cantidadArticulos;
      return data;
  }

  clone(): VentaDto {
      const json = this.toJSON();
      let result = new VentaDto();
      result.init(json);
      return result;
  }
}

/* ----------------------------*/
export interface IProductoVendidoDto {
    nombre: string;
    cantidadVendida: number;
    totalVendido: number;
}

export class ProductoVendidoDto implements IProductoVendidoDto {
    nombre: string;
    cantidadVendida: number;
    totalVendido: number;

  constructor(data?: IProductoVendidoDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(data?: any) {
      if (data) {
          this.nombre = data["nombre"];
          this.cantidadVendida = data["cantidadVendida"];
          this.totalVendido = data["totalVendido"];
      }
  }

  static fromJS(data: any): ProductoVendidoDto {
      data = typeof data === 'object' ? data : {};
      let result = new ProductoVendidoDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["nombre"] = this.nombre;
      data["cantidadVendida"] = this.cantidadVendida;
      data["totalVendido"] = this.totalVendido;
      return data;
  }

  clone(): ProductoVendidoDto {
      const json = this.toJSON();
      let result = new ProductoVendidoDto();
      result.init(json);
      return result;
  }
}

export class PagedResultDtoOfProductoVendidoDto implements IPagedResultDtoOfProductoVendidoDto {
    totalCount: number | undefined;
    items: ProductoVendidoDto[] | undefined;
  
    constructor(data?: IPagedResultDtoOfProductoVendidoDto) {
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
                    this.items.push(ProductoVendidoDto.fromJS(item));
            }
        }
    }
  
    static fromJS(data: any): PagedResultDtoOfProductoVendidoDto {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultDtoOfProductoVendidoDto();
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
  
    clone(): PagedResultDtoOfProductoVendidoDto {
        const json = this.toJSON();
        let result = new PagedResultDtoOfProductoVendidoDto();
        result.init(json);
        return result;
    }
  }
  
  export interface IPagedResultDtoOfProductoVendidoDto {
    totalCount: number | undefined;
    items: ProductoVendidoDto[] | undefined;
  }

/* ----------------------------*/

export class PagedResultDtoOfVentaDto implements IPagedResultDtoOfVentaDto {
  totalCount: number | undefined;
  items: VentaDto[] | undefined;

  constructor(data?: IPagedResultDtoOfVentaDto) {
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
                  this.items.push(VentaDto.fromJS(item));
          }
      }
  }

  static fromJS(data: any): PagedResultDtoOfVentaDto {
      data = typeof data === 'object' ? data : {};
      let result = new PagedResultDtoOfVentaDto();
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

  clone(): PagedResultDtoOfVentaDto {
      const json = this.toJSON();
      let result = new PagedResultDtoOfVentaDto();
      result.init(json);
      return result;
  }
}

export interface IPagedResultDtoOfVentaDto {
  totalCount: number | undefined;
  items: VentaDto[] | undefined;
}



@Injectable()
export class VentaService {
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
    getAllVentas(LowStock: boolean | null | undefined, skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfVentaDto> {
      let url_ = this.baseUrl + '/api/services/app/VentaServicio/GetAllPurchases?';
      if (LowStock !== undefined)
          url_ += "getLowStock=" + encodeURIComponent("" + LowStock) + "&";      
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
                  return <Observable<PagedResultDtoOfVentaDto>><any>_observableThrow(e);
              }
          } else
              return <Observable<PagedResultDtoOfVentaDto>><any>_observableThrow(response_);
      }));
  }

  getAllTotalVendido(skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfProductoVendidoDto> {
    let url_ = this.baseUrl + '/api/services/app/VentaServicio/GetTotalSoldByProduct';
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
        return this.processGetAllTotalVendido(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processGetAllTotalVendido(<any>response_);
            } catch (e) {
                return <Observable<PagedResultDtoOfProductoVendidoDto>><any>_observableThrow(e);
            }
        } else
            return <Observable<PagedResultDtoOfProductoVendidoDto>><any>_observableThrow(response_);
    }));
}

  /**
     * @param input (optional)
     * @return Success
     */
    create(input: ClienteInputDto | null | undefined): Observable<VentaDto> {
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
                    return <Observable<VentaDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<VentaDto>><any>_observableThrow(response_);
        }));
    }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfVentaDto> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
      if (status === 200) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = PagedResultDtoOfVentaDto.fromJS(resultData200);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<PagedResultDtoOfVentaDto>(<any>null);
  }

  protected processGetAllTotalVendido(response: HttpResponseBase): Observable<PagedResultDtoOfProductoVendidoDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = PagedResultDtoOfProductoVendidoDto.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<PagedResultDtoOfProductoVendidoDto>(<any>null);
}

  protected processCreate(response: HttpResponseBase): Observable<VentaDto> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VentaDto.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<VentaDto>(<any>null);
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