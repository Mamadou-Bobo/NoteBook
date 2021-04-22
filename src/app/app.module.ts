import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from './color/color.component';
import { NotesComponent } from './notes/notes.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { ModalComponent } from './modal/modal.component';
import { StarIconComponent } from './star-icon/star-icon.component';
import { HeaderComponent } from './header/header.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EllipsisPipe } from './elipse/elipse.pipe';
import { LoaderComponent } from './loader/loader.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FilterPipe } from './filterPipe/filter.pipe';

const appRoutes: Routes = [
  {path: 'auth/sign-in', component: SignInComponent},
  {path: 'auth/sign-up', component: SignUpComponent},
  {path: 'favorite', component: HeaderComponent},
  {path: '', component: NotesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignInComponent,
    SignUpComponent,
    ColorComponent,
    NotesComponent,
    SingleNoteComponent,
    ModalComponent,
    StarIconComponent,
    HeaderComponent,
    AlertModalComponent,
    EllipsisPipe,
    LoaderComponent,
    FavoriteComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
