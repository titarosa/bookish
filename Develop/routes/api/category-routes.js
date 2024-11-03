const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories, including associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json({ error: 'Failed to retrieve categories', details: err }));
});

// GET a category by its `id`, including associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    })
    .catch((err) => res.status(400).json({ error: 'Failed to retrieve category', details: err }));
});

// POST a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(400).json({ error: 'Failed to create category', details: err }));
});

// PUT to update a category by its `id`
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((affectedRows) => {
      if (affectedRows[0] === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json({ message: 'Category updated successfully' });
    })
    .catch((err) => res.status(400).json({ error: 'Failed to update category', details: err }));
});

// DELETE a category by its `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(204).json(); // No content to return
    })
    .catch((err) => res.status(400).json({ error: 'Failed to delete category', details: err }));
});

module.exports = router;

