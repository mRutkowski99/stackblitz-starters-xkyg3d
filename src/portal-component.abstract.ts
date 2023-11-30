import { Inject, InjectionToken } from '@angular/core';
import { CdkPortalService } from './cdk-portal.service';
import { PortalPosition, PORTAL_POSITION_TOKEN } from './shared';

export abstract class PortalBaseComponent {
  constructor(
    protected readonly cdkPortalService: CdkPortalService,
    @Inject(PORTAL_POSITION_TOKEN) public readonly position: PortalPosition
  ) {}

  close() {
    this.cdkPortalService.detachPortal();
  }
}
