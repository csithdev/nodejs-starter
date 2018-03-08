import { Router } from 'express';
import model from '../../model/model';

const router = Router();

router.get('/', (req, res) => {
  model.Product.find({}, (err, data) => {
    res.send({ code: 0, data });
  });
});

router.get('/:id', (req, res, next) => {
  model.Product.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send({ code: 0, data });
    }
  });
});

router.post('/', (req, res, next) => {
  const product = new model.Product(
    req.body
  );
  product.save((err, data) => {
    if (err) {
      next(err);
    } else {
      res.send({ code: 0, data });
    }
  });
});

router.put('/:id/edit', (req, res) => {
  const name = req.body.name;
  const descr = req.body.descr;
  const price = req.body.price;
  const photo = req.body.photo;

  model.Product.findById(req.params.id, (err, blob) => {
    blob.update({
      name,
      descr,
      price,
      photo
    }, (error, blobID) => {
      if (error) {
        res.send('There was a problem updating the information about the product.');
      } else {
        res.format({
          html: () => {
            res.redirect('/api/v1/product/'.concat(blob.id));
          },
          json: () => {
            res.json(blob);
          }
        });
      }
    });
  });
});

router.delete('/:id', (req, res) => {
  model.Product.findById(req.params.id, (err, blob) => {
    if (err) {
      console.error(err);
    } else {
      blob.remove((err2, blob) => {
        if (err2) {
          console.error(err2);
        } else {
          console.log('DELETE removing ID: '.concat(blob.id));
          res.format({
            html: () => {
              res.redirect('/api/v1/product');
            },
            json: () => {
              res.json({
                message: 'deleted',
                item: blob
              });
            }
          });
        }
      });
    }
  });
});

export default router;

