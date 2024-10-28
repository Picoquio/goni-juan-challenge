import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { APIService } from "../../api/api.service";
import { UsersResponse } from "../../api/interfaces";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HttpErrorResponse } from "@angular/common/http";
import { TableComponent } from "../../components/table/table.component";
import { ITableColumn } from "../../components/table/interfaces";
import { Store } from "@ngrx/store";
import { selectUserRoles } from "../../store/user.selectors";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ToastService } from "../../common/services/toast.service";
import { FormValidationService } from "../../common/services/formValidation.service";

@Component({
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
})
export default class UsersComponent implements OnInit {

  userList = signal<UsersResponse[]>([]);
  userRoles = signal<string[]>([])
  loadingUserList = signal<boolean>(false);
  tableColumns = signal<ITableColumn[]>([]);
  tableTitle = signal<string>('Users List');
  destroyRef = inject(DestroyRef);
  selectedUserForDialog = signal<UsersResponse | null>(null);

  addOrEditMode: AddOrEditMode | undefined;


  dialogVisibility: boolean = false;
  dialogHeader = signal<string>('')

  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(APIService);
  private readonly store = inject(Store);
  private readonly toastService = inject(ToastService);
  formValidationService = inject(FormValidationService);

  public form = this.fb.group({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(4), Validators.maxLength(120)]),
    username: new FormControl<string | null>(null, [Validators.required, Validators.minLength(4), Validators.maxLength(120)]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email, Validators.maxLength(120)]),
    phone: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(120)]),
  });

  constructor() {
    // Subscribe to user roles for logging, with automatic cleanup
    this.store.select(selectUserRoles).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (roles) => {
        this.userRoles.set(roles);
        console.log('User roles:', roles);
      }
    });
  }

  hasRole(role: string): boolean {
    let roles: string[] = [];
    this.store.select(selectUserRoles).subscribe(userRoles => roles = userRoles);
    return roles.includes(role);
  }

  prepareUserEdit(data: any) {
    this.addOrEditMode = AddOrEditMode.EDIT;
    this.selectedUserForDialog.set(data);
    this.dialogHeader.set('Edit user')
    this.dialogVisibility = true;
    this.form.patchValue({
      name: this.selectedUserForDialog()?.name,
      username: this.selectedUserForDialog()?.username,
      email: this.selectedUserForDialog()?.email,
      phone: this.selectedUserForDialog()?.phone
    })
  }

  prepareUserCreation(): void {
    this.addOrEditMode = AddOrEditMode.ADD;
    this.form.reset();
    this.dialogHeader.set('Add user');
    this.dialogVisibility = true;
  }

  createUserSubmission(): void {
    this.formValidationService.checkFormValidity(this.form);
    this.dialogVisibility = false;
    const { name, username, email, phone } = this.form.value;
    const newUser = {
      name: name ?? '',
      username: username ?? '',
      email: email ?? '',
      phone: phone ?? '',
      company: null,
      address: null,
      website: null,
    }
    this.userList().unshift(newUser)
    this.toastService.setToast({ severity: 'success', detail: 'User modified successfully' })
  }

  editUserSubmission() {
    this.formValidationService.checkFormValidity(this.form);

    // Find the index of the object with the matching id
    this.dialogVisibility = false;
    const userId = this.selectedUserForDialog()?.id;
    const index = this.userList().findIndex(item => item.id === userId);
    const resultFound = index !== -1;
    if (resultFound) {
      const { name, username, email, phone } = this.form.value;

      this.userList()[index].name = name!;
      this.userList()[index].username = username!;
      this.userList()[index].email = email!;
      this.userList()[index].phone = phone!;
      this.toastService.setToast({ severity: 'success', detail: 'User modified successfully' })

    } else {
      this.toastService.setToast({ severity: 'error', summary: 'Error', detail: `Error while modifying the user. Please try again` })
    }
  }

  determineAddOrEditSubmission() {
    if (this.addOrEditMode === AddOrEditMode.ADD) {
      this.createUserSubmission();
      return;
    }
    this.editUserSubmission();
  }


  ngOnInit(): void {
    this.getUserList();
    this.prepareTableColumns();
  }

  getUserList(): void {
    this.loadingUserList.set(true);
    this.apiService.getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp: UsersResponse[]) => {
          this.userList.set(resp);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
        },
        complete: () => {
          this.loadingUserList.set(false);
        }
      });
  }

  prepareTableColumns(): void {
    this.tableColumns.set([
      { field: 'name', header: 'Name' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
    ]);
  }
}

enum AddOrEditMode {
  ADD = 'add',
  EDIT = 'edit',
}
