const express = require("express");
const app = express();
const port = 8080;
const { ProductManager } = require("./productManager");

//instacio el manager
const manager = new ProductManager("products.json");

//getProdicts
const products = async (req, res) => {
  try {
    const limitInt = parseInt(req.query.limit);
    //console.log(limitInt);
    const data = await manager.getProducts();
    if (!limitInt) res.send(data);
    else {
      const dataLimit = data.slice(0, limitInt);
      console.log(dataLimit);
      res.send(dataLimit);
    }
  } catch (e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

//getProductById
const productId = async (req, res) => {
  try{
    const pid = parseInt(req.params.pid);
    const data = await manager.getProductById(pid);
    res.send(data);
  } catch(e) {
    console.log(e);
    return { "Error" : "Algo salio mal con la consulta"}
  }
}

app.get("/products", products);

app.get("/products/:pid", productId);

app.get("/", products );

app.get("/:pid", productId);

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ "Error" : "La ruta deseada no existe" });
});

app.listen(port, () => {
  console.log("servidor de Express escuchando en el puerto", port);
});
