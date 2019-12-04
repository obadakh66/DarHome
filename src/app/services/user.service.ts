import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

//const baseUrl = 'https://www.letsridein.com/api/Users/'
const baseUrl = 'https://localhost:5001/api/Users/'

const getUserRoute = 'GetUser/';
const updateUserRoute = 'UpdateUserInfo';
const signupRoute = 'SignUp';
const signupSocialRoute = 'SocialMediaSignup';
const updatePassRoute = 'UpdatePassword';

const getUsersRoute = 'GetAllUsers';
const resetPassRoute = 'ResetPassword';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }
  getUserDetialsById(id) {
    return this.httpClient.get(baseUrl + getUserRoute + id);
  }

  getParentChildrenById(id) {
    return this.httpClient.get(baseUrl +'GetParentChildren/'+ id);
  }
  getChildByParentId(id) {
    return this.httpClient.get(baseUrl +'GetChildByParentId/'+ id);
  }
  getChildById(id) {
    return this.httpClient.get(baseUrl +'GetChildById/'+ id);
  }
  changeChildBalance(childId,newBalance) {
    return this.httpClient.get(baseUrl +'ChangeChildBalance/'+ childId+"/"+newBalance);
  } 
  getParentById(id) {
    return this.httpClient.get(baseUrl +'GetParentById/'+ id);
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
    return this.httpClient.get(baseUrl + "Login/"+user.phoneNumber+"/"+user.password)
  }
  saveTechnicianCredntials(id,file1, file2)
  {
    const formData: FormData = new FormData();
    const formData2: FormData = new FormData();
    formData.append('File', file1);
    formData2.append('File2', file2);
    console.log(formData);
    return this.httpClient.post(baseUrl + 'SignUpFilesForTechnician/'  ,{ id,formData,formData2});
  }

  // dreams functions --------------------------------------------------------------------------
  createDream(dream) {
    return this.httpClient.post<number>(baseUrl + 'CreateDream', JSON.stringify(dream), httpOptions);
  }
  getDreamsByChildid(childId) {
    return this.httpClient.get<any[]>(baseUrl + 'GetDreamsByChildId/'+childId);
  }

  saveDreamImageUrl(childId,dreamId, file)
  {
    const formData: FormData = new FormData();
    formData.append('File', file);
    console.log(formData);
    return this.httpClient.post(baseUrl + 'UploadDreamImage/'  + childId+'/'+dreamId, formData);
  }
}
