import {
    Directive,
    effect,
    inject,
    input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
import { LogDirective } from '../log.directive';

@Directive({
    selector: '[appAuth]',
    standalone: true,
})
export class AuthDirective {
    userType = input.required<Permission>({ alias: 'appAuth' }); // permision = user | admin | quest
    private authService = inject(AuthService);

    private templateRef = inject(TemplateRef);
    private vieContainerRef = inject(ViewContainerRef);

    constructor() {
        effect(() => {
            if (this.authService.activePermission() === this.userType()) {
                this.vieContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.vieContainerRef.clear();
            }
        });
    }
}
