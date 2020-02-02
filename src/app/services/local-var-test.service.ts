import { Injectable } from '@angular/core';
import { SprintModel } from '../model/SprintModel';

@Injectable({
  providedIn: 'root'
})
export class LocalVarTestService {

  allSprints: SprintModel[];
  formattedAllSprints: SprintModel[];


  constructor() {

    this.allSprints = [
      {
        id: 1,
        sprintnbr: 1,
        sprinttitle: "Local Var - Sprint 1",
        sprintgoals: ["All good"],
        sprintreview: ["Completed as expected", "Everything good"],
        days: [
          {
            sprintDay: 1,
            challengeDay: 1,
            date: "20200101",
            dayNotes: [
              "First day, here we go",
              "Add second comment"
            ]
          },
          {
            sprintDay: 2,
            challengeDay: 2,
            date: "20200102",
            dayNotes: [
              "Day two - still going strong",
              "Continuing momentum"
            ]
          }
        ]
      },
      {
        id: 2,
        sprintnbr: 2,
        sprinttitle: "Local Var - Sprint 2",
        sprintgoals: ["Test with days, but no sprint review"],
        days: [
          {
            sprintDay: 1,
            challengeDay: 11,
            date: "20200120",
            dayNotes: [
              "New sprint - same challenges",
              "Add second comment"
            ]
          }
        ]        
      },
      {
        id: 3,
        sprintnbr: 3,
        sprinttitle: "Local Var - Sprint 3",
        sprintgoals: ["Test with no days and no sprint review", "Max sprint - should open by default"]
      }      
    ]
  }

  getLocalVarAllSprints(): SprintModel[] {
    var maxSprintNbr;
    let sprintNbrs = [];

    this.formattedAllSprints = [];

    this.allSprints.map((snbr) => (
      sprintNbrs.push(snbr.sprintnbr)
    ))

    console.log('numbers in sprintNbrs: ' + sprintNbrs.length);

    maxSprintNbr = sprintNbrs.reduce(function (x, y) {
      return Math.max(x, y);
    })

    console.log('maxSprintNbr: ' + maxSprintNbr);

    for (var s of this.allSprints) {

      // let tempSprint: SprintModel;

      // tempSprint = {
      //   id : s.id,
      //   sprintnbr : s.sprintnbr,
      //   sprinttitle : s.sprinttitle
      // };

      // tempSprint.sprintgoals = {...s.sprintgoals};
      // tempSprint.sprintreview = {...s.sprintreview};
      // tempSprint.days = {...s.days};

      if (s.sprintnbr === maxSprintNbr) {
        s.showSprintDetails = true;
      } else {
        s.showSprintDetails = false;
      }

      this.formattedAllSprints.push(s);
    }

    this.formattedAllSprints.sort(function (a, b) {
      return b.sprintnbr - a.sprintnbr;
    })

    console.log('formattedAllSprints');
    console.log(this.formattedAllSprints);

    return this.formattedAllSprints;
  }

}
