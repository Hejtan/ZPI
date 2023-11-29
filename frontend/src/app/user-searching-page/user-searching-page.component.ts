import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from '../models/event.model';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterSearchService } from '../filter-search.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-searching-page',
  templateUrl: './user-searching-page.component.html',
  styleUrls: ['./user-searching-page.component.scss']
})
export class UserSearchingPageComponent implements OnInit{
  roleClass: string = '';
  isAdmin: boolean = false;
  isUser: boolean = false ;
  filterForm: FormGroup;
  events: Event[] = [
    {
      id: 1,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: "https://picsum.photos/id/1/640/480"
    },
    {
      id: 2,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/101/640/480',
    }, {
      id: 3,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/201/640/480',
    }, {
      id: 4,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/301/640/480',
    }, {
      id: 5,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/401/640/480',
    },
    {
      id: 1,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/1/640/480',
    },
    {
      id: 2,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/101/640/480',
    }, {
      id: 3,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/201/640/480',
    }, {
      id: 4,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/301/640/480',
    }, {
      id: 5,
      name: "Music Concert",
      organizer: 123,
      categoryList: [],
      clientList: [],
      description: "A great evening of music",
      size: 200,
      localisation: "Downtown Auditorium",
      isFree : false,
      isReservationNecessary: true,
      ageGroup: "ADULT",
      startDate: "2023-12-01T19:00:00",
      endDate: "2023-12-01T23:00:00",
      eventStatus: "SCHEDULED",
      imageUrl: 'https://picsum.photos/id/401/640/480',
    },
  ];


  constructor(private router: Router,private eventService: EventService, public userService: UserService, private formBuilder: FormBuilder, private filterSearchService: FilterSearchService) {
    this.filterForm = this.formBuilder.group({
      historyczne: false,
      rezerwacja: "0",
      koszt: "0",
      wiek: "0",
      miejscaMin: null,
      miejscaMax: null,
    });
  }

  ngOnInit(): void {
    const filter = localStorage.getItem('filter');
    if(filter != null){
      this.filterForm.patchValue(JSON.parse(filter));
    }
    const user = this.userService.getCurrentUser();
    if(user){
      this.isAdmin = user.permissionLevel === 'MODERATOR' || user.permissionLevel === "ADMIN";
      this.isUser = (!this.isAdmin)
    }
    this.roleClass = user.permissionLevel === 'VERIFIED_USER' ? 'admin-header' : 'user-header';
  }

  applyFilters(){
    console.log(this.filterForm.value);
    localStorage.setItem('filter', JSON.stringify(this.filterForm.value));
    this.filterSearchService.sendToSearch();
  }

  showDetails(card: Event): void {
    this.eventService.setCurrentEvent(card);
    this.router.navigate(['/event-details', card.id]);
  }
}
