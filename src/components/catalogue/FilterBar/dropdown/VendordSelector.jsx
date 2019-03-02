import React from "react";
import MultipleSelect from "../../../shared/MultiSelect";
class VendordSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: []
    };

    this.vendorChange = this.vendorChange.bind(this);
  }

  vendorChange(vendors) {
    const { changeHandler } = this.props;
    this.setState({
      vendors
    });

    changeHandler(vendors, "vendors");
  }
  render() {
    console.log(this.props);
    return <MultipleSelect names={this.props.vendors.data} />;
  }
}
export default VendordSelector;
