import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { ClientModel } from '../../models/client.model';
import { Router } from '@angular/router';
// import { DatePipe, formatDate } from '../../../../node_modules/@angular/common';

export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  genders: Gender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'}
  ]
  model : ClientModel
  maxDate

  constructor( 
    private dataService : DataService,
    private router : Router ) {
      this.model = new ClientModel('', '', '', '','')
     }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
   }

  addClient() {
    this.dataService.add(this.model).subscribe(data => {
      this.router.navigate(['/home'])
    }, 
    err => {
     console.log(err['error']['description']);
    })
  }

}
