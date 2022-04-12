import { Component } from '@angular/core';
import { versionInfo } from 'src/environments/versions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  ngOnInit() {
    console.log(versionInfo);
  }
}
