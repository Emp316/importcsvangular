import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {
  private endPoint = "csv";
  studentData: any;

  constructor(@Inject('API_URL') private baseUrl: string,
    private httpClient: HttpClient) { }

  submit(csvFile: any) {
   // console.log(csvFile)
    return this.httpClient.post(`${this.baseUrl}${this.endPoint}`, csvFile);
  }

  getStudents() {
    var list = this.httpClient.get(`${this.baseUrl}${this.endPoint}`);
    return list;
  }

  public getStudentById(JobId: string) {
    return this.httpClient.get<any>(`${this.baseUrl}${this.endPoint}/${JobId}`);
  }

}
