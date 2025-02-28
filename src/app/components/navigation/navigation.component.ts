import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, statsChart, settingsSharp } from 'ionicons/icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class NavigationComponent implements OnInit {
  constructor() {
    addIcons({ barbell, statsChart, settingsSharp });
  }

  ngOnInit() {}
}
