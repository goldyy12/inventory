const db = require("../db/queries");


async function listCategories(req, res) {
    try {
        const categories = await db.listCategories();
        res.render("index", { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

function createCategoryget(req, res) {
    res.render("categoryform");
}

async function createCategorypost(req, res) {
    const { name, description } = req.body;   // 
    await db.createCategory(name, description);
    res.redirect("/");
}
async function updateCategoryGet(req, res) {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    res.render("categoryedit", { category })

}
async function updateCategoryPost(req, res) {
    const { id } = req.params;
    const { name, description } = req.body

    await db.updateCategory(id, name, description);
    res.redirect("/categories")

}
async function categoryDetails(req, res) {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    const items = await db.getDetails(id);

    res.render("categorydetails", { category, items });
}
async function createItemForm(req, res) {
    const categoryId = req.query.category;



    const category = await db.getCategoryById(categoryId);
    console.log(category)


    res.render("itemform", { category });
}
async function createItem(req, res) {
    const { name, price, stock, description, category_id } = req.body;

    if (!category_id) {
        return res.status(400).send("Category ID is required");
    }

    await db.createItem(name, price, stock, description, category_id);
    res.redirect(`/categories/${category_id}/details`);
}

async function deleteItem(req, res) {

    const { id, category_id } = req.body;

    if (!id) {
        return res.status(400).send("Item ID is required");
    }

    const itemId = parseInt(id, 10);
    await db.deleteItem(itemId);

    res.redirect(`/categories/${category_id}/details`);
}
async function deleteCategory(req, res) {
    const { id } = req.params;
    const categoryId = parseInt(id, 10);



    await db.deleteCategory(categoryId);
    res.redirect("/categories")

}
async function editItem(req, res) {
    const { id } = req.params;
    const item = await db.getItemById(id);
    const category = await db.getCategoryById(item.category_id);

    res.render("itemsedit.ejs", { item, category });
}

async function editItemPost(req, res) {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;

    await db.editItem(parseInt(id, 10), name, price, stock, description);

    res.redirect(`/categories/${req.body.category_id}/details`);
}


module.exports = { listCategories, createCategorypost, createCategoryget, updateCategoryGet, updateCategoryPost, categoryDetails, createItem, createItemForm, deleteItem, deleteCategory, editItem, editItemPost };