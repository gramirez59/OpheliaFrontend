import { Component, OnInit, Injector } from '@angular/core';
import { ProductoService, ProductoDto, PagedResultDtoOfProductoDto } from '@app/servicios/producto.service';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';

class PagedProductosRequestDto extends PagedRequestDto {
    LowStock: boolean | null;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  animations: [appModuleAnimation()]
})
export class ProductosComponent extends PagedListingComponentBase<ProductoDto> {

  productos: ProductoDto[] = [];
  LowStock: boolean | null;

    constructor(
        injector: Injector,
        private _productoService: ProductoService,
        private _dialog: MatDialog
    ) {
        super(injector);
    }

  list(
    request: PagedProductosRequestDto,
    pageNumber: number,
    finishedCallback: Function
): void {

    request.LowStock = this.LowStock;

    this._productoService
        .getAllProductos(request.LowStock, request.skipCount, request.maxResultCount)
        .pipe(
            finalize(() => {
                finishedCallback();
            })
        )
        .subscribe((result: PagedResultDtoOfProductoDto) => {
            this.productos = result.items;
            this.showPaging(result, pageNumber);
        });
}

delete(producto: ProductoDto): void {
    abp.message.confirm(
        this.l('Está seguro de eliminar este producto', producto.nombre),
        (result: boolean) => {
            if (result) {
                this._productoService
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

editCliente(cliente: ProductoDto): void {
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
