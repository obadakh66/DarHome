import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

//const baseUrl = 'https://www.letsridein.com/api/Assignment/'
const baseUrl = 'https://localhost:5001/api/'

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
        return this.httpClient.get(baseUrl + 'Orders/GetSubCategoryByCategoryId/' + mainCategoryId);
    } 

    createOrder(order) {
        return this.httpClient.post<any>(baseUrl + 'Orders/PostOrder/', order);
    }
    uploadOrderImage(id, file) {
        const formData: FormData = new FormData();
        formData.append('File', file);
        return this.httpClient.post<any[]>(baseUrl + 'Orders/AddOrderImage/' + id, formData);
    }
    getTechniciansByCategoryType(id) {
        return this.httpClient.get<any[]>(baseUrl + 'Users/GetTechniciansByCategoryType/' + id);
    }
    getOrderDetails(id) {
        return this.httpClient.get<any>(baseUrl + 'Orders/GetOrder/' + id);
    }
    acceptOrder(id){
        return this.httpClient.get<any>(baseUrl + 'Orders/AcceptOrder/' + id);
    }
    rejectOrder(id){
        return this.httpClient.get<any>(baseUrl + 'Orders/RejectOrder/' + id);
    }
    getOrdersForTechnician(id){
        return this.httpClient.get<any>(baseUrl + 'Orders/GetOrderForTechnician/' + id);
    }
 
}
