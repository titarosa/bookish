  const router = require('express').Router();
  const { Product, Category, Tag, ProductTag } = require('../../models');

  // The `/api/products` endpoint

  // GET all products, including associated Category and Tag data
  router.get('/', (req, res) => {
    Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    })
      .then((products) => res.json(products))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve products', details: err });
      });
  });

  // GET a single product by its `id`, including associated Category and Tag data
  router.get('/:id', (req, res) => {
    Product.findOne({
      where: { id: req.params.id },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    })
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Failed to retrieve product', details: err });
      });
  });

  // POST a new product
  router.post('/', (req, res) => {
    /* req.body should look like this...
      {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
    */
    Product.create(req.body)
      .then((product) => {
        // If there are product tags, create pairings in the ProductTag model
        if (req.body.tagIds && req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => ({
            product_id: product.id,
            tag_id,
          }));
          return ProductTag.bulkCreate(productTagIdArr).then(() => product);
        }
        return product;
      })
      .then((product) => res.status(201).json(product))
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Failed to create product', details: err });
      });
  });

  // PUT to update product data
  router.put('/:id', (req, res) => {
    Product.update(req.body, {
      where: { id: req.params.id },
    })
      .then((affectedRows) => {
        if (affectedRows[0] === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        // If there's tag data, handle tag associations
        if (req.body.tagIds && req.body.tagIds.length) {
          return ProductTag.findAll({
            where: { product_id: req.params.id },
          }).then((productTags) => {
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
              .filter((tag_id) => !productTagIds.includes(tag_id))
              .map((tag_id) => ({
                product_id: req.params.id,
                tag_id,
              }));

            const productTagsToRemove = productTags
              .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
              .map(({ id }) => id);

            // Run both actions
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          });
        }
        return res.json({ message: 'Product updated successfully' });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Failed to update product', details: err });
      });
  });

  // DELETE a product by its `id`
  router.delete('/:id', (req, res) => {
    Product.destroy({
      where: { id: req.params.id },
    })
      .then((deletedRows) => {
        if (deletedRows === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).json(); // No content to return
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Failed to delete product', details: err });
      });
  });

  module.exports = router;
