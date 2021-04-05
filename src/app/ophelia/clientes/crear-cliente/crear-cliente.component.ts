import { Component, OnInit, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AppComponentBase } from '@shared/app-component-base';
import { ClienteService } from '@app/servicios/cliente.service';
import { ClienteInputDto } from '@app/dto/ClienteInputDto';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class CrearClienteComponent extends AppComponentBase implements OnInit {

  saving = false;
  cliente: ClienteInputDto = new ClienteInputDto();

  constructor(
    injector: Injector,
    public _clienteService: ClienteService,
    private _dialogRef: MatDialogRef<CrearClienteComponent>
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  save(): void {
    this.saving = true;
      this._clienteService
      .create(this.cliente)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.success(this.l('Cliente almacenado satisfactoriamente'));
        this.close(true);
      });    
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
