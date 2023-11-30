import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { PortalComponent } from './portal-component.abstract';

@Injectable({ providedIn: 'root' })
export class CdkPortalService {
  private portalOutlet?: DomPortalOutlet;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  registerPortalOutlet(outletElement: Element) {
    this.portalOutlet = new DomPortalOutlet(
      outletElement,
      this.cfr,
      this.appRef,
      this.injector,
      document
    );
  }

  disposePortalOutlet() {
    this.portalOutlet?.dispose();
  }

  attachPortal(component: ComponentPortal<PortalComponent>) {
    this.portalOutlet?.attach(component);
  }

  detachPortal() {
    this.portalOutlet?.detach();
  }
}
