import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const baseUrl = 'https://darhome.azurewebsites.net/api/Users/'

const getUserRoute = 'GetUser/';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }
  getUserDetialsById(id) {
    console.log("user")
    return this.httpClient.get(baseUrl + getUserRoute + id);
  }
  getTechnicianDetialsById(id) {
    console.log("tech")
    return this.httpClient.get(baseUrl + 'GetTechnicianId/' + id);
  }

  createUser(user) {
    console.log(user)
    return this.httpClient.post(baseUrl + 'SignUpForUser/', user);
  }
  createTechnician(user) {
    console.log(user)
    return this.httpClient.post<any>(baseUrl + 'SignUpForTechnician/', user);
  }
  
  login(user) {
    return this.httpClient.get<any>(baseUrl + "Login/"+user.phoneNumber+"/"+user.password)
  }
  saveTechnicianCredntials(id,file1, file2)
  {
    const formData: FormData = new FormData();
    //const formData2: FormData = new FormData();
    formData.append('TechnicianId', id);
    formData.append('IdFile', file1);
    formData.append('CertificateFile', file2);
    console.log(formData);
    return this.httpClient.post(baseUrl + 'SignUpFilesForTechnician/'  ,formData);
  }
  createRate(rate) {
    console.log(rate)
    return this.httpClient.post("https://darhome.azurewebsites.net/api/Rates/PostRate/",rate);
  }
  
}
