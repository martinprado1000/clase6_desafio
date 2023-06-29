const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    const ex = async () => {
      try {
        await fs.promises.access(this.path);
      } catch (e) {
        console.log("El archivo no existe");
        const arr = JSON.stringify([]);
        fs.promises.writeFile(path, arr);
        console.log("Archivo creado correctamente");
      }
    };
    ex();
  }

  async getProducts() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      const productsObj = await JSON.parse(products);
      return productsObj;
    } catch (e) {
      console.log("Error al leer el archivo");
      return {"Error": "Error al leer el archivo"}
    }
  }

  async getProductById(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID valido")
        return {"Error": "Debe enviar un ID valido"};
      }
      const productos = await this.getProducts();
      const exist = productos.findIndex((ex)=>ex.id==id)
      if (exist === -1) return {"Error":`El producto con id: ${id} no existe`}
      const prodId = productos.find((p) => p.id == id);
      return prodId;
    } catch (e) {
      console.log("Error al leer el archivo");
      return {"Error": "Error al leer el archivo"}
    }
  }

  async deleteProduct(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID")
        return "Error: Debe enviar un ID";
      }
      const prod = await this.getProducts();
      //products.findIndex((product) => product.code === code)
      const exist = prod.findIndex((ex)=>ex.id==id)
      if (exist === -1) return console.log(`El producto con id: ${id} no existe`)
      const prodDelete = prod.filter((p) => p.id != id);
      console.log(`El producto con id: ${id} se elimino correctamente`)
      return await fs.promises.writeFile(this.path,JSON.stringify(prodDelete, null, 2))
    } catch (e) {
      console.log("Erro al eliminar el producto");
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return "Error: Campos incorrectos";
      }
      const prod = await this.getProducts();
      const newProduct = {
        id: prod.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      prod.push(newProduct);
      console.log("Producto agregado correctamente")
      return fs.promises.writeFile(this.path, JSON.stringify(prod, null, 2));
    } catch (e) {
      console.log("Erro al agregar el producto");
    }
  }

  async updateProduct(id,{title,description,price,thumbnail,code,stock}) {
    try {
      // if (
      //   !id ||
      //   !title ||
      //   !description ||
      //   !price ||
      //   !thumbnail ||
      //   !code ||
      //   !stock
      // ) {
      //   return "Error: Campos incorrectos";
      // }
      const prod = await this.getProducts();
      const productIndex = prod.findIndex((product) => product.id === id);
      if (productIndex === -1) return console.log(`El producto con id: ${id} no existe`)

      prod[productIndex].title = title || prod[productIndex].title;
      prod[productIndex].description = description || prod[productIndex].description;
      prod[productIndex].price = price || prod[productIndex].price;
      prod[productIndex].thumbnail = thumbnail || prod[productIndex].thumbnail;
      prod[productIndex].code = code || prod[productIndex].code;
      prod[productIndex].stock = stock || prod[productIndex].stock;

      console.log(`El producto con id: ${id} se edito correctamente`)
      return fs.promises.writeFile(this.path, JSON.stringify(prod, null, 2));
      
    } catch (e) {
      return "Erro al editar el producto";
    }
  }
}
//------------------Instacia-----------------------------
//const manager = new ProductManager("products.json");

//-----------------Obtener productos----------------------
//manager.getProducts().then((data)=>{return data})

//---------------Agregar producto-------------------------
// const data = {
//   title: "Producto 1",
//   description: "Desc prod1",
//   price: 22220,
//   thumbnail: "www.image.com",
//   code: "abc123",
//   stock: 200,
// };
//manager.addProduct(data);

//--------------Obtener producto por ID-------------------
//manager.getProductById().then((data)=>{return data})

//
//--------------Actualizar--------------------------------
const data2 = {
  title: "Producto 99999999",
  description: "Desc prod999999999",
  price: 22220,
  thumbnail: "www.image.com",
  code: "abc123",
  stock: 200,
};
//manager.updateProduct(3,data2)

//-------------Borrar--------------------------------------
//manager.deleteProduct(9)

module.exports = {
  ProductManager
  //manager
};