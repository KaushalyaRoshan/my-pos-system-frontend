import React from "react";
import { getCountries } from "./data/countries";
import { v4 as uuidv4 } from "uuid";
import InputField from "./common/inputField";
import { addOrder, getorders } from "./data/orders";
import { getProducts } from "./data/products";

class AddOrder extends React.Component {
  state = {};

  handleCountryChange(event) {
    const country = getCountries()[event.target.value].name;

    this.setState({
      address: { ...this.state.address, country: country },
    });
  }

  handleOrderStatusChange(event) {
    this.setState({ orderStatus: event.target.value });
  }

  async handleInputChange(event) {
    await this.setState({ [event.target.name]: event.target.value });
    if (
      event.target.name === "itemQuantity" ||
      event.target.name === "itemCost" ||
      event.target.name === "shippingCost" ||
      event.target.name === "aliexpressTax" ||
      event.target.name === "discount" ||
      event.target.name === "shippingCharge" ||
      event.target.name === "ebayFee" ||
      event.target.name === "otherFee" ||
      event.target.name === "soldPrice"
    ) {
      this.handleCalculateTotalCost();
      this.handleCalculateProfit();
    }
  }

  handleProductInput(event) {
    const productName = getProducts()[event.target.value].productName;
    const ebayURL = getProducts()[event.target.value].ebayURL;
    const productSupplierURL =
      getProducts()[event.target.value].productSupplierURL;
    const supplierStoreURL = getProducts()[event.target.value].supplierStoreURL;
    this.setState({
      productName: productName,
      ebayURL,
      productSupplierURL,
      supplierStoreURL,
    });
  }

  handleAddressInput(event) {
    const address = { ...this.state.address };
    address[event.target.name] = event.target.value;
    this.setState({ address });
  }

  handleIdGenerator() {
    // const id = uuidv4();
    // console.log(id);
    console.log(this.state);
  }

  handleGetDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  async handleCalculateTotalCost() {
    const { itemQuantity, itemCost, shippingCost, aliexpressTax, discount } =
      this.state;

    let totalCost = (
      parseInt(itemQuantity) * parseFloat(itemCost) +
      parseFloat(shippingCost) +
      parseFloat(aliexpressTax) -
      parseFloat(discount)
    ).toFixed(2);
    await this.setState({ totalCost: totalCost });
    console.log(this.state.totalCost);
  }

  async handleCalculateProfit() {
    const {
      shippingCharge,
      ebayFee,
      otherFee,
      soldPrice,
      totalCost,
      itemQuantity,
    } = this.state;

    let profit = (
      parseInt(itemQuantity) * parseFloat(soldPrice) +
      parseFloat(shippingCharge) -
      (parseFloat(totalCost) + parseFloat(ebayFee) + parseFloat(otherFee))
    ).toFixed(2);
    await this.setState({ profit: profit });
  }

  handleSubmit() {
    addOrder(this.state);
  }

