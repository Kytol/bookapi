
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { book } from 'src/app/models/book.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public book:book={
    title: '',
    price: 0,
    released: '',
    score: 0,
    id: ''
  }
  constructor(   private snackBar: MatSnackBar,private dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: { book: any },
  private dialogRef: MatDialogRef<BookComponent>) { }
  
  async ngOnInit() {
  try {
    this.book = this.data.book
    console.log('this.data.book: ', this.data.book);
  } catch (error) {
    console.warn('this.book: ', this.book);
  }

  if(!this.book){
    this.book = {
      title:'',price:0,released:'', score:0, id:null
    }
  }
  }

  async saveBook(){
    try {
      if(!this.book.title){
        this.showMessage( 'Lisää kirjan nimi', 'errorToast');
        return;
      }
      if(this.book.score > 5){
        this.book.score = 5
      }
      const requestBody = { book: this.book}

      if(!this.book.id){
try {
  console.log('this.book CREATINGGG!!!!: ', this.book);
  const createResponse = await fetch(environment.post, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  this.showMessage( 'Kirja arvostelu luotu', 'successToast');
  this.dialogRef.close();
  console.log('aaaaaaaaaaaaaaaaaaaaaa')
  return;
} catch (error) {
  console.log('error: ', error);
  this.showMessage( 'Kirja arvostelun luominen epäonnistui', 'errorToast');
}
      }
      else if(this.book.id){
      const updateResponse =
      await fetch(environment.put + this.book.id, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      console.log('success')
    }
      this.dialogRef.close();

      this.showMessage( 'Kirja arvostelu muokattu', 'successToast');
    } catch (error) {
      this.showMessage( 'Kirja arvostelun muokkaus epäonnistui', 'errorToast');
    }
    const output = await fetch(environment.put)
    console.log('output: ', output);
    const outputJSON = await output.json()
    console.log('outputJSON: ', outputJSON);

  }

  showMessage(message: string, type: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [type],
    });
  }

  async deleteBook(){
    try {
      const deleteResponse = 
      await fetch(environment.delete + this.book.id,{
        method: 'DELETE'
      })
      this.showMessage( 'Kirja poistettu onnistuneesti', 'successToast');
      console.log('deleteResponse: ', deleteResponse.status);
      this.dialogRef.close();
    } catch (error) {
      this.showMessage( 'Kirjan poisto epäonnistui', 'errorToast');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
