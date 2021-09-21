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

  // A lifecycle callback function will be invoked with the component get initialized by Angular
  ngOnInit(): void {
    this.onGetActors();
  }

  changeSection(sectionId: number) {
    this.section = sectionId;
  }

  resetValues() {
    this.name = "";
    this.bYear = 0;
    this.actorId = "";
  }
}
