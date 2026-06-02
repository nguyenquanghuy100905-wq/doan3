const Orders = require('../models/orders')
const Orderdetails = require('../models/orderdetails')
const Cart = require('../models/cart')
const Promotions = require('../models/promotions')
const Products = require('../models/products')
const User = require('../models/users')
const SendEmail = require('../middleware/email')

exports.getAllOrders = async (req, res) => {
	try {

		const orders = await Orders.getAllOrders();
		res.status(200).send(orders);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};

exports.getOrdersById = async (req, res) => {
	try {

		const orders = await Orders.getOrdersById(req.query.id);
		if (!orders) return res.status(404).send({ message: 'orders không tìm thấy' });
		res.status(200).send(orders);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
exports.getOrdersByIdUser = async (req, res) => {
	try {

		const orders = await Orders.getOrdersByIdUser(req.query.id);
		if (!orders) return res.status(404).send({ message: 'orders không tìm thấy' });
		res.status(200).send(orders);
	} catch (error) {

		res.status(500).send({ message: error.message });
	};
};
exports.createOrders = async (req, res) => {
	try {
		const { user_id, payment_method_id, promotion_id, status, note, address, total } = req.body;
		let finalAddress = address;
		if (!finalAddress) {
			const userAddress = await User.getAdressById(user_id);
			if (userAddress) {
				finalAddress = userAddress;
			}
		}
		let finalPromotionId = promotion_id;
		let pricePromotion = { discount_percentage: 0 };
		if (finalPromotionId) {
			const promo = await Promotions.getPromotionsById(finalPromotionId);
			if (promo) {
				pricePromotion = promo;
			} else {
				finalPromotionId = null;
			}
		}
		const ordersId = await Orders.createOrders(user_id, payment_method_id, finalPromotionId, status, note, finalAddress, total);
		const dataCart = await Cart.getAllCart(user_id);
		if (dataCart.length > 0) {
			for (const item of dataCart) {
				let totalPrice = item.total - ((item.total * pricePromotion.discount_percentage) / 100);
				await Orderdetails.createOrderdetails(ordersId, item.product_id, item.quantity, item.subtotal);
				await Orders.updateTotalOrder(ordersId, totalPrice);
				const currentQuantity = await Products.getQuantityProductsById(item.product_id);
				let quantity = currentQuantity - item.quantity;
				await Products.updateQuantity(item.product_id, quantity);
				await Cart.deleteCart(user_id, item.product_id);
				if (promotion_id && pricePromotion.quantity_promotion !== undefined && pricePromotion.quantity_promotion !== null) {
					const newQuantity = pricePromotion.quantity_promotion - 1;
					await Promotions.updateQuantityPromotion(promotion_id, newQuantity);
				}
			}
		}
		res.status(201).send({ message: 'Tạo đơn hàng thành công', ordersId });
	} catch (error) {
		res.status(500).send({ message: 'Lỗi server', error: error.message });
	}
};


exports.updateOrders = async (req, res) => {
	try {
		const { id } = req.query;
		const { user_id, status, address, note } = req.body;
		let finalAddress = address;
		let oldNote = note;
		if (!oldNote) {
			const order = await Orders.getOrdersById(id);
			if (order) {
				order.map((order) => (oldNote = order.note));
			} else {
				return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
			}
		}
		if (!finalAddress) {
			const userAddress = await User.getAdressById(user_id);
			if (userAddress) {
				finalAddress = userAddress;
			} else {
				return res.status(404).json({ message: 'Không tìm thấy địa chỉ người dùng' });
			}
		}
		const updatedOrders = await Orders.updateOrders(id, status, finalAddress, oldNote);
		if (!updatedOrders) {
			return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
		}
		res.status(200).json({ message: 'Cập nhật đơn hàng thành công', updatedOrders });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Lỗi server', error: error.message });
	}
};

exports.deleteOrders = async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) {
			return res.status(400).json({ message: 'Vui lòng cung cấp id đơn hàng' });
		}

		let oldQuantity = 0;
		const dataOrderInfo = await Orders.getOrdersById(id);

		for (const item of dataOrderInfo) {
			const datapromotion = await Promotions.getPromotionsById(item.promotion_id);
			if (datapromotion && datapromotion.quantity_promotion !== undefined) {
				oldQuantity = datapromotion.quantity_promotion;
				const newQuantity = oldQuantity + 1;
				await Promotions.updateQuantityPromotion(item.promotion_id, newQuantity);
			}

			const dataProduct = await Products.getProductsById(item.idProduct);
			if (dataProduct && dataProduct.length > 0) {
				const updatedQuantity = dataProduct[0].quantity + item.quantity;
				await Products.updateQuantity(item.idProduct, updatedQuantity);
			}

		}
		 await Orderdetails.deleteOrderdetails(id)
		const deletedOrders = await Orders.deleteOrders(id);
		res.status(200).json({ message: 'Xóa đơn hàng thành công', deletedOrders });

	} catch (error) {
		console.error("Lỗi server:", error);
		res.status(500).json({ message: 'Lỗi server', error: error.message });
	}
};

exports.sendOrder = async (req, res) => {
	try {
		const { email, phone, name, orderId, productName, quantity, price, total, address, date } = req.body;
		const subject = 'Thông tin đặt hàng thành công';
		const message = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Thông tin đặt hàng thành công</title>
    <style>
      body {
        font-family: "Arial", sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        width: 700px;
        margin: 30px auto;
        background-color: #fff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-top: 20px solid #ab1f43;
      }
      .header {
        background-color: #ab1f43;
        color: #fff;
        padding: 20px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .section {
        padding: 30px;
        border-bottom: 1px dashed #ccc;
      }
      .section:last-child {
        border-bottom: none;
      }
      .section h2 {
        margin-top: 0;
        color: #ab1f43;
      }
      .info p {
        margin: 5px 0;
        font-size: 15px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .table th, .table td {
        padding: 12px 10px;
        border-bottom: 1px solid #eee;
        text-align: left;
      }
      .table th {
        background-color: #f2f2f2;
      }
      .total {
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        color: #ab1f43;
        margin-top: 20px;
      }
      .footer {
        padding: 20px 30px;
        text-align: center;
        font-size: 15px;
        background-color: #f7f7f7;
        color: #ab1f43;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>THÔNG TIN ĐẶT HÀNG</h1>
        <strong>Đơn hàng #${orderId}</strong>
      </div>
      <div class="section info">
        <h2>Khách hàng</h2>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>SĐT:</strong> ${phone}</p>
        <p><strong>Địa chỉ giao hàng:</strong> ${address}</p>
        <p><strong>Ngày đặt hàng:</strong> ${date}</p>
      </div>
      <div class="section">
        <h2>Chi tiết đơn hàng</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${productName}</td>
              <td>${quantity}</td>
              <td>${price}</td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
        <p class="total">TỔNG TIỀN: ${total}</p>
      </div>
      <div class="footer">
        <p><strong>Jeep Bicycle xin chân thành cảm ơn bạn đã tin tưởng!</strong></p>
      </div>
    </div>
  </body>
</html>
`;
		const result = await SendEmail.sendEmail(email, subject, message);
		if (result) {
			res.status(200).json({ message: 'Gửi thông tin đặt hàng thành công qua email thành công' });
		} else {
			res.status(500).json({ message: 'Gửi thông tin đặt hàng thành công qua email thất bại' });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: 'Gửi thông tin đặt hàng thành công qua email thất bại' });
	}
};
