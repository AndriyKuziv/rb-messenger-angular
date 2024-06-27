import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Directive({
  standalone: true,
  selector: '[userPermissions]'
})
export class UserPermissionsDirective {
  @Input() set userPermissions(permissions: string[]){
    this._viewContainer.clear();

    if (permissions.every(permission => this._authService.permissions.includes(permission))) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }

  constructor(
    private _templateRef: TemplateRef<unknown>,
    private _viewContainer: ViewContainerRef,
    private _authService: AuthService
  ) { }
}
