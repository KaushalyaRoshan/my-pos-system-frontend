const Table = (props) => {
  function getOrderStatusColor(orderStatus) {
    let color = "badge bg-";
    if (orderStatus === "Not Shipped Yet") {
      return (color += "warning text-dark");
    } else if (orderStatus === "Shipped") {
      return (color += "success");
    } else if (orderStatus === "Refunded") {
      return (color += "danger");
    } else {
      return;
    }
  }
  return (
    <div>
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Buyer Name</th>
            <th>eBay Order Number</th>
            <th>Aliexpress Order Number</th>
            <th>Tracking Number</th>
            <th>Tracking Carrier</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((element) => (
            <tr key={element._id}>
              <td>{element.no}</td>
              <td>{element.productName}</td>
              <td>{element.buyerName}</td>
              <td>{element.ebayOrderNumber}</td>
              <td>{element.aliexpressOrderNumber}</td>
              <td>{element.trackingNumber}</td>
              <td>{element.ebayCarrier}</td>
              <td>
                <span className={getOrderStatusColor(element.orderStatus)}>
                  {element.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
