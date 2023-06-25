const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    const ex = async () => {
      try {
        await fs.promises.access(this.path);
        console.log("Archivo existente");
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
      //console.log(productsObj)
      return productsObj;
    } catch (e) {
      console.log("Error al leer el archivo");
    }
  }

  async getProductById(id) {
    try {
      if (!id) {
        console.log("Debe enviar un ID")
        return "Error: Debe enviar un ID";
      }
      const prod = await this.getProducts();
      const exist = prod.findIndex((ex)=>ex.id==id)
      if (exist === -1) return console.log(`El producto con id: ${id} no existe`)
      const prodId = prod.find((p) => p.id == id);
      console.log(prodId)
      return prodId;
    } catch (e) {
      console.log("Erro al obtener el producto");
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
      if (
        !id ||
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !stock
      ) {
        return "Error: Campos incorrectos";
      }
      const prod = await this.getProducts();
      const productIndex = prod.findIndex((product) => product.id === id);
      if (productIndex === -1) return console.log(`El producto con id: ${id} no existe`)

      prod[productIndex].title = title;
      prod[productIndex].description = description;
      prod[productIndex].price = price;
      prod[productIndex].thumbnail = thumbnail;
      prod[productIndex].code = code;
      prod[productIndex].stock = stock;

      console.log(`El producto con id: ${id} se edito correctamente`)
      return fs.promises.writeFile(this.path, JSON.stringify(prod, null, 2));
      
    } catch (e) {
      console.log("Erro al editar el producto");
    }
  }
}
//-------------------------------------------------------------------------------------

const manager = new ProductManager("products.json");

// Obtengo productos
//manager.getProducts().then((d)=>console.log(d)); 
const getP = (async()=>{
  try{
    const get = await manager.getProducts()
    console.log(get)
  } catch(e){
    console.log(e)
  }
})
//getP();

const data = {
  title: "Producto 1",
  description: "Desc prod1",
  price: 22220,
  thumbnail: "www.image.com",
  code: "abc123",
  stock: 200,
};
//manager.addProduct(data);

//manager.getProductById(9);

const data2 = {
  title: "Producto 99999999",
  description: "Desc prod999999999",
  price: 22220,
  thumbnail: "www.image.com",
  code: "abc123",
  stock: 200,
};
manager.updateProduct(3,data2);

//manager.deleteProduct(9)