const connection = require("./connection");

const getAllItens = async () => {
  // Retornando o dado selecionado
  try {
    const [query] = await connection.execute("SELECT * FROM teste_node.book");
    return query;
  } catch (error) {
    throw new Error(`Erro ao buscar itens: ${error}`);
  }
};

// Inserindo dados no Banco de dados
async function insertItem(title, author) {
  try {
    const insertQuery = "INSERT INTO book (title, author) VALUES (?, ?)";
    const values = [title, author];
    const [result] = await connection.execute(insertQuery, values);
    return result;
  } catch (error) {
    throw new Error(`Erro ao inserir o item: ${error.message}`);
  }
}

module.exports = { getAllItens, insertItem };
