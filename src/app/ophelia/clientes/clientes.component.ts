import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {ClienteService, ClienteDto, PagedResultDtoOfClienteDto} from '@app/servicios/cliente.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CrearClienteComponent } from '@app/ophelia/clientes/crear-cliente/crear-cliente.component'

class PagedClientesRequestDto extends PagedRequestDto {
  WithPurchases: boolean | null;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  animations: [appModuleAnimation()]
})
export class ClientesComponent extends PagedListingComponentBase<ClienteDto> {

  clientes: ClienteDto[] = [];
  WithPurchases: boolean | null;

    constructor(
        injector: Injector,
        private _clienteService: ClienteService,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

  list(
    request: PagedClientesRequestDto,
    pageNumber: number,
    finishedCallback: Function
): void {

    request.WithPurchases = this.WithPurchases;

    this._clienteService
        .getAllClientes(request.WithPurchases, request.skipCount, request.maxResultCount)
        .pipe(
            finalize(() => {
                finishedCallback();
            })
        )
        .subscribe((result: PagedResultDtoOfClienteDto) => {
            this.clientes = result.items;
            this.showPaging(result, pageNumber);
        });
}

delete(cliente: ClienteDto): void {
    abp.message.confirm(
        this.l('¿Está seguro de eliminar este cliente?', cliente.primerNombre + cliente.primerApellido),
        (result: boolean) => {
            if (result) {
                this._clienteService
                    .delete(cliente.id)
                    .pipe(
                        finalize(() => {
                            abp.notify.success(this.l('SuccessfullyDeleted'));
                            this.refresh();
                        })
                    )
                    .subscribe(() => { });
            }
        }
    );
}

createCliente(): void {
    this.showCreateOrEditClienteDialog();
}

editCliente(cliente: ClienteDto): void {
    //this.showCreateOrEditTenantDialog(tenant.id);
}

showCreateOrEditClienteDialog(id?: number): void {
    let createOrEditClientDialog;
    if (id === undefined || id <= 0) {
        createOrEditClientDialog = this._dialog.open(CrearClienteComponent);
    } else {
        createOrEditClientDialog = this._dialog.open(CrearClienteComponent, {
            data: id
        });
    }

    createOrEditClientDialog.afterClosed().subscribe(result => {
        if (result) {
            this.refresh();
        }
    });
}

}
