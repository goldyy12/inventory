const pool = require("./db/pool"); // <- adjust path if needed

async function seed() {
    try {
        console.log("Resetting database...");

        await pool.query(`
            DROP TABLE IF EXISTS item;
            DROP TABLE IF EXISTS category;

            CREATE TABLE category (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT
            );

            CREATE TABLE item (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC(10,2),
                stock INTEGER DEFAULT 0,
                description TEXT,
                category_id INTEGER REFERENCES category(id)
            );
        `);

        console.log("Tables created.");

        // Insert categories
        await pool.query(`
            INSERT INTO category (name, description) VALUES
            ('Smartphones', 'Latest and popular smartphones'),
            ('Accessories', 'Phone and electronic accessories'),
            ('Electric Cars', 'Fully electric vehicles');
        `);

        // Insert smartphones
        await pool.query(`
            INSERT INTO item (name, price, stock, description, category_id) VALUES
            ('iPhone 13', 699, 15, 'Apple smartphone with A15 chip', 1),
            ('Samsung Galaxy S21', 599, 20, 'High-end Android flagship', 1),
            ('Xiaomi Redmi Note 12', 299, 30, 'Affordable budget smartphone', 1);
        `);

        // Insert accessories
        await pool.query(`
            INSERT INTO item (name, price, stock, description, category_id) VALUES
            ('Anker Charger 20W', 25, 40, 'Fast USB-C wall charger', 2),
            ('Samsung Earbuds', 99, 25, 'Wireless earbuds for Samsung phones', 2),
            ('iPhone USB-C Cable', 19, 50, 'Original Apple cable', 2);
        `);

        // Insert electric cars
        await pool.query(`
            INSERT INTO item (name, price, stock, description, category_id) VALUES
            ('Tesla Model 3', 38000, 5, 'Tesla electric sedan', 3),
            ('BMW i3', 27000, 4, 'Compact electric city car', 3),
            ('Volkswagen ID.3', 32000, 6, 'Volkswagen electric hatchback', 3);
        `);

        console.log("Seeding complete!");
        process.exit(0);

    } catch (err) {
        console.error("Error during seeding:", err);
        process.exit(1);
    }
}

seed();
