const express = require('express');
const jwt = require('jsonwebtoken');
const { MenuData } = require('../models/postDataModel');
const { mealscategories } = require('../models/MealsCategories');
const { CartData } = require('../models/cartmodel');
const { user } = require('../models/usermodel');
const authenticate = require('../middleware/Authentication');
const postrouter = express.Router();

postrouter.get('/', async (req, res) => {
  // console.log(respones);

  // const { cate } = req.query;
  // let respones;
  // if (cate) {
  //   console.log(cate);
  //   respones = await MenuData.find({ cate });
  // } else {
  //   respones = await MenuData.find();
  // }
  // return res.send(respones);

  const { cate } = req.query;
  let obj = {};
  if (cate) {
    obj.cate = cate;
  }
  respones = await MenuData.find(obj);
  return res.send(respones);
});

postrouter.get('/categories', async (req, res) => {
  // console.log(respones);

  // const { cate } = req.query;
  // let respones;
  // if (cate) {
  //   console.log(cate);
  //   respones = await MenuData.find({ cate });
  // } else {
  //   respones = await MenuData.find();
  // }
  // return res.send(respones);

  const { cate } = req.query;
  let obj = {};
  if (cate) {
    obj.cate = cate;
  }
  respones = await mealscategories.find();
  return res.send(respones);
});

postrouter.get('/addtocart', async (req, res) => {
  // console.log(respones);

  // const { cate } = req.query;
  // let respones;
  // if (cate) {
  //   console.log(cate);
  //   respones = await MenuData.find({ cate });
  // } else {
  //   respones = await MenuData.find();
  // }
  // return res.send(respones);

  const { cate } = req.query;
  let obj = {};
  if (cate) {
    obj.cate = cate;
  }
  respones = await CartData.find();
  return res.send(respones);
});

postrouter.post('/addtocart', authenticate, async (req, res) => {
  let data = req.body;
  const userdata = req.userinfo;
  data = {
    user_id: userdata._id,
    ...data,
  };
  console.log(data);
  let present = await CartData.findOne({ id: data.id, user_id: data.user_id });
  let respones;
  if (present) {
    present.quantity = present.quantity + 1;
    respones = await CartData.findOneAndUpdate(
      {
        _id: present._id,
      },
      {
        ...present,
      }
    );
  } else {
    data.quantity = 1;
    respones = await CartData.create({
      ...data,
    });
  }
  let count = await CartData.find().count();
  console.log(count);
  return res.send({ data: respones, count: count });
});

postrouter.delete('/addtocartdelete/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  const respones = await CartData.findByIdAndDelete(_id);
  return res.send(respones);
});

postrouter.patch('/update/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  let data = req.body;
  const respones = await postData.findByIdAndUpdate(_id, data);
  return res.send(respones);
});

module.exports = postrouter;
