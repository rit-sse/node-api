'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';

export default sequelize.define('specialties', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});
