import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

// To specify the object type as JSON object
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  result: any; // What is this for?

  // Get all actors
  getActors() {
    let pathName = "/actors";
    return this.http.get(pathName);
  }
  
  // Get an actor by id
  getActor(id: string) {
    let pathName = "/actors/" + id;
    return this.http.get(pathName);
  }

  // Add or create an actor
  createActor(newActor: object) {
    let pathName = "/actors";
    return this.http.post(pathName, newActor, httpOptions);
  }

  // Update an actor's details
  updateActor(id: string, anActor: object) {
    let pathName = "/actors/" + id;
    return this.http.put(pathName, anActor, httpOptions);
  }

  // Delete an actor by id
  deleteActor(id: string) {
    let pathName = "/actors/" + id;
    return this.http.delete(pathName, httpOptions);
  }
}
