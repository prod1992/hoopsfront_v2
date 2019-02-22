import React, { Component } from "react";
import ImportedProperty from "../../../containers/imported-property";
import VideoBtn from "../../shared/WatchVideoButton";

class AdditionalCost extends Component {
  constructor(props) {
    super(props);
    this.toggleAdditionalBlock = this.toggleAdditionalBlock.bind(this);
    this.addMoreAdditionalBlock = this.addMoreAdditionalBlock.bind(this);
    this.addMorePriceBreaks = this.addMorePriceBreaks.bind(this);
    this.state = {
      showAdditionalBlock: false,
      additionalBlockCount: 1,
      priceBreaksCount: [1]
    };
  }

  toggleAdditionalBlock(e) {
    const value = e.target.value;
    if (value == 1) {
      this.setState({
        showAdditionalBlock: true
      });
    } else {
      this.setState({
        showAdditionalBlock: false
      });
    }
  }

  addMorePriceBreaks(index) {
    this.setState(prevState => {
      const breaksCount = [].concat(prevState.priceBreaksCount);
      breaksCount[index] ? (breaksCount[index] += 1) : (breaksCount[index] = 1);
      return { priceBreaksCount: breaksCount };
    });
  }

  addMoreAdditionalBlock() {
    this.setState(prevState => {
      const { additionalBlockCount, priceBreaksCount } = prevState;
      const newPriceBreaksCount = [].concat(priceBreaksCount);
      newPriceBreaksCount.push(1);
      return {
        additionalBlockCount: additionalBlockCount + 1,
        priceBreaksCount: newPriceBreaksCount
      };
    });
  }

  getAdditionalBlock(i) {
    const { importFileData } = this.props;

    console.log("getAdditionalBlock");
    return (
      <div className="additional_cost_block" key={i + 1000}>
        <div className="additional_cost_title_block">
          <div className="Additional_cost_name">
            <h3>Additional cost {i + 1}</h3>
          </div>
          <div className="minus_block" />
        </div>
        <div className="step_4_description">
          <div className="description_items">
            <div className="minimum_order_block_title">
              <h3>Description</h3>
              <button className="hoops_map_table_required_button">
                Required
              </button>
              <a href="#" className="what_this_link">
                What's This?
              </a>
            </div>
            <ImportedProperty
              propertyItem={{ name: `description` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="description_items">
            <div className="minimum_order_block_title">
              <h3>Notes</h3>
              <button className="hoops_map_table_required_button d_none">
                Required
              </button>
              <a href="#" className="what_this_link">
                What's This?
              </a>
            </div>
            <ImportedProperty
              propertyItem={{ name: `notes` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="description_items">
            <div className="minimum_order_block_title">
              <h3>Setup Cost</h3>
              <button className="hoops_map_table_required_button d_none">
                Required
              </button>
              <a href="#" className="what_this_link">
                What's This?
              </a>
            </div>
            <ImportedProperty
              propertyItem={{ name: `setup_cost` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
        </div>
        {this.getPriceBreakArray(i).map(item => item)}
        <div className="add_more_breaks">
          <button onClick={() => this.addMorePriceBreaks(i)}>
            Add More Price Breaks
          </button>
        </div>
      </div>
    );
  }

  getAdditionalBlockArray() {
    const { additionalBlockCount } = this.state;
    let service = [];
    for (let i = 0; i < additionalBlockCount; i++) {
      const singleRow = this.getAdditionalBlock(i);
      service.push(singleRow);
    }
    return service;
  }
  getPriceBreak(i) {
    const { importFileData } = this.props;
    return (
      <div className="quantity_break_block" key={i + 100}>
        <div className="quantity_break_block_content">
          <div className="quantity_break_block_items">
            <div className="minimum_order_block_title">
              <h3>Quantity break point {i}</h3>
              <button className="hoops_map_table_required_button">
                Required
              </button>
              <a href="#" className="what_this_link">
                What's This?
              </a>
            </div>
            <ImportedProperty
              propertyItem={{ name: `quantity_break_point_${i}` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="quantity_break_block_items">
            <div className="minimum_order_block_title">
              <h3>Quantity break point {i} price</h3>
              <button className="hoops_map_table_required_button">
                Required
              </button>
              <a href="#" className="what_this_link">
                What's This?
              </a>
            </div>
            <ImportedProperty
              propertyItem={{ name: `quantity_break_point_${i}_price` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
        </div>
      </div>
    );
  }

  getPriceBreakArray(index) {
    const { priceBreaksCount } = this.state;
    let priceRows = [];
    for (let i = 0; i < priceBreaksCount[index]; i++) {
      const singleRow = this.getPriceBreak(i + 1);
      priceRows.push(singleRow);
    }
    return priceRows;
  }

  render() {
    return (
      <div className="product_mapping_block">
        <div className="product_mapping_block_title">
          <div className="product_info">
            <div className="product_info_icon_block">
              <i className="material-icons white-text product_info_icon_block_icon">
                beenhere
              </i>
            </div>
            <span className="product_info_icon_block_text">
              Services price mapping
            </span>
          </div>
          <div className="watch_the_video">
            <VideoBtn />
          </div>
        </div>
        <div className="step_3_catalogue_multiple">
          <div className="step_3_catalogue_multiple_content">
            <div className="step_3_catalogue_multiple_items">
              <div className="step_3_catalogue_title">
                <h3>Does this catalogue have multiple service options?</h3>
                <a
                  href="http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="what_this_link"
                >
                  What's This?
                </a>
              </div>
              <p className="standard_product_step_3">
                Eg. Standard Production, Rush Service, Indent etc
              </p>
            </div>
            <div className="step_3_catalogue_multiple_items">
              <label className="step_3_catalogue_multiple_items_label">
                <input
                  type="radio"
                  name="radio"
                  value={1}
                  onChange={this.toggleAdditionalBlock}
                />
                <span className="step_3_catalogue_multiple_items_label_checkmark" />
                Yes
              </label>
              <label className="step_3_catalogue_multiple_items_label">
                <input
                  type="radio"
                  name="radio"
                  value={2}
                  onChange={this.toggleAdditionalBlock}
                />
                <span className="step_3_catalogue_multiple_items_label_checkmark" />
                No
              </label>
            </div>
          </div>
        </div>
        {this.state.showAdditionalBlock && (
          <div>
            {this.getAdditionalBlockArray().map(item => item)}
            <div className="add_more_breaks">
              <button onClick={this.addMoreAdditionalBlock}>
                Add More Price Breaks
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdditionalCost;
