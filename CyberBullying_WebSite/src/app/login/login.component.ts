import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  
  loginFG : FormGroup;

  invalidlogin = false;

  constructor(private _formBuilder : FormBuilder,
              private router:Router,
              private authService:AuthService,
              private userService:UserService) { }

  ngOnInit(): void {
    

    this.authService.getMe().subscribe((res:any)=>{
        this.authService.loggedInStatus = true;
        this.authService.isLoggedIn.emit(true);
       
      this.router.navigate(['home']);
    },(err)=>{
      console.log("this is Error",err);
    });


    this.loginFG = this._formBuilder.group({
      email:['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+//=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+//=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password:['',Validators.required],
    });

  }

  onSubmit(form:NgForm) {
    
    this.authService.login(form).subscribe(res => {
        console.log("this is Response",res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['home']);
        }
      }, (err) => {
       
        console.log("this is error");
        console.log(err);
        
      });
      if(this.authService.loggedInStatus === false){
        this.invalidlogin=true;
        this.loginFG.reset();
      }
  }




  width: number = 100;
  height: number = 100;
  myStyle: Object = {
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'z-index': 0,
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
  };
  myParams: object = {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000"
      },
      "shape": {
        "type": "tringle",
        "polygon": {
          "nb_sides": 7
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000",
        "opacity": 0.4,
        "width": 1.5
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 10,
          "speed": 2
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

}
