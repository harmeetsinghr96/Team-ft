import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public closeSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public showErrorAlert(alertHost: any, message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeBtn.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