  constructor() {
    super();
    this.state = {
      _id: uuidv4(),
      no: getorders().length + 1,
      aliExpressOrderDate: this.handleGetDate(),
      productName: "",
      ebayOrderNumber: "",
      aliexpressOrderNumber: "",
      buyerName: "",
      email: "",
      buyerUserName: "",
      buyerURL: "",
      address: {
        shipTo: "",
        street: "",
        city: "",
        stateOrProvince: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
      },
      trackingNumber: "",
      ebayCarrier: "",
      carrier: "",
      estimatedDeliveryTime: "",
      orderStatus: "Not Shipped Yet",
      actualDeliveryTime: "",
      itemQuantity: 0,
      itemCost: 0.0,
      shippingCharge: 0.0,
      shippingCost: 0.0,
      aliexpressTax: 0.0,
      discount: 0.0,
      totalCost: 0.0,
      ebayFee: 0.0,
      otherFee: 0.0,
      soldPrice: 0.0,
      profit: 0.0,
      totalCostLKR: 0.0,
      usdToLKR: 0.0,
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddressInput = this.handleAddressInput.bind(this);
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this);
    this.handleGetDate = this.handleGetDate.bind(this);
    this.handleProductInput = this.handleProductInput.bind(this);
    this.handleCalculateTotalCost = this.handleCalculateTotalCost.bind(this);
    this.handleCalculateProfit = this.handleCalculateProfit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidUpdate() {
  //   this.handleCalculateTotalCost();
  // }

  render() {
    return (
      <div className="m-2">
        <button
          className="btn btn-primary"
          onClick={() => this.handleIdGenerator()}
        >
          click
        </button>
        <form>
          <h3>Order Details</h3>
          <InputField
            onChange={this.handleInputChange}
            id="ebayOrderNumber"
            placeholder="eBay Order Number"
          />
          <InputField
            onChange={this.handleInputChange}
            id="aliexpressOrderNumber"
            placeholder="Aliexpress Order Number"
          />
          <InputField
            onChange={this.handleInputChange}
            id="buyerName"
            placeholder="Buyer Name"
          />
          <InputField
            onChange={this.handleInputChange}
            id="email"
            placeholder="email"
          />
          <InputField
            onChange={this.handleInputChange}
            id="buyerUserName"
            placeholder="Buyer User Name"
          />
          <InputField
            onChange={this.handleInputChange}
            id="buyerURL"
            placeholder="Buyer URL"
          />
          <select
            className="form-select mb-2"
            aria-label="Select Product"
            onChange={this.handleProductInput}
          >
            <option defaultValue>Select Product</option>
            {getProducts().map((p) => (
              <option
                key={getProducts().findIndex(
                  (a) => a.productName === p.productName
                )}
                value={getProducts().findIndex(
                  (a) => a.productName === p.productName
                )}
                onChange={this.handleCountryChange}
              >
                {p.productName}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            aria-label="Order Status"
            onChange={this.handleOrderStatusChange}
          >
            <option defaultValue>Order Status</option>
            <option value="Not Shipped Yet">Not Shipped Yet</option>
            <option value="Shipped">Shipped</option>
            <option value="Refunded">Refunded</option>
          </select>

          <div className="card mb-2 mt-2">
            <div className="card-body">
              <h3 className="ms-1">Address</h3>
              <div className="container">
                <div className="row">
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="shipTo"
                      placeholder="Ship To"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="street"
                      placeholder="Street"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="city"
                      placeholder="City"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="phoneNumber"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="stateOrProvince"
                      placeholder="State/Province"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleAddressInput}
                      id="zipCode"
                      placeholder="Zip Code"
                    />
                  </div>

                  <div className="col-sm px-1">
                    <select
                      className="form-select"
                      aria-label="Select Country"
                      onChange={this.handleCountryChange}
                    >
                      <option defaultValue>Select Country</option>
                      {getCountries().map((c) => (
                        <option
                          key={getCountries().findIndex(
                            (a) => a.name === c.name
                          )}
                          value={getCountries().findIndex(
                            (a) => a.name === c.name
                          )}
                          onChange={this.handleCountryChange}
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <h3 className="ms-1">Tracking Information</h3>
              <div className="container">
                <div className="row">
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="trackingNumber"
                      placeholder="Tracking Number"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="ebayCarrier"
                      placeholder="eBay Carrier"
                    />
                  </div>

                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="carrier"
                      placeholder="Carrier"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="estimatedDeliveryTime"
                      placeholder="Estimated Delivery Time"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-body">
              <h3 className="ms-1">Items Information</h3>
              <div className="container">
                <div className="row">
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="itemQuantity"
                      placeholder="Item Quantity"
                    />
                  </div>

                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="itemCost"
                      placeholder="Item Cost"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="shippingCharge"
                      placeholder="Shipping Charge"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="shippingCost"
                      placeholder="Shipping Cost"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="aliexpressTax"
                      placeholder="Aliexpress Tax"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="discount"
                      placeholder="Discount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="ebayFee"
                      placeholder="ebay Fee"
                    />
                  </div>

                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="otherFee"
                      placeholder="Other Fee"
                    />
                  </div>
                  <div className="col-sm px-1">
                    <InputField
                      onChange={this.handleInputChange}
                      id="soldPrice"
                      placeholder="Sold Price"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mb-2 p-0">
            <div className="container p-0">
              <div className="row">
                <div className="col">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h1>Total Cost</h1>
                      <h2>${parseFloat(this.state.totalCost).toFixed(2)}</h2>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="col">
                    <div className="card bg-light">
                      <div className="card-body text-center">
                        <h1>Profit</h1>
                        <h2>${parseFloat(this.state.profit).toFixed(2)}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.props.onSubmit(this.state)}
          >
            Submit
          </button>
        </form>
        {/* <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.props.onSubmit(this.state)}
        >
          Submit
        </button> */}
      </div>
    );
  }
}

export default AddOrder;
