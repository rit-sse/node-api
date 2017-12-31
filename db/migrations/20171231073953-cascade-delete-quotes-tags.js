// Add ON DELETE CASCADE and ON UPDATE CASCADE to the quotes_tags table
export function up(queryInterface, Sequelize) {
  const dialect = queryInterface.sequelize.getDialect();
  // SQLite does not support the DROP CONSTRAINT syntax,
  // so we have to make a temporary table, copy all the data into it,
  // and then rename it to the original table. Since we use SQLite in
  // development and testing with small amounts of data, while this is
  // gross, it is not necessarily the end of the world.
  if (dialect === 'sqlite') {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface.createTable('temp', {
        tagName: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'tags',
            key: 'name',
          },
          primaryKey: true,
          onDelete: 'cascade', // New constraint
          onUpdate: 'cascade', // New constraint
        },
        quoteId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'quotes',
            key: 'id',
          },
          primaryKey: true,
          onDelete: 'cascade', // New constraint
          onUpdate: 'cascade', // New constraint
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }, { transaction: t }),
      queryInterface
        .sequelize
        .query('INSERT INTO temp SELECT * FROM quotes_tags;', { transaction: t }),
      queryInterface
        .sequelize
        .query('DROP TABLE quotes_tags;', { transaction: t }),
      queryInterface
        .sequelize
        .query('ALTER TABLE temp RENAME TO quotes_tags;', { transaction: t }),
    ]));
  } else if (dialect === 'postgres') {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface
        .sequelize
        .query(`ALTER TABLE quotes_tags
                DROP CONSTRAINT "quotes_tags_tagName_fkey",
                ADD CONSTRAINT "quotes_tags_tagName_fkey"
                  FOREIGN KEY ("tagName")
                  REFERENCES tags(name)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE;`, { transaction: t }),
      queryInterface
        .sequelize
        .query(`ALTER TABLE quotes_tags
                DROP CONSTRAINT "quotes_tags_quoteId_fkey",
                ADD CONSTRAINT "quotes_tags_quoteId_fkey"
                  FOREIGN KEY ("quoteId")
                  REFERENCES quotes(id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE;`, { transaction: t }),
    ]));
  }

  console.warn(`You are using an unsupported dialect: ${dialect}. We only use sqlite and postgres.`); // eslint-disable-line no-console
}

// Remove ON DELETE CASCADE and ON UPDATE CASCADE FROM the quotes_tags table
export function down(queryInterface, Sequelize) {
  const dialect = queryInterface.sequelize.getDialect();
  // See above comment about SQLite
  if (dialect === 'sqlite') {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface.createTable('temp', {
        tagName: {
          type: Sequelize.STRING,
          allowNull: false,
          references: { model: 'tags', key: 'name' },
          primaryKey: true,
        },
        quoteId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'quotes', key: 'id' },
          primaryKey: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }, { transaction: t }),
      queryInterface
        .sequelize
        .query('INSERT INTO temp SELECT * FROM quotes_tags;', { transaction: t }),
      queryInterface
        .sequelize
        .query('DROP TABLE quotes_tags;', { transaction: t }),
      queryInterface
        .sequelize
        .query('ALTER TABLE temp RENAME TO quotes_tags;', { transaction: t }),
    ]));
  } else if (dialect === 'postgres') {
    return queryInterface.sequelize.transaction(t => Promise.all([
      queryInterface
        .sequelize
        .query(`ALTER TABLE quotes_tags
                DROP CONSTRAINT "quotes_tags_tagName_fkey",
                ADD CONSTRAINT "quotes_tags_tagName_fkey"
                  FOREIGN KEY ("tagName")
                  REFERENCES tags(name);`, { transaction: t }),
      queryInterface
        .sequelize
        .query(`ALTER TABLE quotes_tags
                DROP CONSTRAINT "quotes_tags_quoteId_fkey",
                ADD CONSTRAINT "quotes_tags_quoteId_fkey"
                  FOREIGN KEY ("quoteId")
                  REFERENCES quotes(id);`, { transaction: t }),
    ]));
  }

  console.warn(`You are using an unsupported dialect: ${dialect}. We only use sqlite and postgres.`); // eslint-disable-line no-console
}
