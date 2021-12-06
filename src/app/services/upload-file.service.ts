import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) {

   }

   upload(files: NgxFileDropEntry[] ,formData: FormData) {

   // const formData = new FormData();
   // const request = new HttpRequest('POST', url,formData);
   // return this.http.request(request);

    return this.http.post('http://localhost:8000/upload', formData)

   }
}
