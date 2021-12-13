const Cart = require("../../models/cartModels");
const { ErrorHandler } = require("../helpers/errorHelper");

exports.getCart = async (customerId) => {
  const cart = await Cart.findOne({ customerId }).populate("items.productId");
  // if (!cart) throw new new ErrorHandler(404, "cart not exist!")();
  return cart;
};

exports.getCartFor = async (customerId) => {
  const cart = await Cart.findOne({ customerId }).populate("items.productId");
  if (!cart) throw new new ErrorHandler(404, "cart not exist!")();
  return cart;
};

// to add or update items in cart
exports.updateCartProductItem = async (customerId, data) => {
  const userCart = await Cart.find({ customerId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      customerId,
      items: data,
    });
    return add;
  }
};

exports.RemoveProductfromeCart = async (customerId, productId) => {
  const Usercart = await Cart.findOne({ customerId });

  const updatedCartItems = Usercart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  Usercart.items = updatedCartItems;
  return await Usercart.save();
};

exports.clearCart = async (customerId) => {
  const Usercart = await Cart.findOneAndDelete({ customerId });
  return Usercart;
};

exports.addProductTocart = async (customerId, data) => {
  const userCart = await Cart.findOne({ customerId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      userId,
      items: data,
    });
    return add;
  }
};
