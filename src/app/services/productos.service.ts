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

  private cargarProductos(){
    this.http.get('https://angula-html-f9bf4.firebaseio.com/productos_idx.json')
    .subscribe((res: Producto[]) => {
      //console.log(res)
      this.cargando = false;
      this.productos = res
    });
  }

  public getProducto(id: string){
    return this.http
               .get(`https://angula-html-f9bf4.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){
    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
    console.log(this.productosFiltrado)
  }
}
