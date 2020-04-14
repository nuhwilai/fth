import { Directive, OnInit, ElementRef, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService, AuthData } from './auth.service';

@Directive({
  selector: '[ifAnyGranted]'
})
export class IfAnyGrantedDirective implements OnInit {

  authData: AuthData
  roles: any

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.authService.authData$.subscribe(authData => {
      this.authData = authData
      this.updateView()
    })
  }

  @Input()
  set ifAnyGranted(val) {
    this.roles = val;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
        if(this.viewContainer.length == 0)
          this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {    
    return this.authService.isGranted(this.roles);
  }

}
