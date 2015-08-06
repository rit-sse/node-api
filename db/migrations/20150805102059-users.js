export var up = function(migration, DataTypes) {
  migration.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dce: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });
};

export var down = function(migration, DataTypes) {
  return migration.dropTable('users');
};
