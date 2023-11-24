import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  
  constructor(private http: HttpClient) { }
  
  datos: any;

  createPdf(){
    this.http.get("http://localhost:9090/api/venta")
      .subscribe(
        resultado => {
          this.datos = resultado;
        }
      );
    const pdfDefinition: any = {
      content: [
        {
          text: 'Hola Mundo!'
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()

  }
}
