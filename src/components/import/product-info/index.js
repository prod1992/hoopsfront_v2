import React, { Component } from "react";
import ImportedProperty from "../../../containers/imported-property";
import VideoBtn from "../../shared/video-btn";

class ProductInfo extends Component {
  render() {
    const { importFileData } = this.props;
    console.log(importFileData);
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
              Product info mapping
            </span>
          </div>
          <div className="watch_the_video">
            <VideoBtn />
          </div>
        </div>
        <div className="hoops_map_table">
          <table className="hoops_map_table_in_table">
            <thead>
              <tr>
                <td>
                  <span>Map to fields in Hoops</span>
                </td>
                <td />
                <td>
                  <span>Fields in your file</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {importFileData &&
                importFileData.db_fields.map((item, index) => {
                  if (index < 13) {
                    return (
                      <tr key={index}>
                        <td>
                          <span>{item.label}</span>
                          {item.required && (
                            <button className="hoops_map_table_required_button">
                              Required
                            </button>
                          )}
                          {item.recomended && (
                            <button className="hoops_map_table_recommended_button">
                              Recommended
                            </button>
                          )}
                          <a href="#" className="what_this_link">
                            What's This?
                          </a>
                        </td>
                        <td>
                          <i className="material-icons table_right_arrow">
                            trending_flat
                          </i>
                        </td>
                        <td>
                          <ImportedProperty
                            propertyItem={item}
                            propertyOptions={importFileData.csv_headers}
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
