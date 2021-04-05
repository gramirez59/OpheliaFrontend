export class ClienteInputDto implements IClienteInputDto {
    cedula: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    edad: number;
    telefono: string;

    constructor(data?: IClienteInputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.cedula = data['cedula'];
            this.primerNombre = data['primerNombre'];
            this.segundoNombre = data['segundoNombre'];
            this.primerApellido = data['primerApellido'];
            this.segundoApellido = data['segundoApellido'];
            this.edad = data['edad'];
            this.telefono = data['telefono'];
        }
    }

    static fromJS(data: any): ClienteInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new ClienteInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['cedula'] = this.cedula;
        data['primerNombre'] = this.primerNombre;
        data['segundoNombre'] = this.segundoNombre;
        data['primerApellido'] = this.primerApellido;
        data['segundoApellido'] = this.segundoApellido;
        data['edad'] = this.edad;
        data['telefono'] = this.telefono;
        return data;
    }

    clone(): ClienteInputDto {
        const json = this.toJSON();
        let result = new ClienteInputDto();
        result.init(json);
        return result;
    }
}

export interface IClienteInputDto {
    cedula: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    edad: number;
    telefono: string;
}