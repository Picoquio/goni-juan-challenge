import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { ITableColumn } from "./interfaces";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SkeletonModule,
    ButtonModule
  ],
  templateUrl: './table.component.html'
})
export class TableComponent {

  tableColumns = input.required<ITableColumn[]>();
  dataSource = input.required<any>();
  tableTitle = input.required<string>()




}
