import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

//const baseUrl = 'https://www.letsridein.com/api/Assignment/'
const baseUrl = 'http://localhost:5000/api/'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) {

    }
    getSubCategories(mainCategoryId) {
        return this.httpClient.get(baseUrl+'GetSubCategories/'+mainCategoryId);
    }

    createOrder(order) {
        return this.httpClient.post<any[]>(baseUrl +'Order/PostOrder/' ,order);
    }
    getTechniciansByCategoryType(id) {
        return this.httpClient.get<any[]>(baseUrl +'User/GetTechniciansByCategoryType/' + id);
    }
    getOrderDetails(id) {
        return this.httpClient.get<any>(baseUrl +'Order/GetOrder/' + id);
    }
   
}
