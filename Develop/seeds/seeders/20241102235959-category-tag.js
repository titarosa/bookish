const { Tag } = require('../models');

const tagData = [
  { tag_name: 'Casual' },
  { tag_name: 'Sports' },
  { tag_name: 'Music' },
  { tag_name: 'Fashion' },
  { tag_name: 'Outdoor' },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('tags', tagData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('tags', null, {});
  },
};
