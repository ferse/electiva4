import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }
  
  columnas: string[] = ['titulo', 'autor', 'editorial', 'borrar', 'seleccionar'];

  datos: any;

  libroselect: Libro = new Libro(0, "", "" , "");

  @ViewChild(MatTable) tabla1!: MatTable<Libro>;

  borrarVenta(id: number) {
    if (confirm("¿Realmente desea eliminar este libro?")) {
      this.http.delete(`http://localhost:9090/api/venta/${id}`)
          .subscribe(
              () => {
                  // Éxito: la venta se eliminó en el backend
                  // Puedes manejar aquí cualquier acción adicional que desees en el frontend
                  this.datos = this.datos.filter((libro: any) => libro.id !== id);
                  this.tabla1.renderRows();
              },
              (error) => {
                  // Manejo de errores en caso de que la solicitud al backend falle
                  console.error("Error al eliminar el libro:", error);
                  // Puedes mostrar un mensaje de error al usuario si es necesario
              }
          );
  }
  }

  agregar() {
    // Datos a enviar
    const libroData = {
      titulo: this.libroselect.titulo,
      autor: this.libroselect.autor,
      editorial: this.libroselect.editorial
    };

    // Configura las cabeceras si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realiza la solicitud POST directa al backend
    this.http.post('http://localhost:9090/api/venta', libroData, { headers })
      .subscribe(
        (data) => {
          // Éxito: la venta se agregó en el backend
          // Puedes manejar aquí cualquier acción adicional que desees en el frontend
          this.datos.push(data); // Agrega los datos a la tabla en el frontend
          this.tabla1.renderRows();
          this.libroselect = new Libro(0, "", "", "");
        },
        (error) => {
          // Manejo de errores en caso de que la solicitud al backend falle
          console.error("Error al agregar el libro:", error);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      );
  }

  editarVenta(libro: Libro) {
    this.http.put<Libro>(`http://localhost:9090/api/venta/${libro.id}`, libro)
      .subscribe(
        (data) => {
          console.log("Edición exitosa:", data);
          // Éxito: la venta se actualizó en el backend
          // Puedes manejar aquí cualquier acción adicional que desees en el frontend
          // Por ejemplo, cerrar el formulario de edición
  
          // Encuentra el índice del elemento en this.datos
          const indice = this.datos.findIndex((item: Libro) => item.id === data.id);
  
          // Actualiza el elemento en this.datos
          this.datos[indice] = data;
  
          // Renderiza las filas de la tabla
          this.tabla1.renderRows();
        },
        (error) => {
          // Manejo de errores en caso de que la solicitud al backend falle
          console.error("Error al actualizar el libro:", error);
          // Puedes mostrar un mensaje de error al usuario si es necesario
        }
      );
  }

  seleccionar(libro: Libro) {
    this.libroselect.id = libro.id; // Asigna el valor del id
    this.libroselect.titulo = libro.titulo;
    this.libroselect.autor = libro.autor;
    this.libroselect.editorial = libro.editorial;
  }

  guardar() {
    console.log('libroselect.id = ', this.libroselect.id);
    if (this.libroselect.id) {
      // Realizar lógica para actualizar el registro existente
      // Llama a la función para actualizar el registro
      this.editarVenta(this.libroselect);
    } else {
      // Realizar lógica para agregar un nuevo registro
      // Llama a la función para agregar un nuevo registro
      this.agregar();
    }
  
    // Restablece el formulario después de la operación
    this.libroselect = new Libro(0, "", "", "");
  }  

  ngOnInit() {
    this.http.get("http://localhost:9090/api/venta")
      .subscribe(
        resultado => {
          this.datos = resultado;
        }
      );
  }
}


export class Libro {
  constructor(public id: number, public titulo: string, public autor: string, public editorial: string) {
  }
}