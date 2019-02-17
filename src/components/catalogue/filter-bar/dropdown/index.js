import React, {Component} from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
            })
        } else {
            this.setState({
                isToggled: true
            })
        }
    }

    categoryChange(categories) {
        const {changeHandler} = this.props;
        this.setState({
            categories
        });

        changeHandler(categories, "categories");
    };

    vendorChange(vendors) {
        const {changeHandler} = this.props;
        this.setState({
            vendors
        });

        changeHandler(vendors, "vendors");
    };

    brandChange(brands) {
        const {changeHandler} = this.props;

        this.setState({
            brands
        });

        changeHandler(brands, "brands");
    };

    subCategoryChange(subCategories) {
        const {changeHandler} = this.props;

        this.setState({
            subCategories
        });

        changeHandler(subCategories, "subCategories");
    };

    render() {
        const {categories, brands: productBrands, subCategories, vendors} = this.state;
        const {data, type} = this.props;

        return (
            <div className='filter-dropdown'>
                <span className='head'>{type}</span>
                <div className='select'
                     onClick={() => this.toggle()}>
                    {`Select ${type}`}
                    <i className='material-icons'>â¼</i>
                </div>
                <div className={this.state.isToggled ? 'toggle open' : 'toggle'}>
                    <div className='row-toggle-wrap'>
                        <div className='shared-scroll-view'>
                            {
                                data && data.map((item, i) => {
                                    const brands = item.brand.split(" ");

                                    switch (type) {
                                        case "Category":
                                            return <div key={item.code * Math.random()} className='toggle-row'>
                                                <CheckboxGroup
                                                    checkboxDepth={2}
                                                    name="categories"
                                                    value={categories}
                                                    onChange={this.categoryChange}>
                                                    <label htmlFor={item.id}>
                                                        <Checkbox value={item.category}/>
                                                        {item.category}
                                                    </label>
                                                </CheckboxGroup>

                                            </div>;
                                        case "Brand":
                                            return brands.map(brand => {
                                                return <div key={item.code * Math.random()} className='toggle-row'>
                                                    <CheckboxGroup
                                                        checkboxDepth={2}
                                                        name="brands"
                                                        value={productBrands}
                                                        onChange={this.brandChange}>
                                                        <label htmlFor={item.id}>
                                                            <Checkbox value={brand}/>
                                                            {brand}
                                                        </label>
                                                    </CheckboxGroup>
                                                </div>
                                            });
                                        case "Sub Category":
                                            return <div key={item.code * Math.random()} className='toggle-row'>
                                                <CheckboxGroup
                                                    checkboxDepth={2}
                                                    name="subCategories"
                                                    value={subCategories}
                                                    onChange={this.subCategoryChange}>
                                                    <label htmlFor={item.id}>
                                                        <Checkbox value={item.sub_category}/>
                                                        {item.sub_category}
                                                    </label>
                                                </CheckboxGroup>
                                            </div>;
                                        case "Vendor":
                                            return <div key={item.code * Math.random()} className='toggle-row'>
                                                <CheckboxGroup
                                                    checkboxDepth={2}
                                                    name="vendors"
                                                    value={vendors}
                                                    onChange={this.vendorChange}>
                                                    <label htmlFor={item.id}>
                                                        <Checkbox value={item.sub_category}/>
                                                        {item.sub_category}
                                                    </label>
                                                </CheckboxGroup>
                                            </div>
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterDropdown;