import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [FormsModule, HttpClientModule,CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4">Registrar Evento</h2>
      <form (submit)="onSubmit()" class="border p-4 rounded shadow">
        <div class="mb-3">
          <label for="eventType" class="form-label">Tipo de Evento:</label>
          <input id="eventType" [(ngModel)]="eventType" name="eventType" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Descripción:</label>
          <input id="description" [(ngModel)]="description" name="description" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="eventDate" class="form-label">Fecha del Evento:</label>
          <input id="eventDate" [(ngModel)]="eventDate" name="eventDate" type="date" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Registrar</button>
      </form>

      <div *ngIf="message" class="alert mt-3" [ngClass]="{ 'alert-success': isSuccess, 'alert-danger': !isSuccess }">
        {{ message }}
      </div>
    </div>
  `,
  styles: []
})
export class RegisterEventComponent {
  eventType: string = '';
  description: string = '';
  eventDate: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(private eventService: EventService) {}

  onSubmit() {
    console.log('Valores antes de enviar:', {
      eventType: this.eventType,
      description: this.description,
      eventDate: this.eventDate
    });

    if (!this.eventType || !this.description || !this.eventDate) {
      console.error('Error: Todos los campos son obligatorios');
      return;
    }

    const formattedDate = new Date(this.eventDate).toISOString();

    this.eventService.registerEvent(this.description, this.eventType, formattedDate).subscribe({
      next: (response) => {
        console.log('Evento registrado con éxito', response);
        this.message = 'Evento registrado con éxito!';
        this.isSuccess = true;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error registrando el evento', error);
        this.message = 'Error registrando el evento. Intenta nuevamente.';
        this.isSuccess = false;
      }
    });
  }

  resetForm() {
    this.eventType = '';
    this.description = '';
    this.eventDate = '';
  }
}
