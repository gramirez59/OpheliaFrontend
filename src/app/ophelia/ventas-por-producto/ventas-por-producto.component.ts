import { Component, OnInit, Injector } from '@angular/core';
import { VentaService, VentaDto, PagedResultDtoOfProductoVendidoDto, ProductoVendidoDto } from '@app/servicios/venta.service';
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
  selector: 'app-ventas-por-producto',
  templateUrl: './ventas-por-producto.component.html',
  styleUrls: ['./ventas-por-producto.component.css'],
  animations: [appModuleAnimation()]
})
export class VentasPorProductoComponent extends PagedListingComponentBase<ProductoVendidoDto> {
  productos: ProductoVendidoDto[] = [];
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
        .getAllTotalVendido(request.skipCount, request.maxResultCount)
        .pipe(
            finalize(() => {
                finishedCallback();
            })
        )
        .subscribe((result: PagedResultDtoOfProductoVendidoDto) => {
            this.productos = result.items;
            this.showPaging(result, pageNumber);
        });
}

protected delete(entity: ProductoVendidoDto): void {
  throw new Error('Method not implemented.');
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
