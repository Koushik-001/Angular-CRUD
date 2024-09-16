import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';  // Import HttpClient and HttpClientModule
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule,TableModule],  // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestAngular';
  showForm = false; // To control form visibility
  showTable=false;
  formData = {
    name: '',
    email: '',
    mobile: ''
  };
  allData: any = [];  // To store the API data

  constructor(private http: HttpClient) {}  // Inject HttpClient

  // Function to show the form
  showNewForm() {
    this.showForm = true;
  }

  // Function to handle form submission
  onSubmit() {
    console.log(this.formData);
    this.http.post('http://127.0.0.1:8000/insert',this.formData).subscribe((response)=>console.log("Successs",response),(error)=>console.log("Failure",error))
    this.clearForm();
    this.showAllData();
  }

  // Function to clear the form
  clearForm() {
    this.formData = { name: '', email: '', mobile: '' };
    this.showForm = false;
  }

  // Function to fetch all data from API
  showAllData() {
    this.showTable = true;
    this.http.get('http://127.0.0.1:8000/all').subscribe(
      (response) => {
        this.allData = response;
        console.log('All Data:', this.allData);
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data from the server. Please check if the server is running.');
      }
    );
  }
  

  deleteData() {
    console.log('Deleting data...');
  }

  deleteFun(data: any) {
    this.http.delete(`http://127.0.0.1:8000/${data._id}`).subscribe(
      (response) => {
        console.log("Deleted successfully", response);
        // Trigger onChange to update the table view
        // this.onChange(data._id, 'delete');
        this.showAllData();
      },
      (error) => {
        console.error("Failed to delete data", error);
        alert("Failed to delete the data. Please try again.");
      }
    );
  }
  
  // onChange(id: string, action: string) {
  //   if (action === 'delete') {
  //     this.allData = this.showAllData();
  //     console.log(`Item with ID ${id} deleted`);
  //   } else {
  //     console.log(`Action: ${action}, Item ID: ${id}`);
  //   }
  // }
  
}
