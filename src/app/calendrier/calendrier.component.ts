
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { PlaningService } from '../service/planing.service';
import { Router } from '@angular/router';
import { Event } from '../type/types';
import Swal from 'sweetalert2';



const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-calendrier',
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})




export class CalendrierComponent implements OnInit {



event!:Event[]
events: CalendarEvent[]=[]
role=sessionStorage.getItem("role");
userObject!:any;


  @ViewChild('modalContent', { static: true }) 
  modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal,private planingService: PlaningService,private router: Router) { }







  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.router.navigate(['/listDisponibility'])
    /*this.events = [
      ...this.events,
      {
        title: 'New event',
        start: new Date("2023-01-03T13:45:30"),
        end: new Date("2023-01-03T14:45:30"),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];*/
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }





  ngOnInit(): void {

    const  user=sessionStorage.getItem('user');
    if (user  ) {
      this.userObject= JSON.parse(user)

      if (this.role==='student') {

        this.planingService.getEventBySpeciality(this.userObject.speciality.specialityId).subscribe(event=>{
          event.forEach(e=>{
            console.log(new Date(e.day+" "+e.timeD))
            this.events = [
              ...this.events,
              {
                start: new Date(e.day+" "+e.timeD),
                end: new Date(e.day+" "+e.timeF),
                title: e.title,
                color: colors['red'],
                actions: this.actions,
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
              },
            ];
          })
              },err=>console.log(err))


      }else if((this.role==='teacher')){

        this.planingService.getEventByTeacher(this.userObject.teacherId).subscribe(event=>{
          event.forEach(e=>{
            console.log(new Date(e.day+" "+e.timeD))
            this.events = [
              ...this.events,
              {
                start: new Date(e.day+" "+e.timeD),
                end: new Date(e.day+" "+e.timeF),
                title: e.title,
                color: colors['red'],
                actions: this.actions,
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
              },
            ];
          })
              },err=>console.log(err))

      }else{
        this.planingService.getEvents().subscribe(event=>{
     
          this.event=event
    
    event.forEach(e=>{
      console.log(new Date(e.day+" "+e.timeD))
      this.events = [
        ...this.events,
        {
          start: new Date(e.day+" "+e.timeD),
          end: new Date(e.day+" "+e.timeF),
          title: e.title,
          color: colors['red'],
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        },
      ];
    })
        },err=>console.log(err))
      }

     
      

    }else {this.router.navigate(['/login']);
    Swal.fire('erreur', 'veuillez vous connecter', 'error');
   }






  }




}
