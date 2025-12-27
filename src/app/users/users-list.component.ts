import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

import { UserAdminService } from '../services/user-admin.service';
import { UsersDialogComponent } from './users-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog.component';
import { AdminUser } from '../models/admin-user.model';

@Component({
  standalone: true,
  selector: 'app-users-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['username', 'roles', 'enabled', 'actions'];
  dataSource = new MatTableDataSource<AdminUser>([]);
  search = '';

  @ViewChild(MatTable) table!: MatTable<AdminUser>;

  constructor(
    private userAdmin: UserAdminService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    // hook filter AFTER view exists
    this.dataSource.filterPredicate = (user, filter) =>
      user.username.toLowerCase().includes(filter);
  }

  loadUsers() {
    this.userAdmin.getUsers().subscribe({
      next: users => {
        this.dataSource.data = [...users];

      if (this.table) {
        this.table.renderRows();
      }
      },
      error: () => this.snack.open('Failed to load users', 'Close')
    });
  }

  applyFilter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  openCreateUser() {
    this.dialog.open(UsersDialogComponent, { width: '500px' })
      .afterClosed()
      .subscribe(created => {
        if (created) this.loadUsers();
      });
  }

  editUser(user: AdminUser) {
    this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: user
    }).afterClosed().subscribe(updated => {
      if (updated) this.loadUsers();
    });
  }
}
