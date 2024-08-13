const express = require("express");

// Utilizado para permitir que aplicações web que estão rodadndo em um domínio (origem) acessem recursos de outro domínio
const cors = require("cors"); // faz com que o back e o front rode simultaneamente mesmo que de dominios distintos

const { getAllItens, insertItem } = require("./allItems.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Funcionando na porta ${PORT}`);
});

//Rotas para buscar todos os itens

app.get("/", async (req, res) => {
  try {
    const items = await getAllItens();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/insertitem", async (req, res) => {
  const { title, author } = req.body;

  try {
    const result = await insertItem(title, author);
    res.status(201).json(result);
  } catch (error) {
    result.status(500).json({ error: error.message });
  }
});
