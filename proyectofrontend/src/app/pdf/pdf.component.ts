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

  generatePdf(){
    this.fetchTable();
  }

  fetchTable() {
    this.http.get("http://localhost:9090/api/venta")
      .subscribe(
        resultado => {
          this.datos = resultado;
          this.createPdf();
        }
      );
  }

  createPdf() {
    const pdfDefinition: any = {
      content: [
        {
          table: {
            widths: ['*', '*', '*', '*'],
            headerRows: 1,
            body: [
              ['Id', 'Titulo', 'Autor', 'Editorial'],
              ...this.datos.map((row) => [row.id, row.titulo, row.autor, row.editorial]),
            ],
          },
        }
      ],
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}