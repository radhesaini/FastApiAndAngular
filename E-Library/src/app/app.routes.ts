import { Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { EditBookComponent } from './edit-book/edit-book.component';

export const routes: Routes = [
    {
        path: 'book-list',
        component: BooksDetailsComponent,
        data: {}
    },
    {
        path: 'add-book',
        component: AddBookComponent,
        data: {}
    },
    {
        path: 'edit-book/:id',
        component: EditBookComponent,
        data: {}
    }
];
