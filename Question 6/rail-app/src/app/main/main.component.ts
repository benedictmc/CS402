import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rail } from '../class/rail';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  railData: Array<Rail> 
  dataBoolean = false
  stationFocus = ''
  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


  stations = ['Athy', 'Sallins', 'Rushbrooke', 'Clara', 'Castleknock', 'Wicklow', 'Drumcondra', 'Monasterevin', 'Cloughjordan', 'Nenagh', 'Howth Junction', 'Salthill', 'Curragh', 'Lisburn', 'Clonsilla', 'Bray', 'Tralee', 'Bayside', 'Skerries', 'PARK WEST', 'Sandycove', 'Craughwell', 'Ennis', 'LittleIsland', 'Navan Road Parkway', 'Clonmel', 'Sixmilebridge', 'Castleconnell', 'Castlerea', 'Dunboyne', 'Ballymote', 'Booterstown', 'Hansfield', 'Clondalkin', 'Rathdrum', 'Charleville', 'Ballyhaunis', 'Laytown', 'Westport', 'CENTRAL JUNCTION', 'Newry', 'Sydney Parade', 'Farranfore', 'Balbriggan', 'Roscommon', 'Portadown', 'Carrick on Suir', 'Portlaoise', 'Dromod', 'Sutton', 'Birdhill', 'Woodlawn', 'Dalkey', 'Campile', 'Cherry Orchard', 'Grand Canal Dock', 'Mallow', 'Rathmore', 'Lansdowne Road', 'Killester', 'MOIRA', 'Athlone', 'Kilbarrack', 'Carlow', 'Attymon', 'Ballina', 'Midleton', 'Athenry', 'Edgeworthstown', 'Cobh', 'Roscrea', 'Banteer', 'Leixlip (Confey)', 'Gorey', 'Carrigtwohill', 'Blackrock', 'Arklow', 'Greystones', 'Boyle', 'Sandymount', 'Castlebar', 'CITY JUNCTION', 'Newbridge', 'Claremorris', 'Dublin Pearse', 'Galway', 'Lurgan', 'Collooney', 'Kildare', 'Muine Bheag', 'Tipperary', 'Drogheda', 'Oranmore', 'Donabate', 'Mullingar', 'Howth', 'Dublin Connolly', 'Rosslare Europort', 'Tullamore', 'Gormanston', 'Ashtown', 'Wellingtonbridge', 'Maynooth', 'Thurles', 'Raheny', 'Killiney', 'Rush and Lusk', 'Killarney', 'Carrick on Shannon', 'M3 Parkway', 'Cork', 'Rosslare Strand', 'Tara Street', 'Fota', 'Glenageary', 'Portarlington', 'Dundalk', 'Ballycullane', 'Sligo', 'Belfast Central', 'Thomastown', 'Broombridge', 'Longford', 'Harmonstown', 'Limerick', 'Millstreet', 'Cahir', 'Shankill', 'Foxford', 'Waterford', 'Ballybrophy', 'Adamstown', 'Dun Laoghaire', 'Clontarf Road', 'Kilcock', 'Templemore', 'Malahide', 'Kilcoole', 'Bridgetown', 'Woodbrook', 'Ballinasloe', 'Clongriffin', 'Docklands', 'DUNMURRAY', 'Enniscorthy', 'Carrigaloe', 'Limerick Junction', 'Coolmine', 'Leixlip (Louisa Bridge)', 'Manulla Junction', 'Dublin Heuston', 'Ardrahan', 'Kilkenny', 'Enfield', 'Hazelhatch', 'Portmarnock', 'Wexford', 'Glounthaune', 'Gort', 'Seapoint']

  constructor(private http: HttpClient) { }


  model: any;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.stations
        : this.stations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit() {
    // this.getRailData().subscribe(data => {
    //   this.railData = data
    //   if( data.length > 0)
    //     this.dataBoolean = true
    //   console.log(data)
    // })

    // $("#typeahead-focus").keyup(function(event) {
    //     if (event.keyCode === 13) {
    //         $("#typeahead-focus").click();
    //     }
    // });
    let self = this
    document.getElementById("typeahead-focus")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        self.yo(document.getElementById("typeahead-focus").value)
    }
  });
  }

  getRailData(code){
    let url = 'http://127.0.0.1:5000/data/'+code
    return this.http.get<Array<Rail>>(url)
  }



  yo(code){
    console.log('yo')
    console.log(code)
    this.stationFocus = code
    // let code = 'Bayside'
    this.getRailData(code).subscribe(data => {
      this.railData = data
      if( data.length > 0)
        this.dataBoolean = true
      console.log(data)
    })
  }
}
