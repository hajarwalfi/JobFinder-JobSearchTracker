import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  template: `
    <div class="text-center">
      <p class="text-sm text-slate-500">{{ subtitle() }}</p>
    </div>
  `,
})
export class AuthHeader {
  subtitle = input<string>('');
}
