const { Category } = require('../models');

const categoryData = [
  { category_name: 'Shirts' },
  { category_name: 'Shorts' },
  { category_name: 'Music' },
  { category_name: 'Hats' },
  { category_name: 'Shoes' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('categories', categoryData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
