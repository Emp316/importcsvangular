import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { CsvServiceService } from './Service/csv-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndCsvFile';
  list: any;
  ShowStudent: boolean = false;
  convertedJson!: string;

  constructor(public service: CsvServiceService) {}

  ngOnInit(): void {
    this.getJobList();
  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let studentCsv = XLSX.read(binaryData, { type: 'binary' });
      studentCsv.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(studentCsv.Sheets[sheet])
        this.service.studentData = data;
        this.convertedJson = JSON.stringify(data,undefined,4);
      })

    }
  }

  onSubmit() {
    var students;
    let studentObj = {};
    students = this.service.studentData.map((x: any) => x)
    studentObj = { students: students }
    console.log(studentObj);
    this.service.submit(studentObj).subscribe((x: any) => console.log(x));
    this.ShowStudent = false;
  }


  getJobList() {
    this.service.getStudents().subscribe((result: any) => {
      this.list = result;
    });
  }

  ShowStudents() {
    this.ShowStudent = true;
  }
}
