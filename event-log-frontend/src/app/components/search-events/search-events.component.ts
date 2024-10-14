import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-events',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4">Buscar Eventos</h2>
      <form (submit)="onSearch()" class="border p-4 rounded shadow">
        <div class="mb-3">
          <label for="eventType" class="form-label">Tipo de Evento:</label>
          <input id="eventType" [(ngModel)]="eventType" name="eventType" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">Fecha de Inicio:</label>
          <input id="startDate" [(ngModel)]="startDate" name="startDate" type="date" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="endDate" class="form-label">Fecha de Fin:</label>
          <input id="endDate" [(ngModel)]="endDate" name="endDate" type="date" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Buscar</button>
      </form>

      <div *ngIf="results.length > 0" class="mt-4">
        <h3>Resultados de la Búsqueda:</h3>
        <ul class="list-group">
          <li *ngFor="let event of results" class="list-group-item">
            {{ event.description }} - {{ event.eventType }} - {{ event.date | date:'short' }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class SearchEventsComponent {
  eventType: string = '';
  startDate: string = '';
  endDate: string = '';
  results: any[] = [];

  constructor(private eventService: EventService) {}

  onSearch() {
    const filters = {
      eventType: this.eventType,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.eventService.searchEvents(filters).subscribe({
      next: (response) => {
        this.results = response; // Asignar los resultados
      },
      error: (error) => {
        console.error('Error buscando eventos', error);
      }
    });
  }
}
