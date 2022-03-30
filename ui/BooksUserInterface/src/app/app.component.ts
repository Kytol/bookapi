
import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookComponent } from './components/book/book.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private dialog: MatDialog){}

  displayedColumns: string[] = ['title', 'score', 'price', 'released'];
  displayedHeadColumns: string[] = ['Books', 'add'];
  isLoading = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource: any;
  public book: any = {};

  async ngOnInit(): Promise<void> {
  try {
    const output = await fetch(environment.readall)
    const outputJSON = await output.json()

    this.allBooks = outputJSON
    let db = [];

    for(let book of this.allBooks){
      db.push(book.book);
    }
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<any>(db);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('this.dataSource: ', this.dataSource);
  } catch (error) {
    console.log('error: ', error);
  }
}
 
allBooks = [];
async logData(row: any) {
  // console.log(row);
}

async edit(book: any) {
  console.log("opens DIALOG, book data =" + JSON.stringify(book));
  this.dialog
    .open(BookComponent, {
      autoFocus: true,
      data: {
        book: book,
      },
      width: '100%',
      maxWidth: 800,
    })
    .afterClosed()
    .subscribe(async () => {
      const output = await fetch(environment.readall)
      const outputJSON = await output.json()
      this.allBooks = outputJSON
      let db = [];
      for(let book of this.allBooks){
        db.push(book.book);
      }
      this.dataSource = new MatTableDataSource<any>(db);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
}
