import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import {EmployeeService} from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employeeService: EmployeeService;

  public title: string = "Employee Angular"; 
  
  public id: number;
  public firstName: string = "";
  public lastName: string = "";
  public genderType: string ="";
  public companyId: number;
  

  public employees: Employee[]=[];  
  public editMode : boolean = false;

  constructor(employeeService: EmployeeService){
    this.employeeService = employeeService;
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employeesFromApi) =>{
      this.employees = employeesFromApi;
  })
  }

  public addEmployee() : void {
    var newEmployee: Employee = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      genderType: this.genderType,
      companyId: this.companyId    
    }  
    this.employeeService.addEmployee(newEmployee).subscribe(() => {
     this.employees.push(newEmployee);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(x => x.id != id);
    });
  }

 public updateEmployee(): void {
    var updateEmployee: Employee = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      genderType: this.genderType,
      companyId: this.companyId 
    }
    this.employeeService.updateEmployee(updateEmployee).subscribe((updtEmployee) => {
      let index = this.employees.map(e => e.id).indexOf(updtEmployee.id);
      this.employees[index] = updtEmployee;      
     });
  }

  public sendUpdatedEmployee (){
    var updatedEmployee: Employee = {
      id: this.id,
      firstName : this.firstName,
      lastName : this.lastName,
      genderType : this.genderType,
      companyId : this.companyId
    }
    this.employeeService.updateEmployee(updatedEmployee).subscribe(() =>{
      for (let i = 0; i < this.employees.length; i++) {
        const emp = this.employees[i];
        if (emp.id == updatedEmployee.id) {
          emp.firstName = updatedEmployee.firstName;
          emp.lastName = updatedEmployee.lastName;          
          emp.genderType = updatedEmployee.genderType;          
          emp.companyId = updatedEmployee.companyId;
          return;          
        }
        
      }      
    })
    this.editMode = false;
}
}
