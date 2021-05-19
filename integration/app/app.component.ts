import { Component, OnInit } from '@angular/core';
import { IdleWarningStates } from './ts-idle/enums/idle-warning.states.enum';
import { IdleService } from './ts-idle/services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _idleService: IdleService) { }
  idleTimer = true;

  title = 'IdleTimeout';

  ngOnInit(): void {
    this.timerSubscribe();
  }

  resubscribe(): void {
    this.idleTimer = true;
    this.timerSubscribe();
  }

  private timerSubscribe(): void {
    this._idleService
      .idleStateChanged()
      .subscribe(
        val => {
          console.log(IdleWarningStates[val]);
          if (val === IdleWarningStates.SecondaryTimerExpired) {
            this._idleService.stopTimer();
            this.idleTimer = false;
          }
        }
      );
  }
}

// TODO:
// THEN FOLLOW
// https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e
// THEN FOLLOW (from: 5mins)
// https://fireship.io/lessons/build-an-angular-library-with-ngpackagr/
