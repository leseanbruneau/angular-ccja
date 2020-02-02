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
  //  2 - REST API using a localhost server
  //  3 - REST API using a remote server
  sourceData: number = 1;

  sprintsList: SprintModel[];
  mSprintList: any = [];


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
    this.mSprintList = [];
    this.sprintsList = [];


    // Got to REST API to get data and format for display
    this.restApiService.getLocalhostApiData().subscribe(resp => {
      for (const data of resp.body) {
        this.mSprintList.push(data);
      }
      
      console.log('unformattedapiSprintList');
      console.log(this.mSprintList);

      this.mSprintList.map((snbr) => (
        sprintNbrs.push(snbr.sprintnbr)
      ))
  
      console.log('numbers in sprintNbrs: ' + sprintNbrs.length);
  
      maxSprintNbr = sprintNbrs.reduce(function(x,y) {
        return Math.max(x,y);
      })
  
      console.log('maxSprintNbr: ' + maxSprintNbr);
  
      for (var s of this.mSprintList ) {
  
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

  getRemoteData() {
    var maxSprintNbr;
    let sprintNbrs = [];
    this.mSprintList = [];
    this.sprintsList = [];


    // Got to REST API to get data and format for display
    this.restApiService.getRemoteEndpointApiData().subscribe(resp => {
      for (const data of resp.body) {
        this.mSprintList.push(data);
      }
      
      console.log('unformattedapiSprintList');
      console.log(this.mSprintList);

      this.mSprintList.map((snbr) => (
        sprintNbrs.push(snbr.sprintnbr)
      ))
  
      console.log('numbers in sprintNbrs: ' + sprintNbrs.length);
  
      maxSprintNbr = sprintNbrs.reduce(function(x,y) {
        return Math.max(x,y);
      })
  
      console.log('maxSprintNbr: ' + maxSprintNbr);
  
      for (var s of this.mSprintList ) {
  
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
