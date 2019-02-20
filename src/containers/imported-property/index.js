import React, { Component } from "react";
import { connect } from "react-redux";
import { setImportedProperty } from "../../actions/import-actions";
import { PropertyItem } from "../../components/import/imported-property";

class ImportedProperty extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      required: false,
      recomended: false
    };
  }

  componentDidMount() {
    const { propertyItem } = this.props;
    this.setState(prevState => {
      const required = !!propertyItem.required;
      const recomended = !!propertyItem.recomended;
      return { required, recomended };
    });
  }

  onChange(e) {
    const value = e.target.value;
    const {
      propertyItem: { name }
    } = this.props;
    const payload = { name, value };
    console.log(payload);
    this.props.dispatch(setImportedProperty(payload));
  }

  render() {
    const {
      propertyItem: { name },
      propertyOptions
    } = this.props;
    const storeData = this.props.importCatalogFiles.properties.find(
      item => Object.values(item)[0] === name
    );
    let value = "";
    if (storeData) {
      value = storeData.value;
    }
    return (
      <PropertyItem
        name={name}
        required={this.state.required}
        onChange={this.onChange}
        value={value}
        options={propertyOptions}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    importCatalogFiles: state.importCatalogFiles
  };
};

export default connect(mapStateToProps)(ImportedProperty);
