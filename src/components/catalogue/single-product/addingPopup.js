import React, {Component} from "react";

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productDetails: {
                productCode: "",
                vendor: "",
                productName: "",
                serviceName: "",
                colours: ["Red", "Green", "Yellow"],
                tags: ["example", "example", "example"],
                linkUrl: "",
                stock: "",
                brand: "",
                printArea: "",
                freightDescription: "",
                individualProductPackaging: "",
                stdProductionTime: "",
                size: [],
                category: "",
                subCategory: "",
                description: "",
                primaryPriceDescription: "",
                cartonHeight: "",
                cartonWidth: "",
                cartonDepth: "",
                cartonWeight: "",
                qtyPerCarton: "",
                cartonCubic: "",
                cartonNotes: [],
                qtyBreakPoint1: "",
                qtyBreakPoint1Price: "",
                qtyBreakPoint2: "",
                qtyBreakPoint2Price: "",
                qtyBreakPoint3: "",
                qtyBreakPoint3Price: "",
                qtyBreakPoint4: "",
                qtyBreakPoint4Price: "",
                parentProductCode: "",
                decorationName: "",
                decorationAreas: [],
                decorationAdditional_0_qty_0: "",
                decorationAdditional_0_price_0: "",
                decorationAdditional_0_qty_1: "",
                decorationAdditional_0_price_1: "",
                decoration_0_setupNotes: "",
                decoration_0_setupCost_0: ""
            },
            tagInputValue: "",
            colourInputValue: "",
            sizeInputValue: ""
        }
    }

    getProductDetails(name, value) {
        this.setState({
            productDetails: {
                ...this.state.productDetails,
                [name]: value
            }
        })
    }

    getInputedTag(tagGroup, tag) {
        let updatedTags = [...this.state.productDetails[tagGroup], tag];
        this.setState({
            productDetails: {
                ...this.state.productDetails,
                [tagGroup]: updatedTags
            },
            tagInputValue: "",
            colourInputValue: "",
            sizeInputValue: ""
        })
    }

    removeTag(tagGroup, index) {
        let updatedTags = [...this.state.productDetails[tagGroup]];
        updatedTags.splice(index, 1);
        this.getProductDetails(tagGroup, updatedTags);
    }

    render() {
        const {productDetails, tagInputValue, colourInputValue, sizeInputValue} = this.state;
        const {closeModal} = this.props;

        return <div className="product-adding-popup">
            <button className="closing-button" onClick={closeModal}>
                <i className="material-icons">close</i>
            </button>
            <header className="popup_header_block">
                <h3>Add product information</h3>
                <p>Provide the following information to
                    add a product</p>
            </header>
            <section className="main-content">
                <div className="input-wrapper">
                    <label>Product name</label>
                    <input type="text"
                           name="productName"
                           value={productDetails.productName}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
                <div className="input-wrapper">
                    <label>Vendor</label>
                    <select name="vendor"
                            value={productDetails.vendor}
                            onChange={(e) => {
                                this.getProductDetails(e.target.name, e.target.value)
                            }}>
                        <option value="opt1">Option 1</option>
                        <option value="opt2">Option 2</option>
                        <option value="opt3">Option 3</option>
                        <option value="opt4">Option 4</option>
                    </select>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>Product code</label>
                        <input type="text"
                               name="productCode"
                               value={productDetails.productCode}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Service name</label>
                        <input type="text"
                               name="serviceName"
                               value={productDetails.serviceName}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>Stock</label>
                        <input type="text"
                               name="stock"
                               value={productDetails.stock}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Brand</label>
                        <input type="text"
                               name="brand"
                               value={productDetails.brand}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper tag-adder">
                    <label>Product colours</label>
                    <input type="text"
                           name="colourInputValue"
                           value={colourInputValue}
                           onKeyDown={(e) => {
                               if (e.keyCode === 13) {
                                   this.getInputedTag("colours", e.target.value)
                               }
                           }}
                           onChange={(e) => this.setState({
                               colourInputValue: e.target.value
                           })}/>
                </div>
                <div className="tags_button_block">
                    {productDetails.colours && productDetails.colours.map((item, index) => {
                        return <button key={index}>
                            {item}
                            <i className="material-icons"
                               onClick={() => this.removeTag("colours", index)}>close</i>
                        </button>
                    })}
                </div>
                <div className="input-wrapper tag-adder">
                    <label>Size</label>
                    <input type="text"
                           name="sizeInputValue"
                           value={sizeInputValue}
                           onKeyDown={(e) => {
                               if (e.keyCode === 13) {
                                   this.getInputedTag("size", e.target.value)
                               }
                           }}
                           onChange={(e) => this.setState({
                               sizeInputValue: e.target.value
                           })}/>
                </div>
                <div className="tags_button_block">
                    {productDetails.size && productDetails.size.map((item, index) => {
                        return <button key={index}>
                            {item}
                            <i className="material-icons"
                               onClick={() => this.removeTag("size", index)}>close</i>
                        </button>
                    })}
                </div>
                <div className="input-wrapper tag-adder">
                    <label>Tags</label>
                    <input type="text"
                           name="tagInputValue"
                           value={tagInputValue}
                           onKeyDown={(e) => {
                               if (e.keyCode === 13) {
                                   this.getInputedTag("tags", e.target.value)
                               }
                           }}
                           onChange={(e) => this.setState({
                               tagInputValue: e.target.value
                           })}/>
                </div>
                <div className="tags_button_block">
                    {productDetails.tags && productDetails.tags.map((item, index) => {
                        return <button key={index}>
                            {item}
                            <i className="material-icons"
                               onClick={() => this.removeTag("tags", index)}>close</i>
                        </button>
                    })}
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>Link Url</label>
                        <input type="text"
                               name="linkUrl"
                               value={productDetails.linkUrl}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Print Area</label>
                        <input type="text"
                               name="printArea"
                               value={productDetails.printArea}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper">
                    <label>Freight Description</label>
                    <input type="text"
                           name="freightDescription"
                           value={productDetails.freightDescription}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
                <div className="input-wrapper">
                    <label>Description</label>
                    <input type="text"
                           name="description"
                           value={productDetails.description}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
                <div className="input-wrapper">
                    <label>Primary Price Description</label>
                    <input type="text"
                           name="primaryPriceDescription"
                           value={productDetails.primaryPriceDescription}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>Individual Product Packaging</label>
                        <input type="text"
                               name="individualProductPackaging"
                               value={productDetails.individualProductPackaging}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>Standard Production Time</label>
                        <input type="text"
                               name="stdProductionTime"
                               value={productDetails.stdProductionTime}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>Category</label>
                        <select name="category"
                                value={productDetails.category}
                                onChange={(e) => {
                                    this.getProductDetails(e.target.name, e.target.value)
                                }}>
                            <option value="opt1">Option 1</option>
                            <option value="opt2">Option 2</option>
                            <option value="opt3">Option 3</option>
                            <option value="opt4">Option 4</option>
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <label>Subcategory</label>
                        <select name="subCategory"
                                value={productDetails.subCategory}
                                onChange={(e) => {
                                    this.getProductDetails(e.target.name, e.target.value)
                                }}>
                            <option value="opt1">Option 1</option>
                            <option value="opt2">Option 2</option>
                            <option value="opt3">Option 3</option>
                            <option value="opt4">Option 4</option>
                        </select>
                    </div>
                </div>
                <div className="input-wrapper-for-sm carton-details">
                    <header>Carton Details</header>
                    <div className="wrapper-row">
                        <div className="input-wrapper">
                            <label>Height</label>
                            <input type="text"
                                   name="cartonHeight"
                                   value={productDetails.cartonHeight}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Width</label>
                            <input type="text"
                                   name="cartonWidth"
                                   value={productDetails.cartonWidth}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Depth</label>
                            <input type="text"
                                   name="cartonDepth"
                                   value={productDetails.cartonDepth}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Weight</label>
                            <input type="text"
                                   name="cartonWeight"
                                   value={productDetails.cartonWeight}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Carton QTY</label>
                            <input type="text"
                                   name="qtyPerCarton"
                                   value={productDetails.qtyPerCarton}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                        <div className="input-wrapper">
                            <label>Cubic</label>
                            <input type="text"
                                   name="cartonCubic"
                                   value={productDetails.cartonCubic}
                                   onChange={(e) => {
                                       this.getProductDetails(e.target.name, e.target.value)
                                   }}/>
                        </div>
                    </div>
                </div>
                <div className="input-wrapper">
                    <label>Carton Notes</label>
                    <input type="text"
                           name="cartonNotes"
                           value={productDetails.cartonNotes}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>QTY Break Point 1</label>
                        <input type="text"
                               name="qtyBreakPoint1"
                               value={productDetails.qtyBreakPoint1}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>QTY Break Point 1 Price</label>
                        <input type="text"
                               name="qtyBreakPoint1Price"
                               value={productDetails.qtyBreakPoint1Price}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>QTY Break Point 2</label>
                        <input type="text"
                               name="qtyBreakPoint2"
                               value={productDetails.qtyBreakPoint2}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>QTY Break Point 2 Price</label>
                        <input type="text"
                               name="qtyBreakPoint2Price"
                               value={productDetails.qtyBreakPoint2Price}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>QTY Break Point 3</label>
                        <input type="text"
                               name="qtyBreakPoint3"
                               value={productDetails.qtyBreakPoint3}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>QTY Break Point 3 Price</label>
                        <input type="text"
                               name="qtyBreakPoint3Price"
                               value={productDetails.qtyBreakPoint3Price}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper-for-sm">
                    <div className="input-wrapper">
                        <label>QTY Break Point 4</label>
                        <input type="text"
                               name="qtyBreakPoint4"
                               value={productDetails.qtyBreakPoint4}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                    <div className="input-wrapper">
                        <label>QTY Break Point 4 Price</label>
                        <input type="text"
                               name="qtyBreakPoint4Price"
                               value={productDetails.qtyBreakPoint4Price}
                               onChange={(e) => {
                                   this.getProductDetails(e.target.name, e.target.value)
                               }}/>
                    </div>
                </div>
                <div className="input-wrapper">
                    <label>Parent product code</label>
                    <input type="text"
                           name="parentProductCode"
                           value={productDetails.parentProductCode}
                           onChange={(e) => {
                               this.getProductDetails(e.target.name, e.target.value)
                           }}/>
                </div>
            </section>
        </div>
    }
}

export default AddProduct;