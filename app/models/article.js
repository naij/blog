'use strict'

module.exports = function(sequelize, DataTypes) {
  let Article = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    tag: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    markdown: DataTypes.STRING,
    draft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'articles',
    timestamps: true,
    underscored: false
  })
  return Article
}