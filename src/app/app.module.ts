import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http,
      [
    {prefix:'../assets/translate/core/',suffix:'.json'}
  ]);
}
@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    })
  ],
  providers: [ ],
  exports:[FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
