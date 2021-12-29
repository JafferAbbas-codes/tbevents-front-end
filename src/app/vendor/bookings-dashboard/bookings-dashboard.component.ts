import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-bookings-dashboard',
  templateUrl: './bookings-dashboard.component.html',
  styleUrls: ['./bookings-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class BookingsDashboardComponent implements OnInit {
  columnsToDisplay: string[] = [
    'No.',
    'Venue',
    'Date',
    'Capacity',
    'Budget',
    'Status',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // columnsToDisplay = [''No.'', 'name', 'Venue', 'Date', 'budget'];
  expandedElement: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}
}

export interface PeriodicElement {
  'No.': number;
  Venue: string;
  Date: string;
  Capacity: number;
  Budget: number;
  description: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    'No.': 1,
    Venue: 'Nighet Palace',
    Date: 'H',
    Budget: 23000,
    Capacity: 300,
    description: `Hydrogen is a chemical element with Date H and atomic number 1. With a standard
        atomic Venue of 1.008, hydrogen is the lightest element on the periodic table.`,
    Status: 'Pending',
  },
  {
    'No.': 2,
    Venue: 'Lily Banquet',
    Date: 'He',
    Budget: 23000,
    Capacity: 300,

    description: `Helium is a chemical element with Date He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    Status: 'Pending',
  },
  {
    'No.': 3,
    Venue: 'Clifton Banquet',
    Date: 'Li',
    Budget: 23000,
    Capacity: 300,

    description: `Lithium is a chemical element with Date Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    Status: 'Pending',
  },
  {
    'No.': 4,
    Venue: 'Casamento',
    Date: 'Be',
    Budget: 23000,
    Capacity: 300,
    description: `Beryllium is a chemical element with Date Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
    Status: 'Pending',
  },
  {
    'No.': 5,
    Venue: 'Ayan club',
    Date: 'B',
    Budget: 23000,
    Capacity: 300,
    description: `Boron is a chemical element with Date B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    Status: 'Pending',
  },
  {
    'No.': 6,
    Venue: 'Rex Banquet',
    Date: 'C',
    Budget: 23000,
    Capacity: 300,
    description: `Carbon is a chemical element with Date C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
    Status: 'Pending',
  },
  {
    'No.': 7,
    Venue: 'Saima Banquet',
    Date: 'N',
    Budget: 23000,
    Capacity: 300,
    description: `Nitrogen is a chemical element with Date N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
    Status: 'Pending',
  },
  {
    'No.': 8,
    Venue: 'Diamond Palace',
    Date: 'O',
    Budget: 23000,
    Capacity: 300,
    description: `Oxygen is a chemical element with Date O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
    Status: 'Pending',
  },
  {
    'No.': 9,
    Venue: 'Mubeen banquet',
    Date: 'F',
    Budget: 23000,
    Capacity: 300,
    description: `Fluorine is a chemical element with Date F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
    Status: 'Pending',
  },
  {
    'No.': 10,
    Venue: 'Kulsoom Banquet',
    Date: 'Ne',
    Budget: 23000,
    Capacity: 300,
    description: `Neon is a chemical element with Date Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
    Status: 'Pending',
  },
];
