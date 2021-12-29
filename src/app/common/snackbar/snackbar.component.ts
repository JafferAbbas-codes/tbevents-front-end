import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  openSnackBar(input: any) {
    console.log("input in openSnackBar",input)
    this.snackBar.open(input.message, input.action, input.options);
  }
}
