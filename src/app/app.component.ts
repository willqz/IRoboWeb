import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GlobalsModule } from 'src/shared/globals/globals.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

const urlMars = `${environment.baseUrl}${GlobalsModule.MARS}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;


  positionGraus = 0;
  positionDescription = '';
  positionX = 0;
  positionY = 0;

  // POINTS MAPS
  p00 = false;
  p01 = false;
  p02 = false;
  p03 = false;
  p04 = false;
  p10 = false;
  p11 = false;
  p12 = false;
  p13 = false;
  p14 = false;
  p20 = false;
  p21 = false;
  p22 = false;
  p23 = false;
  p24 = false;
  p30 = false;
  p31 = false;
  p32 = false;
  p33 = false;
  p34 = false;
  p40 = false;
  p41 = false;
  p42 = false;
  p43 = false;
  p44 = false;

  constructor(
    public formBuilder: FormBuilder,
    private httpCli: HttpClient,
  ) { }

  ngOnInit() {
    this.p00 = true;
    this.positionGraus = 0;
    this.positionDescription = 'North';

    this.form = this.formBuilder.group({
      command: ['', [Validators.required, Validators.maxLength(100) ]]
    });
  }

  onSubmit() {
    this.getCoordsXY();
  }

  getCoordsXY() {
    this.positionGraus = 0;
    const url = `${urlMars}${this.form.value.command}`;
    this.httpCli.get<any>(url).subscribe(data => {
      const coords = data.coords.replace('(', '').replace(')', '').split(',');
      this.positionX = parseInt(coords[0], 0);
      this.positionY = parseInt(coords[1], 0);
      this.Direction((coords[2]));

      this.SetPointBot();

      this.form.reset();
    }, error => {
      alert(error.error);
   });
  }

  clearBot() {
    this.p00 = false;
    this.p01 = false;
    this.p02 = false;
    this.p03 = false;
    this.p04 = false;
    this.p10 = false;
    this.p11 = false;
    this.p12 = false;
    this.p13 = false;
    this.p14 = false;
    this.p20 = false;
    this.p21 = false;
    this.p22 = false;
    this.p23 = false;
    this.p24 = false;
    this.p30 = false;
    this.p31 = false;
    this.p32 = false;
    this.p33 = false;
    this.p34 = false;
    this.p40 = false;
    this.p41 = false;
    this.p42 = false;
    this.p43 = false;
    this.p44 = false;
  }

  SetPointBot() {
    this.clearBot();
    const point = this.positionX + '' + this.positionY;

    switch (point) {
      case '00':
        this.p00 = true;
        break;
      case '01':
        this.p01 = true;
        break;
      case '02':
        this.p02 = true;
        break;
      case '03':
        this.p03 = true;
        break;
      case '04':
        this.p04 = true;
        break;

      case '10':
        this.p10 = true;
        break;
      case '11':
        this.p11 = true;
        break;
      case '12':
        this.p12 = true;
        break;
      case '13':
        this.p13 = true;
        break;
      case '14':
        this.p14 = true;
        break;

      case '20':
        this.p20 = true;
        break;
      case '21':
        this.p21 = true;
        break;
      case '22':
        this.p22 = true;
        break;
      case '23':
        this.p23 = true;
        break;
      case '24':
        this.p24 = true;
        break;

      case '30':
        this.p30 = true;
        break;
      case '31':
        this.p31 = true;
        break;
      case '32':
        this.p32 = true;
        break;
      case '33':
        this.p33 = true;
        break;
      case '34':
        this.p34 = true;
        break;

      case '40':
        this.p40 = true;
        break;
      case '41':
        this.p41 = true;
        break;
      case '42':
        this.p42 = true;
        break;
      case '43':
        this.p43 = true;
        break;
      case '44':
        this.p44 = true;
        break;
      default:
        break;
    }
  }

  Direction(param: string): number {
    if (param === 'L') {
      if (this.positionGraus === 0) {
        this.positionGraus = 360;
      }

      this.positionGraus = this.positionGraus - 90;
    } else {
      this.positionGraus = this.positionGraus + 90;

      if (this.positionGraus === 360) {
        this.positionGraus = 0;
      }
    }

    this.GetDescriptionDirection();

    return this.positionGraus;
  }

  GetDescriptionDirection() {
      switch (this.positionGraus)
      {
        case 0:
          this.positionDescription = 'North';
          break;
        case 90:
          this.positionDescription =  'West';
          break;
        case 180:
          this.positionDescription =  'South';
          break;
        case 270:
          this.positionDescription =  'Lest';
          break;
      }
  }
}
