import { Component, input } from '@angular/core';

@Component({
  selector: 'app-favorites-stats',
  standalone: true,
  template: `
    <div class="flex flex-wrap gap-3">
      <div
        class="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-1.5"
      >
        <svg class="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>
        <span class="text-sm font-semibold text-slate-700"
          >{{ count() }} {{ count() > 1 ? 'favoris' : 'favori' }}</span
        >
      </div>
    </div>
  `,
})
export class FavoritesStats {
  count = input<number>(0);
}
