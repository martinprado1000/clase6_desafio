const express = require("express");
const app = express();
const port = 8080;
const { manager  } = require('./productManager')

//const manager = new ProductManager("products.json");

app.get("/", (req, res) => {
  const limitInt = parseInt(req.query.limit);
  //console.log(limitInt);
    manager.getProducts().then((d) => {
    const data = d;
    if (!limitInt) res.send(data);
    else {
      const dataLimit = data.slice(0, limitInt);
      console.log(dataLimit);
      res.send(dataLimit);
    }
  });
});

app.get("/products", (req, res) => {
  const limitInt = parseInt(req.query.limit);
  //console.log(limitInt);
    manager.getProducts().then((d) => {
    const data = d;
    if (!limitInt) res.send(data);
    else {
      const dataLimit = data.slice(0, limitInt);
      console.log(dataLimit);
      res.send(dataLimit);
    }
  });
}); 

app.get("/products/:pid", (req, res) => {
  const pid = parseInt(req.params.pid);
    manager.getProductById(pid).then((d) => {
    const data = d;
    res.send(data);
  });
});

app.use((req, res) => {
  res.status(404).send("La ruta deseada no existe");
});

app.listen(port, () => {
  console.log("servidor de Express escuchando en el puerto", port);
});
