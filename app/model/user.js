'use strict';


/*
1.freezeTableName: false, Sequelize woudle add s after model entity
eg :select * from users
2.timestamps :true, table field would add created_at automatically
*/
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    age: INTEGER,

  }, {
    freezeTableName: true,
  });

  return User;
};
