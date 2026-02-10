import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Application } from '../../../core/models/application.model';

@Component({
  selector: 'app-application-card',
  imports: [FormsModule, DatePipe],
  templateUrl: './application-card.html',
})
export class ApplicationCard {
  application = input.required<Application>();
  statusChange = output<{ id: string; status: Application['status'] }>();
  notesChange = output<{ id: string; notes: string }>();
  remove = output<string>();

  editingNotes = false;
  notesValue = '';

  get statusLabel(): string {
    const labels: Record<string, string> = {
      en_attente: 'En attente',
      accepte: 'Accepté',
      refuse: 'Refusé',
    };
    return labels[this.application().status] || this.application().status;
  }

  get statusColor(): string {
    const colors: Record<string, string> = {
      en_attente: 'bg-yellow-100 text-yellow-800',
      accepte: 'bg-green-100 text-green-800',
      refuse: 'bg-red-100 text-red-800',
    };
    return colors[this.application().status] || 'bg-gray-100 text-gray-800';
  }

  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const status = select.value as Application['status'];
    this.statusChange.emit({ id: this.application().id!, status });
  }

  startEditNotes() {
    this.notesValue = this.application().notes || '';
    this.editingNotes = true;
  }

  saveNotes() {
    this.notesChange.emit({ id: this.application().id!, notes: this.notesValue });
    this.editingNotes = false;
  }

  cancelEditNotes() {
    this.editingNotes = false;
  }

  onRemove() {
    this.remove.emit(this.application().id!);
  }
}
