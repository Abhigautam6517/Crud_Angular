import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'crud_angular';

  employeeForm: FormGroup = new FormGroup({});

  employeeObj:EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[]=[];

  constructor() {
    this.createForm();
    debugger;
  
    if (typeof window !== 'undefined' && window.localStorage) {
      const olddata = localStorage.getItem('EmpData');
      if (olddata != null) {
        const parseData = JSON.parse(olddata);
        this.employeeList = parseData;
      }
    }
  }
  

  createForm(){
    this.employeeForm = new FormGroup({
      empId:new FormControl(this.employeeObj.empId),
      name:new FormControl(this.employeeObj.name,[Validators.required]),
      emailId:new FormControl(this.employeeObj.emailId),
      contactNo:new FormControl(this.employeeObj.contactNo),
      state:new FormControl(this.employeeObj.state),
      city:new FormControl(this.employeeObj.city),
      pincode:new FormControl(this.employeeObj.pincode, [Validators.required,Validators.minLength(6)]),
      address:new FormControl(this.employeeObj.address),
    })
  }

  onSave(){
    debugger;
    const olddata = localStorage.getItem('EmpData');
    if(olddata!=null){
      const parseData = JSON.parse(olddata);
      this.employeeForm.controls['empId'].setValue(parseData.length+1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
      
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
  }
  onEdit(item:EmployeeModel){
    this.employeeObj=item;
    this.createForm();


  }
  onUpdate() {
    if (typeof window !== 'undefined') {
      const olddata = localStorage.getItem('EmpData');
      if (olddata != null) {
        let parseData = JSON.parse(olddata);
        
        // Find index of the employee to update
        const index = parseData.findIndex((emp: EmployeeModel) => emp.empId === this.employeeForm.value.empId);
        
        if (index !== -1) {
          parseData[index] = this.employeeForm.value;  // Update the employee record
          localStorage.setItem('EmpData', JSON.stringify(parseData));  // Save to storage
          alert('Employee updated successfully!');
          this.employeeList = parseData;  // Update local list
          this.employeeForm.reset();
        }
      }
    }
  }

  onDelete(id:number){
    const isDelete = confirm('Are you sure want to Delete');
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
    }
  }
  
}

