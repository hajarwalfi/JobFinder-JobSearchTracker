import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar {
  keyword = '';
  location = '';
  search = output<{ keyword: string; location: string }>();

  onSearch() {
    this.search.emit({ keyword: this.keyword.trim(), location: this.location.trim() });
  }

  clearKeyword() {
    this.keyword = '';
    this.onSearch();
  }

  clearLocation() {
    this.location = '';
    this.onSearch();
  }
}
