import { Component, OnInit, Injector } from '@angular/core';
import { VentaService, VentaDto, PagedResultDtoOfVentaDto } from '@app/servicios/venta.service';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';

class PagedVentasRequestDto extends PagedRequestDto {
  LowStock: boolean | null;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  animations: [appModuleAnimation()]
})
export class VentasComponent extends PagedListingComponentBase<VentaDto> {

  ventas: VentaDto[] = [];
  LowStock: boolean | null;

    constructor(
        injector: Injector,
        private _ventaService: VentaService,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

  list(
    request: PagedVentasRequestDto,
    pageNumber: number,
    finishedCallback: Function
): void {

    request.LowStock = this.LowStock;

    this._ventaService
        .getAllVentas(request.LowStock, request.skipCount, request.maxResultCount)
        .pipe(
            finalize(() => {
                finishedCallback();
            })
        )
        .subscribe((result: PagedResultDtoOfVentaDto) => {
            this.ventas = result.items;
            this.showPaging(result, pageNumber);
        });
}

delete(producto: VentaDto): void {
    abp.message.confirm(
        this.l('TenantDeleteWarningMessage', producto.cliente),
        (result: boolean) => {
            if (result) {
                this._ventaService
                    .delete(producto.id)
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

editCliente(cliente: VentaDto): void {
    //this.showCreateOrEditTenantDialog(tenant.id);
}

showCreateOrEditClienteDialog(id?: number): void {
    let createOrEditClientDialog;
    if (id === undefined || id <= 0) {
        //createOrEditClientDialog = this._dialog.open(CreateClientDialogComponent);
    } else {
        /*createOrEditClientDialog = this._dialog.open(CreateClientDialogComponent, {
            data: id
        });*/
    }

    createOrEditClientDialog.afterClosed().subscribe(result => {
        if (result) {
            this.refresh();
        }
    });
}

}
