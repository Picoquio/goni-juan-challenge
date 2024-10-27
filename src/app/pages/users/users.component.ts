import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { APIService } from "../../api/api.service";
import { UsersResponse } from "../../api/interfaces";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HttpErrorResponse } from "@angular/common/http";
import { TableComponent } from "../../components/table/table.component";
import { ITableColumn } from "../../components/table/interfaces";

@Component({
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
})
export default class UsersComponent implements OnInit {


  userList = signal<UsersResponse[]>([]);
  loadingUserList = signal<boolean>(false);

  // Tabla
  tableColumns = signal<ITableColumn[]>([]);
  tableTitle = signal<string>('Users List')
  destroyRef = inject(DestroyRef);

  private readonly apiService = inject(APIService);

  ngOnInit(): void {
    this.getUserList();
    this.prepareTableColumns();
  }

  getUserList(): void {
    this.loadingUserList.set(true);
    this.apiService.getAllUsers()
      // Desmontamos suscripciones
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: UsersResponse[]) => {
          // Petición exitosa:
          this.userList.set(resp);
        },
        error: (err: HttpErrorResponse) => {
          // Petición con error:
          console.error(err.message);
          //TODO: agregar toast
        },
        complete: () => {
          // Indistinto del éxito u error, terminamos el loading:
          this.loadingUserList.set(false);
        }
      })
  }

  prepareTableColumns(): void {
    this.tableColumns.set(
      [
        {
          field: 'name',
          header: 'Name'
        },
        {
          field: 'username',
          header: 'Username'
        },
        {
          field: 'email',
          header: 'Email'
        },
        {
          field: 'phone',
          header: 'Phone'
        },
      ]
    )
  }





}
