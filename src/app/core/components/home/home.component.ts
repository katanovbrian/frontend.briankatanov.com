import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  sunChecked = false;
  mercuryChecked = false;
  venusChecked = false;
  earthChecked = false;
  marsChecked = false;
  jupiterChecked = false;
  saturnChecked = false;
  uranusChecked = false;
  neptuneChecked = false;

  constructor(){}

  ngOnInit(): void {
    setTimeout(this.togglePlanets.bind(this),2000)
    // const blink=setInterval(this.togglePlanetsRandom.bind(this),2000)
    const twinkle=setInterval(this.planetsTwinkle.bind(this),2000)
    this.placePlanets()
  }

  @HostListener('window:resize', ['$event'])
  placePlanets() {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    const GAP_H= HEIGHT * 0.10;
    const GAP_W = WIDTH * 0.10;
    const planets = [].slice.call(document.getElementById('planet')?.getElementsByTagName('div'),0);
    const arrayLength = planets.length;
    for (let i = 0; i < arrayLength; i++) {    
      const height = Math.random() * (HEIGHT-5*GAP_H)
      const width = Math.random() * (WIDTH-3*GAP_W)
      const planet : HTMLHtmlElement = planets[i]
      planet.style.top = `${height}px`;
      planet.style.left = `${width}px`;
    }
  }

  togglePlanets(){
    this.sunChecked=!this.sunChecked;
    this.mercuryChecked=!this.mercuryChecked;
    this.venusChecked=!this.venusChecked;
    this.earthChecked=!this.earthChecked;
    this.marsChecked=!this.marsChecked;
    this.jupiterChecked=!this.jupiterChecked;
    this.saturnChecked=!this.saturnChecked;
    this.uranusChecked=!this.uranusChecked;
    this.neptuneChecked=!this.neptuneChecked;
  }

  togglePlanetsRandom() {
    this.sunChecked=Math.random() < 0.5;
    this.mercuryChecked=Math.random() < 0.5;
    this.venusChecked=Math.random() < 0.5;
    this.earthChecked=Math.random() < 0.5;
    this.marsChecked=Math.random() < 0.5;
    this.jupiterChecked=Math.random() < 0.5;
    this.saturnChecked=Math.random() < 0.5;
    this.uranusChecked=Math.random() < 0.5;
    this.neptuneChecked=Math.random() < 0.5;
  }

  planetsTwinkle(){
    this.sunChecked=Math.random() < 0.1;
    this.mercuryChecked=Math.random() < 0.2;
    this.venusChecked=Math.random() < 0.3;
    this.earthChecked=Math.random() < 0.4;
    this.marsChecked=Math.random() < 0.5;
    this.jupiterChecked=Math.random() < 0.6;
    this.saturnChecked=Math.random() < 0.7;
    this.uranusChecked=Math.random() < 0.8;
    this.neptuneChecked=Math.random() < 0.9;
  }
  id = "tsparticles";
      /* or the classic JavaScript object */
      particlesOptions = {
        fpsLimit: 120,
        fullScreen : {
          zIndex : 0
        },
        interactivity: {
            events: {
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }

}
