import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-site',
  templateUrl: './add-event-site.component.html',
  styleUrls: ['./add-event-site.component.scss']
})
export class AddEventSiteComponent {
  eventForm !: FormGroup;


  ngOnInit(): void {
    this.eventForm = new FormGroup({
      eventName: new FormControl('', Validators.required),
      participants: new FormControl(50, [Validators.required, Validators.min(1)]),
      isPaid: new FormControl('no'),
      isOnline: new FormControl('no'),
      isReservationRequired: new FormControl('no'),
      ageRequirement: new FormControl('all'),
      startTime: new FormControl('', Validators.required), // Consider using Validators.pattern for time format
      endTime: new FormControl('', Validators.required),   // Consider using Validators.pattern for time format
      description: new FormControl('')  
    });
  }

  onSubmit(): void {
      console.log(this.eventForm.value);
  }
}