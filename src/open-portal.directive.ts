import { ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CdkPortalService } from './cdk-portal.service';
import { PortalBaseComponent } from './portal-component.abstract';
import { InteractionType, PortalPosition, Position } from './shared';

@Directive()
export abstract class BaseOpenPortalDirective<
  T extends ComponentType<PortalBaseComponent>
> {
  @Input() interactionType: InteractionType = 'hover';
  @Input() position: Position = 'right';

  private readonly MARGIN = 5;

  constructor(
    protected readonly elRef: ElementRef<HTMLElement>,
    private readonly cdkPortalService: CdkPortalService
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.interactionType !== 'hover') return;
    this.openPortal();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.interactionType !== 'hover') return;
    this.closePortal();
  }

  @HostListener('click')
  onClick() {
    if (this.interactionType !== 'click') return;
    this.openPortal();
  }

  private openPortal() {
    this.cdkPortalService.attachPortal(this.createComponentPortal());
  }

  private closePortal() {
    this.cdkPortalService.detachPortal();
  }

  protected get portalPosition(): PortalPosition {
    const hostRect = this.elRef.nativeElement.getBoundingClientRect();

    if (this.position === 'right')
      return {
        left: hostRect.right + this.MARGIN,
        top: this.getVerticalCenter(hostRect),
        translateY: -50,
      };

    if (this.position === 'left')
      return {
        left: hostRect.left - this.MARGIN,
        top: this.getVerticalCenter(hostRect),
        translateX: -100,
        translateY: -50,
      };

    if (this.position === 'below')
      return {
        left: this.getHorizontalCenter(hostRect),
        top: hostRect.bottom + this.MARGIN,
        translateX: -50,
      };

    if (this.position === 'above')
      return {
        left: this.getHorizontalCenter(hostRect),
        top: hostRect.top - this.MARGIN,
        translateX: -50,
        translateY: -100,
      };

    throw new Error('Invalid position');
  }

  protected abstract createComponentPortal(): ComponentPortal<T>;

  private getVerticalCenter(rect: DOMRect): number {
    return rect.top + (rect.bottom - rect.top) / 2;
  }

  private getHorizontalCenter(rect: DOMRect): number {
    return rect.left + (rect.right - rect.left) / 2;
  }
}
