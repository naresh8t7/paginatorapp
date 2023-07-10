import {Component, Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {
  public isMenuExpanded = false;

  constructor(private changeRef: ChangeDetectorRef, private appRef: ApplicationRef,
              private route: ActivatedRoute, private router: Router) {
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }



  ngOnInit() {
    this.router.events
      .subscribe(event => {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
        console.log(currentRoute.snapshot.data);
      });
  }
}
