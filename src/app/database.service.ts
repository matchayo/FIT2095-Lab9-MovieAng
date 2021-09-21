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

  // Add or create a movie
  createMovie(newMovie: object) {
    let pathName = "/movies";
    return this.http.post(pathName, newMovie, httpOptions);
  }

  // Delete an movie by title
  deleteMovie(title: string) {
    let pathName = "/movies/" + title;
    return this.http.delete(pathName, httpOptions);
  }

  // Delete all movies produced between aYear1 and aYear2
  deleteMovies(aYear1: number, aYear2: number) {
    let pathName = "/movies/" + aYear1 +"/" + aYear2;
    return this.http.delete(pathName, httpOptions);
  }
  
  // Get all movies
  getMovies() {
    let pathName = "/movies";
    return this.http.get(pathName);
  }
  
  // Get an actor by id
  addActorToMovie(id: string, actor: object) {
    let pathName = "/movies/" + id + "/actors";
    return this.http.put(pathName, actor, httpOptions);
  }
}
