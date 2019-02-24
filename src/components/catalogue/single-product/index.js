import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import getApiCredentials from "./../../../core/constants/index";

import EditingPopup from "./editingPopup";

Modal.setAppElement("#root");

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      product: {}
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.imageSelector = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProduct(id);
  }

  getProduct(productId) {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + `/api/products/${productId}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        this.setState({ product: data });
      })
      .catch(err => console.log("error ", err));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];

    let data = new FormData();

    data.append("file", file, file.name);

    console.log(file, data);
  }

  render() {
    const { product } = this.state;
    const price = product.price ? product.price.toFixed(2) : "";

    return (
      product && (
        <div className="single-product-wrapper">
          <div className="single-product-data">
            <div className="product-img-wrap">
              <div className="image-wrapper-inner">
                <img src="../../../../assets/resources/images/24365700.jpg" />
                <button
                  className="image-selector"
                  onClick={() => this.imageSelector.current.click()}
                >
                  <i className="material-icons">edit</i>
                </button>
                <input
                  type="file"
                  ref={this.imageSelector}
                  className="d-none"
                  onChange={e => this.handleImageChange(e)}
                />
              </div>
            </div>
            <div className="product-info">
              <div className="product-head-info">
                <div className="product-heading-column">
                  <a href="" className="product-link-to">
                    {product.name}
                  </a>
                  <div className="brand-row">
                    <span>Brand: </span>
                    <span>{product.brand}</span>
                  </div>
                </div>
                <div className="product-head-item">
                  <span className="min-order">Min order Qty: N/A</span>
                  <button className="edit-product" onClick={this.openModal}>
                    <i className="material-icons">edit</i>
                    Edit
                  </button>
                  {/*{isOpen &&
                                <div className="popup_main_block">
                                    <div className="popup">
                                        <div className="popup_content">
                                            <span className="close_popup" onClick={this.closeModal}/>
                                            <div className="popup_iframe">
                                                <h3>Edit product detail</h3>
                                                <p className="edit-paragraph">Provide the following information to edit
                                                    product detail</p>
                                                <div className='filter-dropdown'>
                                                    <span className='head'>Vendor</span>
                                                    <div className='select' onClick={() => this.toggle()}>
                                                        Select
                                                        <i className="material-icons dop-icon">keyboard_arrow_down</i>
                                                    </div>
                                                    <div className={this.state.isToggled ? 'toggle open' : 'toggle'}>
                                                        <div className='row-toggle-wrap'>
                                                            <div className='shared-scroll-view'>
                                                                <div className='toggle-row'>
                                                                    <input type='checkbox' id='_1'/>
                                                                    <label htmlFor='_1'>Select</label>
                                                                </div>
                                                                <div className='toggle-row'>
                                                                    <input type='checkbox' id='_2'/>
                                                                    <label htmlFor='_2'>Select</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="filter_search_block">
                                                    <label>Product name</label>
                                                    <input type="text" name="productName" value={productName}
                                                           onChange={(e) => this.changeHandler(e)}/>
                                                </div>
                                                <div className="filter_search_block">
                                                    <label>Brand</label>
                                                    <input type="text" name="brand" value={brand}
                                                           onChange={(e) => this.changeHandler(e)}/>
                                                </div>
                                                <div className="filter_search_block">
                                                    <label>Min order Qty</label>
                                                    <input type="text" name="minOrder" value={minOrder}
                                                           onChange={(e) => this.changeHandler(e)}/>
                                                </div>
                                                <div className="filter_search_block">
                                                    <label>Tags</label>
                                                    <input type="text" name="tags" value={tags}
                                                           onChange={(e) => this.changeHandler(e)}/>
                                                </div>
                                                <div className="filter_search_block">
                                                    <label>Link Url</label>
                                                    <input type="text" name="link" value={link}
                                                           onChange={(e) => this.changeHandler(e)}/>
                                                </div>
                                                <div>
                                                    <button onClick={this.closeModal}>
                                                        <i className="material-icons">
                                                            close
                                                        </i>
                                                        <span>Cancel</span>

                                                    </button>
                                                    <button>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}*/}
                </div>
                <div className="product-head-item">
                  <span className="id-text">Id: {product.code}</span>
                </div>
              </div>
              <div className="options-owner">
                <div className="item">
                  <span>Vendor:</span>
                  {product.vendor ? product.vendor._id : ""}
                </div>
                <span className="line-b" />
                <div className="item">
                  <span>Category:</span>
                  {product.category}
                </div>
                <span className="line-b" />
                <div className="item">
                  <span> Sub Category:</span>
                  {product.sub_category}
                </div>
              </div>
              <div className="price-options">
                <span className="price-p">${price}</span>
                <span className="buy-b">
                  <i className="material-icons">local_mall</i>
                  Buy Price
                </span>
              </div>
              <div className="tag-section-wrapper">
                <div className="tag-section">
                  <div className="item">
                    <span className="properties">Colors:</span>
                    <div className="tags-wrapper">
                      {product.colour &&
                        product.colour.map((colour, i) => (
                          <span key={i} className="tag">
                            {colour}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="item">
                    <span className="properties">Sizes:</span>
                    <div className="tags-wrapper">
                      {product.size &&
                        product.size.map((size, i) => (
                          <span key={i} className="sizes">
                            {size}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="tag-section">
                  <div className="item">
                    <span className="properties">Tags:</span>
                    <div className="tags-wrapper">
                      {product.tags &&
                        product.tags.map((tag, i) => (
                          <span key={i} className="tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="product-editing-modal"
          >
            <EditingPopup
              closeModal={this.closeModal}
              productData={this.state.product}
            />
          </Modal>
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedAll: state.catalogueReducer.selectedAll
  };
}

export default connect(mapStateToProps)(SingleProduct);
