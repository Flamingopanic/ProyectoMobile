import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Servicios/storage.service';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


user= {
  username:"",
  email:"",
  password:""
}


  constructor(private storage: StorageService, private router: Router,private animationController: AnimationController) { }
  

  ngOnInit() {
  }


  registrar(){
    console.log(this.user);
    this.storage.set(this.user.username, this.user);
    this.router.navigate(['/home'])
  }
}
