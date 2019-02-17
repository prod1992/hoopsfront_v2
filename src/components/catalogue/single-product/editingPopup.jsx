import React, {Component} from "react";
import {editProduct} from '../../../store/actions/product-actions';
import getApiCredentials from './../../../core/constants/index';
import {connect} from "react-redux";

class EditingPopup extends Component {
    constructor() {
        super();

        this.state = {
            productInfo: {
                brand: "",
                name: "",
                vendor_id: "",
                category: "",
                sub_category: "",
                minimum_order_quantity: 0,
                tags: [],
                link_url: ""
            },
            tagInputValue: ""
        };

        this.updateProduct = this.updateProduct.bind(this);

    }

    componentDidMount() {
        const {tags, category, sub_category, brand, name, services, link_url} = this.props.productData;
        this.setState({
            productInfo: {
                ...this.state.productInfo,
                tags, name, category, sub_category, link_url, brand,
                minimum_order_quantity: services[0].minimum_order_quantity
            }
        })
    }

    updateProduct() {
        let token = localStorage['userToken'];
        let uri = getApiCredentials.host + `/api/products/update/${this.props.productData.productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify(this.state.productInfo)
        };
        const reqInstance = new Request(uri, requestOptions);
        fetch(reqInstance)
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
            })
            .catch((err) => console.log("error ", err))
    }

    getEditedInfo(name, value) {
        this.setState({
            productInfo: {
                ...this.state.productInfo,
                [name]: value
            }
        })
    }

    removeTag(index) {
        let updatedTags = [...this.state.productInfo.tags];
        updatedTags.splice(index, 1);
        this.getEditedInfo("tags", updatedTags);
    }

    getInsertedTags(tagName) {
        let updatedTags = [...this.state.productInfo.tags, tagName];
        this.setState({
            productInfo: {
                ...this.state.productInfo,
                tags: updatedTags
            },
            tagInputValue: ""
        })
    }

    render() {
        const {tagInputValue, productInfo} = this.state;
        const {productData} = this.props;

        return <div className="popup_main_block edit_popup">
            <div className="popup">
                <div className="popup_content">
                    <span className="close_popup"
                          onClick={() => this.props.closeModal()}/>
                    <div className="popup_header_block">
                        <h3>Edit product detail</h3>
                        <p>Provide the following information to edit product detail</p>
                    </div>
                    <div className="popup_vendor_block">
                        <div className="popup_vendor_block">
                            <div className="popup_vendor_block_title">
                                <h3>Vendor</h3>
                            </div>
                            <select className="hoops_map_select"
                                    value={productInfo.vendor_id}
                                    onChange={(e) => this.getEditedInfo("vendor_id", e.target.value)}>
                                <option value="select1">Example Vendor</option>
                                <option value="select2">Select2</option>
                                <option value="select3">Select3</option>
                                <option value="select4">Select4</option>
                            </select>
                        </div>
                    </div>
                    <div className="popup_product_name_block">
                        <div className="popup_product_title">
                            <div className="popup_product_select_block">
                                <span>Product name</span>
                                <input type="text" placeholder="Example T-Shirt"
                                       value={productInfo.name}
                                       onChange={(e) => this.getEditedInfo("name", e.target.value)}/>
                            </div>
                        </div>
                        <div className="brand_block">
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <span>Brand</span>
                                    <input type="text" placeholder="Example Brand"
                                           value={productInfo.brand}
                                           onChange={(e) => this.getEditedInfo("brand", e.target.value)}/>
                                </div>
                            </div>
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <span>Min order Qty</span>
                                    <input type="number"
                                           value={productInfo.minimum_order_quantity}
                                           onChange={(e) => this.getEditedInfo("minimum_order_quantity", e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="brand_block">
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <div className="popup_vendor_block_title">
                                        <h3>Category</h3>
                                    </div>
                                    <select className="hoops_map_select"
                                            value={productInfo.category}
                                            onChange={(e) => this.getEditedInfo("category", e.target.value)}>
                                        <option value="select1">T-Shirts</option>
                                        <option value="select2">Select2</option>
                                        <option value="select3">Select3</option>
                                        <option value="select4">Select4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <div className="popup_vendor_block_title">
                                        <h3>Sub category</h3>
                                    </div>
                                    <select className="hoops_map_select"
                                            value={productInfo.sub_category}
                                            onChange={(e) => this.getEditedInfo("sub_category", e.target.value)}>
                                        <option value="select1">Short Sleeve</option>
                                        <option value="select2">Select2</option>
                                        <option value="select3">Select3</option>
                                        <option value="select4">Select4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="tags_block">
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <span>Tags</span>
                                    <input type="text"
                                           value={tagInputValue}
                                           onKeyDown={(e) => {
                                               if (e.keyCode === 13) {
                                                   this.getInsertedTags(e.target.value)
                                               }
                                           }}
                                           onChange={(e) => this.setState({
                                               tagInputValue: e.target.value
                                           })}/>
                                </div>
                            </div>
                            <div className="brand_block_itemss">
                                <div className="popup_product_select_block">
                                    <span>Link Url</span>
                                    <input type="text"
                                           value={productInfo.link_url}
                                           onChange={(e) => this.getEditedInfo("link_url", e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="tags_button_block">
                            {productInfo.tags && productInfo.tags.map((item, index) => {
                                return <button key={index}>
                                    {item}
                                    <i className="material-icons"
                                       onClick={() => this.removeTag(index)}>close</i>
                                </button>
                            })}
                        </div>
                    </div>
                    <div className="popup_sav_and_edit_block">
                        <div className="popup_cancel"
                             onClick={() => this.props.closeModal()}>
                            <span className="cancel_block"/>
                            <span className="popup_cancel_text">Cancel</span>
                        </div>
                        <button className="popup_save"
                                onClick={this.updateProduct}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        editingProductData: state.editingProductData
    };
}

export default connect(mapStateToProps)(EditingPopup);