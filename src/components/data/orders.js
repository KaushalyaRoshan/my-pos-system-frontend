const orders = [
  {
    _id: "45642114512121878521",
    no: "01",
    ebayOrderDate: "2021/10/15",
    aliExpressOrderDate: "2021/10/16",
    productName: "Push Pop It Bubble Pops Fidget Sensory Toy",
    ebayURL: "https://ebay.com",
    productSupplierURL: "https://aliexpress.com",
    supplierStoreURL: "https://aliexpress.com",
    ebayOrderNumber: "12551",
    aliexpressOrderNumber: "151515454",
    buyerName: "Mark Zuckerburg",
    email: "gmail@gmail.com",
    buyerUserName: "Mark",
    buyerURL: "https://ebay.com",
    address: {
      shipTo: "Mark",
      street: "main street",
      city: "New York",
      stateOrProvince: "New York",
      zipCode: "454350",
      country: "USA",
      phoneNumber: "545412121454",
    },
    trackingNumber: "545646545",
    ebayCarrier: "DHL",
    carrier: "cainiao",
    estimatedDeliveryTime: "30-50 Days",
    orderStatus: "Shipped",
    actualDeliveryTime: "20 Days", //TODO:Should Implement other class
    itemQuantity: 1,
    itemCost: "50.00",
    shippingCharge: "1.00",
    shippingCost: "2.00",
    aliexpressTax: "10",
    discount: "1.00",
    totalCost: "20.00",
    ebayFee: "5.00",
    otherFee: "2.00",
    soldPrice: 20.53,
    profit: "3.50",
    totalCostLKR: "50.00",
    usdToLKR: 200.15,
  },
];

export function getorders() {
  return orders;
}

export function addOrder(order) {
  orders.push(order);
}

export function getShippedOrders() {
  return orders.filter((order) => order.orderStatus === "Shipped");
}

export function getNotShippedYetOrders() {
  return orders.filter((order) => order.orderStatus === "Not Shipped Yet");
}

export function getRefundedOrders() {
  return orders.filter((order) => order.orderStatus === "Refunded");
}

export function getTotalSales() {
  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  );
  let totalSales = 0;

  // shippedOrders.map((ord) => {
  //   totalSales = totalSales + ord.soldPrice;
  // });
  shippedOrders.forEach((item) => {
    totalSales = totalSales + item.soldPrice;
  });
  console.log(totalSales.toFixed(2));

  return totalSales.toFixed(2);
}
