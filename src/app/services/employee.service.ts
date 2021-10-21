import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("https://localhost:44316/Employee");
  }

  public addEmployee(employee:Employee): Observable<Employee>{
    return this.http.post<Employee>("https://localhost:44316/Employee", employee);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:44316/Employee${id}`);
  }

  public deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`https://localhost:44316/Employee/${id}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`"https://localhost:44316/Employee"/${employee.id}`, employee);
  }
}