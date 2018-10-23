import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from '../../models/client.model';
import { DataService } from '../../services/data.service';

export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  client
  public clientId : string;
  model : ClientModel;

  genders: Gender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'}
  ];

  constructor(
    private dataService : DataService, 
    private router : Router, 
    private route : ActivatedRoute,
    private toastr : ToastrService) {
      this.clientId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.dataService.getClient(this.clientId).subscribe(data => {
      this.client = data
      this.model = this.client
    })
  }

  editClient() {
    this.dataService.editClient(this.clientId, this.model)
      .subscribe(
        data => {
          this.router.navigate(['/home'])
          this.toastr.success('Item successfuly edited!', 'Success!')
      })
  }

}
