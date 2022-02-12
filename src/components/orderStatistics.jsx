const OrderStatistics = (props) => {
  return (
    <div className="container m-3">
      <div className="row">
        <div className="col">
          <div className="card text-light bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Shipped Orders</h5>
              <h1 className="card-text text-center">{props.shippedOrders}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-black bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">To be Shipped Orders</h5>
              <h1 className="card-text text-center">
                {props.notShippedYetOrders}
              </h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-light bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Refunded Orders</h5>
              <h1 className="card-text text-center">{props.refundedOrders}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-dark bg-light mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Orders</h5>
              <h1 className="card-text text-center">{props.totalOrders}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-light bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title text-center">Total Sales</h5>
              <h1 className="card-text text-center">${props.totalSales}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
