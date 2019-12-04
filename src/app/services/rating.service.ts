import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = 'https://www.letsridein.com/api/Ratings/'
const createRate = 'InsertNewRate/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class RatingService {

  constructor(private http: HttpClient) {
  }

  createRate(rate, ratedUser) {
    return this.http.post(baseUrl + createRate + "?ratedUser=" + ratedUser, JSON.stringify(rate), httpOptions);
  }
}
