import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { ResturantData } from './resturant.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css']
})
export class ResturantDashComponent implements OnInit {

  formValue!: FormGroup;
  resturantModelObj: ResturantData = new ResturantData;
  allResturantData: any;
  showAdd!:boolean;
  showbtn!: boolean;
  


  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      resturantName: [''],
      owner: [''],
      email: [''],
      mobile: [''],
      location: [''],
      gstno: ['']
    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false
  }
  //subscribe data
  addResto() {
    this.resturantModelObj.resturantName = this.formValue.value.resturantName;
    this.resturantModelObj.owner = this.formValue.value.owner;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.location = this.formValue.value.location;
    this.resturantModelObj.gstno = this.formValue.value.gstno;

    this.api.postResturant(this.resturantModelObj).subscribe(res => {
      console.log(res);
      alert("Resturant record added successfully");

      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData()
    },
      err => {
        alert("Something went wrong, please check again!")
      }
    )
  }

  //getAll data
  getAllData() {
    this.api.getResturant().subscribe(res => {
      this.allResturantData = res;
    })
  }

   
  //delete records
  deleteResto(data:any){
    this.api.deleteResturant(data.id).subscribe(res => {
      alert("Resturant record deleted successfully!")
      this.getAllData();
    })
  }

  // /on edit
  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.resturantModelObj.id = data.id
    this.formValue.controls['resturantName'].setValue(data.name);
    this.formValue.controls['owner'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.name);
    this.formValue.controls['mobile'].setValue(data.name);
    this.formValue.controls['location'].setValue(data.name);
    this.formValue.controls['gstno'].setValue(data.name);

  }

  updateResto(){
    this.resturantModelObj.resturantName = this.formValue.value.resturantName;
    this.resturantModelObj.owner = this.formValue.value.owner;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.location = this.formValue.value.location;
    this.resturantModelObj.gstno = this.formValue.value.gstno;

    this.api.updateResturant(this.resturantModelObj, this.resturantModelObj.id).subscribe(res=>{
      alert("Restuarent updated");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData()
    })
  }
}
