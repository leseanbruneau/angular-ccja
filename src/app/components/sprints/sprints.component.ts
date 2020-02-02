import { Component, OnInit } from '@angular/core';
import { SprintModel } from '../../model/SprintModel';

/* Test with local variable data */
import { LocalVarTestService } from '../../services/local-var-test.service';

/* REST API data */
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {

  // sourceData - where data is pulled from; number value
  //  1 - Local Variable
  //  2 - REST API using a localhost endpoint
  //  3 - REST API using a remote endpoint
  sourceData: number = 1;

  unformattedSprintList: SprintModel[];
  sprintsList: SprintModel[];


  constructor(private localVarTestService: LocalVarTestService, 
    private restApiService: RestApiService) { }

  ngOnInit() {

    switch(this.sourceData) {
      case 1: {
        /* Test with local variable data */
        this.sprintsList = this.localVarTestService.getLocalVarAllSprints();
        break;
      }
      case 2: {
        /* Use localhost endpoint to serve REST API */
        this.getLocalhostData();
        break;
      }
      case 3: {
        /* Use remote endpoint to serve REST API */
        this.getRemoteData();
        break;
      }
      default: {
        /* Invalid number assigned - Test with local variable data */
        this.sprintsList = this.localVarTestService.getLocalVarAllSprints();
        break;
      }
    }
  }

  getLocalhostData() {
    var maxSprintNbr;
    let sprintNbrs = [];
    this.unformattedSprintList = [];
    this.sprintsList = [];


    // Go to REST API to get data and format for display
    this.restApiService.getLocalhostApiData().subscribe(resp => {
      for (const data of resp.body) {
        this.unformattedSprintList.push(data);
      }
      
      console.log('unformattedSprintList');
      console.log(this.unformattedSprintList);

      // create list of Sprint numbers
      this.unformattedSprintList.map((snbr) => (
        sprintNbrs.push(snbr.sprintnbr)
      ))
  
      console.log('numbers in sprintNbrs: ' + sprintNbrs.length);
  
      // Find max (latest) Sprint number from list
      maxSprintNbr = sprintNbrs.reduce(function(x,y) {
        return Math.max(x,y);
      })
  
      console.log('maxSprintNbr: ' + maxSprintNbr);
  
      // format individual Sprint data for display
      // 1.  max (latest) Sprint will show details on page load
      //     all other sprints will hide details on page load
      // 2.  If there are days in the Sprint - sort days in decending order
      // 3.  Add data formatted sprint to SprintList
      for (var s of this.unformattedSprintList ) {
  
        if(s.sprintnbr === maxSprintNbr) {
          s.showSprintDetails = true;
        } else {
          s.showSprintDetails = false;
        }
        
        if ( s.days ) {
          let sDays = s.days;
  
          sDays.sort(function(a,b) {
            return b.challengeDay - a.challengeDay
          })
  
          s.days = sDays;
        }

        this.sprintsList.push(s);
      }

      // Sort Sprints in decending order - latest (current) Sprint at top of list
      this.sprintsList.sort(function(a,b) {
        return b.sprintnbr - a.sprintnbr;
      })
  
      console.log('sprintList');
      console.log(this.sprintsList);

    })
  }

  getRemoteData() {
    var maxSprintNbr;
    let sprintNbrs = [];
    this.unformattedSprintList = [];
    this.sprintsList = [];


    // Got to REST API to get data and format for display
    this.restApiService.getRemoteEndpointApiData().subscribe(resp => {
      for (const data of resp.body) {
        this.unformattedSprintList.push(data);
      }
      
      console.log('unformattedSprintList');
      console.log(this.unformattedSprintList);

      this.unformattedSprintList.map((snbr) => (
        sprintNbrs.push(snbr.sprintnbr)
      ))
  
      console.log('numbers in sprintNbrs: ' + sprintNbrs.length);
  
      maxSprintNbr = sprintNbrs.reduce(function(x,y) {
        return Math.max(x,y);
      })
  
      console.log('maxSprintNbr: ' + maxSprintNbr);
  
      for (var s of this.unformattedSprintList ) {
  
        if(s.sprintnbr === maxSprintNbr) {
          s.showSprintDetails = true;
        } else {
          s.showSprintDetails = false;
        }
        
        if ( s.days ) {
          let sDays = s.days;
  
          sDays.sort(function(a,b) {
            return b.challengeDay - a.challengeDay
          })
  
          s.days = sDays;
        }

        this.sprintsList.push(s);
      }

  
      this.sprintsList.sort(function(a,b) {
        return b.sprintnbr - a.sprintnbr;
      })
  
      console.log('sprintList');
      console.log(this.sprintsList);

    })
  }

}
