import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './Layout/base/base.component';
import { AsideLeftComponent } from './Layout/aside/aside-left.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './Modules/auth/_services/auth.service';
import { AuthGuard } from './Modules/auth/_guards/auth.guard';
import { ErrorPageComponent } from './Layout/error-page/error-page.component';

export let InjectorInstance: Injector;
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ErrorPageComponent,
    AsideLeftComponent
  ],
  exports:[BaseComponent,
    AsideLeftComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    AppRoutingModule,
  	ToastrModule.forRoot({
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
			closeButton:true
      }),
      Ng4LoadingSpinnerModule.forRoot(),
    
  
  ],
  providers: [AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {

		InjectorInstance = this.injector;
	  }
 }
