const express = require("express");
const cors = require("cors");
const app = express();
//const PORT = 5000;
const PORT = process.env.PORT || 5002; // This lets Render choose the port if it's set

app.use(cors());
app.use(express.json());

function generateRandomId() {
  return "ORD" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

let orders = [];

const menu = [
  {
    id: 1,
    name: "Everyday Essentials",
    unitPrice: 78,
    imageUrl: "http://localhost:3008/bloom/tshirts-1.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Timeless Classic",
    unitPrice: 70,
    imageUrl: "http://localhost:3008/bloom/tshirts-2.jpg",
    soldOut: false,
  },
  {
    id: 3,
    name: "Casual Comfort",
    unitPrice: 73,
    imageUrl: "http://localhost:3008/bloom/tshirts-3.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "Simply Stylish",
    unitPrice: 76,
    imageUrl: "http://localhost:3008/bloom/tshirts-4.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Vibe Check",
    unitPrice: 68,
    imageUrl: "http://localhost:3008/bloom/tshirts-5.jpg",
    soldOut: false,
  },
  {
    id: 6,
    name: "Effortless Cool",
    unitPrice: 77,
    imageUrl: "http://localhost:3008/bloom/tshirts-6.jpg",
    soldOut: false,
  },
  {
    id: 7,
    name: "Trendsetter",
    unitPrice: 80,
    imageUrl: "http://localhost:3008/bloom/tshirts-7.jpg",
    soldOut: false,
  },
  {
    id: 8,
    name: "Daily Dose of Awesome",
    unitPrice: 78,
    imageUrl: "http://localhost:3008/bloom/tshirts-8.jpg",
    soldOut: false,
  },
  {
    id: 9,
    name: "Core Collection",
    unitPrice: 65,
    imageUrl: "http://localhost:3008/bloom/tshirts-9.jpg",
    soldOut: false,
  },
  {
    id: 10,
    name: "Comfort Zone",
    unitPrice: 82,
    imageUrl: "http://localhost:3008/bloom/tshirts-10.jpg",
    soldOut: false,
  },
  {
    id: 11,
    name: "Minimalist Muse",
    unitPrice: 75,
    imageUrl: "http://localhost:3008/bloom/tshirts-11.jpg",
    soldOut: false,
  },
  {
    id: 12,
    name: "Infinite Vibes",
    unitPrice: 74,
    imageUrl: "http://localhost:3008/bloom/tshirts-12.jpg",
    soldOut: false,
  },
  {
    id: 13,
    name: "Urban Explorer",
    unitPrice: 70,
    imageUrl: "http://localhost:3008/bloom/tshirts-13.jpg",
    soldOut: true,
  },
  {
    id: 14,
    name: "Laid-Back Luxe",
    unitPrice: 72,
    imageUrl: "http://localhost:3008/bloom/tshirts-14.jpg",
    soldOut: true,
  },

  {
    id: 15,
    name: "Infinite Vibes",
    unitPrice: 70,
    imageUrl: "http://localhost:3008/bloom/tshirts-15.jpg",
    soldOut: true,
  },
];

// Get menu
app.get("/api/menu", (req, res) => {
  res.status(200).json({ status: "success", data: menu });
});

// Get order by ID
app.get("/api/order/:id", (req, res) => {
  const orderId = req.params.id;
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return res
      .status(404)
      .json({ status: "fail", message: `Couldn't find order #${orderId}` });
  }
  res.status(200).json({ status: "success", data: order });
});

// Create a new order
app.post("/api/order", (req, res) => {
  const cart = req.body.cart || [];
  const priorityFeePerPizza = 2;
  const orderPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  const priorityPrice = req.body.priority
    ? cart.reduce(
        (total, item) => total + priorityFeePerPizza * item.quantity,
        0
      )
    : 0;

  const finalPrice = orderPrice + priorityPrice;

  const estimatedDeliveryTime = new Date();
  estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 30);

  const newOrder = {
    id: generateRandomId(),
    customer: req.body.customer,
    status: req.body.status || "pending",
    priority: req.body.priority || false,
    cart: cart,
    estimatedDelivery: estimatedDeliveryTime.toISOString(),
    orderPrice: orderPrice,
    priorityPrice: priorityPrice,
  };

  orders.push(newOrder);
  res.status(201).json({ status: "success", data: newOrder });
});

app.patch("/api/order/:id", (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ status: "fail", message: `Order not found` });
  }

  orders[orderIndex] = { ...orders[orderIndex], ...req.body };
  res.status(200).json({ status: "success", data: orders[orderIndex] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
