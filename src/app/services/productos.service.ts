import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = []
  productosFiltrado: Producto[] = []

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angula-html-f9bf4.firebaseio.com/productos_idx.json')
        .subscribe((res: Producto[]) => {
          //console.log(res)
          this.cargando = false;
          this.productos = res;
          resolve();
        });
    });

  }

  public getProducto(id: string) {
    return this.http
      .get(`https://angula-html-f9bf4.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if(this.productos.length === 0){
      //carga productos
      this.cargarProductos().then(()=>{
        //ejecuta despues de tener los productos
        //Aplicar filtro
        this.filtrarProductos(termino)
      });
    } else{
      //Aplico el filtro
      this.filtrarProductos(termino)
    }

    
  }

  private filtrarProductos(termino: string){
      console.log(this.productos)
      this.productosFiltrado = []
      termino = termino.toLocaleLowerCase();
      this.productos.forEach(prod => {
        const tituloLower = prod.titulo.toLocaleLowerCase();
        if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >=0){
          this.productosFiltrado.push(prod);
        }
      });
  }
}
