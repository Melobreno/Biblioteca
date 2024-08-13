const express = require("express");

// Utilizado para permitir que aplicações web que estão rodadndo em um domínio (origem) acessem recursos de outro domínio
const cors = require("cors"); // faz com que o back e o front rode simultaneamente mesmo que de dominios distintos

const {
  getAllItens,
  insertItem,
  deleteItem,
  updateItem,
} = require("./allItems.js");

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

app.put("/updateItem/:id", async (req, res) => {
  const { id } = req.params; // Extrair id da url
  const { title, author } = req.body; // Extrair os dados do corpo da requisição

  try {
    const result = await updateItem(id, title, author);
    res.status(200).json(result); // Envio do resultado da atualização
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteItem/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteItem(id); //Deletar o arquivo do banco de dados
    res.status(200).json(result); // Envia o resultado da exclusão
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
