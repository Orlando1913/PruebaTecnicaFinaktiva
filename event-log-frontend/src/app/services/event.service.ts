import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events'; // URL del backend

  constructor(private http: HttpClient) {}

  registerEvent(description: string, eventType: string, eventDate: string): Observable<any> {
    const body = { description, eventType, date: eventDate }; // Crear el objeto que se enviará al backend
    return this.http.post(`${this.apiUrl}/register`, body); // Enviar solicitud POST
  }

  searchEvents(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.eventType) {
        params = params.append('eventType', filters.eventType);
    }

    if (filters.startDate) {
        params = params.append('startDate', filters.startDate);
    }

    if (filters.endDate) {
        params = params.append('endDate', filters.endDate);
    }

    return this.http.get(`${this.apiUrl}/search`, { params });
}

}