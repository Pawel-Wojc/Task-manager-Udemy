import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onClick($event)',
    },
    hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
    appSafeLink = input('myapp');
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('SafeLinkDirective is active');
    }

    onClick(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to open this link?');

        if (wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href =
                address + '?from=' + this.appSafeLink();
            return;
        } else {
            event.preventDefault();
        }
    }
}
