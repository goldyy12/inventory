const pool = require("../db/pool");


async function listCategories() {
    const { rows } = await pool.query("SELECT * FROM category ORDER BY id ASC");
    return rows;

}
async function createCategory(name, description) {
    await pool.query("INSERT INTO category (name,description) VALUES($1, $2) ", [name, description])

}

async function getCategoryById(id) {
    const { rows } = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
    return rows[0]

}
async function updateCategory(id, name, description) {
    await pool.query(
        "UPDATE category SET name = $1, description = $2 WHERE id = $3",
        [name, description, id]
    );
}

async function getDetails(id) {
    const { rows } = await pool.query(
        "SELECT * FROM item WHERE category_id = $1",
        [id]
    );
    return rows;
}


async function createItem(name, price, stock, description, categoryId) {

    const parsedCategoryId = parseInt(categoryId, 10);



    await pool.query(
        `INSERT INTO item (name, price, stock, description, category_id)
     VALUES ($1, $2, $3, $4, $5)`,
        [name, price, stock, description, parsedCategoryId]
    );
}

async function deleteItem(id) {
    await pool.query("DELETE FROM item where id = $1", [id])

}
async function deleteCategory(id) {
    const { rows } = await pool.query("SELECT COUNT(*) FROM item WHERE category_id = $1", [id]);
    if (parseInt(rows[0].count, 10) > 0) {
        throw new Error("Cannot delete category with items still assigned");
    }
    await pool.query("DELETE FROM category WHERE id = $1", [id]);
}



async function editItem(id, name, price, stock, description) {
    await pool.query(
        "UPDATE item SET name = $1, price = $2, stock = $3, description = $4 WHERE id = $5",
        [name, price, stock, description, id]
    );
}
async function getItemById(id) {
    const { rows } = await pool.query(
        "SELECT * FROM item WHERE id = $1",
        [id]
    );
    return rows[0];
}



module.exports = { listCategories, createCategory, getCategoryById, updateCategory, getDetails, createItem, deleteItem, deleteCategory, editItem, getItemById }