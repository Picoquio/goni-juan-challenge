import { CommonModule } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { ITableColumn } from "./interfaces";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SkeletonModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './table.component.html'
})
export class TableComponent {

  tableColumns = input.required<ITableColumn[]>();
  dataSource = input.required<any>();
  tableTitle = input.required<string>()
  userRoles = input.required<string[]>();
  addRecordLabel = input<string>();
  loading = input<boolean>();
  selectedTableRow = output();
  addRecordClicked = output();

  sendRowInfoToParent(data: any) {
    console.log(data)
    this.selectedTableRow.emit(data);
  }

  notifyAddRecordClicked() {

    this.addRecordClicked.emit();
  }

  hasRole(role: string): boolean {
    return this.userRoles().includes(role);
  }

}
