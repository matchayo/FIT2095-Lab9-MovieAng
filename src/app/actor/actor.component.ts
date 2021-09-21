import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  section: number = 1;
  actorsDB: any[] = [];

  name: string = "";
  bYear: number = 0;
  actorId: string = "";
  
  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;
  actor: object = {};
  movieId: string = "";

  aTitle: string = "";
  aYear1: number = 0;
  aYear2: number = 0;

  constructor(private dbService: DatabaseService) { }

  // Get all actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  // Add or save an actor
  onSaveActor() {
    let newActor = {
      name: this.name,
      bYear: this.bYear
    };

    this.dbService.createActor(newActor).subscribe((result) => {
      this.changeSection(1);
      this.onGetActors();
    });
  }

  // Select the actor to update
  onSelectUpdate(item: any) {
    this.name = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  // Update an actor
  onUpdateActor() {
    let actor = {
      name: this.name,
      bYear: this.bYear,
    };

    this.dbService.updateActor(this.actorId, actor).subscribe((result: any) => {
      this.changeSection(1);
      this.onGetActors();
    });
  }

  // Delete an actor
  onDeleteActor(item: any) {
    this.dbService.deleteActor(item._id).subscribe((result: any) => {
      this.changeSection(1);
      this.onGetActors();
    });
  }

  // Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
      console.log(data);
    });
  }

  // Add or save a movie
  onSaveMovie() {
    let newMovie = {
      title: this.title,
      year: this.year
    };

    this.dbService.createMovie(newMovie).subscribe((result: any) => {
      this.changeSection(5);
      this.onGetMovies();
    });
  }

  // Delete a movie
  onDeleteMovie() {
    this.dbService.deleteMovie(this.aTitle).subscribe((result: any) => {
      this.changeSection(5);
      this.onGetMovies();
    });
  }
  
  // Delete movies between two years
  onDeleteMoviesBetweenYears() {
    this.dbService.deleteMovies(this.aYear1, this.aYear2).subscribe((result: any) => {
      this.changeSection(5);
      this.onGetMovies();
    });
  }

  // Select actor to add
  onSelectActor(anActor: any) {
    this.actor = anActor;
  }
  
  // Select movie
  onSelectMovie(aMovie: any) {
    this.movieId = aMovie._id;
  }
  
  // Add selected actor to selected movie
  onAddActorToMovie() {
    this.dbService.addActorToMovie(this.movieId, this.actor).subscribe((result: any) => {
      this.changeSection(5);
      this.onGetMovies();
    });
  }

  // A lifecycle callback function will be invoked with the component get initialized by Angular
  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  // Change the section
  changeSection(sectionId: number) {
    this.resetValues();
    this.section = sectionId;
  }

  // Reset values
  resetValues() {
    this.name = "";
    this.bYear = 0;
    this.actorId = "";
  
    this.title = "";
    this.year = 0;
    this.actor = {};
    this.movieId = "";
  
    this.aTitle = "";
    this.aYear1 = 0;
    this.aYear2 = 0;
  }
}
