import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TsIdleModule } from './ts-idle/ts-idle.module';
import { DialogConfirmModule } from './dialog/dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TsIdleModule,
    DialogConfirmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
