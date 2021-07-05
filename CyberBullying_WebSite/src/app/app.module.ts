import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InfoComponent } from './info/info.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './matrial.module';
import { CommentsComponent } from './posts/post/comments/comments.component';
import { CommentComponent } from './posts/post/comments/comment/comment.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



import { ParticlesModule } from 'angular-particle';
import { UserService } from './services/user.service';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    PostsComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ParticlesModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
