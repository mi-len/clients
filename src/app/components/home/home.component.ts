import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ClientModel } from '../../models/client.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns = ["firstName", "middleName", "lastName", "gender", "bDate", "age", "edit", "delete"]
  dataSource = new MatTableDataSource<ClientModel> ()  
  allData
  menCount : number
  womenCount : number

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

constructor( 
  private dataService : DataService,
  private toastr : ToastrService ) { }
  
ngOnInit() {
  this.dataService.getAllClients().subscribe(data => {
    this.allData = data
    this.dataSource.data = this.allData
    this.getStats(data)
  })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
   }

  getAge(d) {
    var today = new Date();
    var birthDate = new Date(d);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
  }

  doFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  removeClient(id) {
    this.dataService.deleteClient(id).subscribe(data => {
      // console.log(data)
      this.ngOnInit()
      this.toastr.success('Client successfuly removed!', 'Success!')
    })
  }

  getStats(data) {
    this.menCount = data.reduce((a, c) => c.gender === 'man' ? ++a : a, 0)
    this.womenCount = data.reduce((a, c) => c.gender === 'woman' ? ++a : a, 0)
  }

}
