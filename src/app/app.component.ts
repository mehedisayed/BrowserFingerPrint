import { Component, OnInit } from '@angular/core';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {HttpClient} from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BrowserFingerPrint';
  deviceInfo = null;
  constructor(private http: HttpClient, private deviceService: DeviceDetectorService) {}

  ngOnInit() {
    (async () =>
    {
    // We recommend to call `load` at application startup.
    const fp = await FingerprintJS.load();

    // The FingerprintJS agent is ready.
    // Get a visitor identifier when you'd like to.
    const result = await fp.get();

    // This is the visitor identifier:
    const visitorId = result.visitorId;
    console.log('FingerPrint ID: ' + visitorId);
    console.log(result);
    })();

    // ip
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      console.log('IP: ' + res.ip);
    });

    // device
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log('mobile: ' + isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log('tablet: ' + isTablet);  // returns if the device us a tablet (iPad etc)
    console.log('desktop: ' + isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
}
