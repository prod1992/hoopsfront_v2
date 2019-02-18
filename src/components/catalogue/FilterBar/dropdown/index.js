import React, { Component } from "react";
import { Checkbox, CheckboxGroup } from "react-checkbox-group";

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
      categories: [],
      brands: [],
      subCategories: [],
      vendors: []
    };

    this.categoryChange = this.categoryChange.bind(this);
    this.brandChange = this.brandChange.bind(this);
    this.vendorChange = this.vendorChange.bind(this);
    this.subCategoryChange = this.subCategoryChange.bind(this);
  }

  toggle() {
    if (this.state.isToggled) {
      this.setState({
        isToggled: false
      });
    } else {
      this.setState({
        isToggled: true
      });
    }
  }

  categoryChange(categories) {
    const { changeHandler } = this.props;
    this.setState({
      categories
    });

    changeHandler(categories, "categories");
  }

  vendorChange(vendors) {
    const { changeHandler } = this.props;
    this.setState({
      vendors
    });

    changeHandler(vendors, "vendors");
  }

  brandChange(brands) {
    const { changeHandler } = this.props;

    this.setState({
      brands
    });

    changeHandler(brands, "brands");
  }

  subCategoryChange(subCategories) {
    const { changeHandler } = this.props;

    this.setState({
      subCategories
    });

    changeHandler(subCategories, "subCategories");
  }

  render() {
    const {
      categories,
      brands: productBrands,
      subCategories,
      vendors
    } = this.state;
    const { data, type } = this.props;
    return <div className="filter-dropdown" />;
  }
}

export default FilterDropdown;
