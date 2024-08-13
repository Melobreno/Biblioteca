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
    const insertQuery = "INSERT INTO book (title, author) VALUES (?, ?);";
    const values = [title, author];
    const [result] = await connection.execute(insertQuery, values);
    return result;
  } catch (error) {
    throw new Error(`Erro ao inserir o item: ${error.message}`);
  }
}

// Update
const updateItem = async (id, title, author) => {
  try {
    const updateQuery = "update book set title = ?, author = ? where id = ?;";
    const values = [title, author, id];
    const [result] = await connection.execute(updateQuery, values);
    return result;
  } catch (error) {
    throw new error(`Erro ao atualizar o item: ${error.message}`);
  }
};

//Delete
const deleteItem = async (id) => {
  try {
    const deleteQuery = "DELETE FROM book WHERE id = ?;";
    const values = [id];
    const [result] = await connection.execute(deleteQuery, values);
    return result;
  } catch (error) {
    throw new error(`Erro ao excluir o item: ${error.message}`);
  }
};

module.exports = { getAllItens, insertItem, updateItem, deleteItem };
