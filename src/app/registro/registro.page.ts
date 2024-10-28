import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Servicios/storage.service';
import { AnimationController } from '@ionic/angular';
import { ConnectableObservable } from 'rxjs';


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

  async registrar() {
    return this.storage.set(this.user.username, this.user.password).then((res) => {
      if (res != null) {
        return true;
      }else{
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
  }
}
