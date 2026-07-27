const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM({
        values: [
          "shopping_cart",
          "created",
          "processing",
          "canceled",
          "completed",
        ],
      }),
      allowNull: false,
      defaultValue: "shopping_cart",
    },
    total:
    {
      type: DataTypes.INTEGER, 
      allowNull: false
    }, 
    items: {
      type: (DataTypes.ARRAY(DataTypes.TEXT))
    },
  })
}