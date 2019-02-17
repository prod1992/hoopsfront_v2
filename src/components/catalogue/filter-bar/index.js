import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {filterShowHide} from '../../../actions/catalogue-actions';
import FilterDropdown from './dropdown';
import InputRange from 'react-input-range';
import Autosuggestion from 'react-autosuggest';
import {bindActionCreators} from "redux";
import {sendSearchQuery} from "../../../actions/search";
import {filterData} from "../../../actions/filterData";
import getApiCredentials from "../../../constants/api";

class FilterBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            qty_range: {min: 0, max: 100},
            price_range: {min: 0, max: 100},
            tags: [],
            selectedTags: [],
            value: '',
            suggestions: [],
            searchVal: "",
            categories: [],
            brands: [],
            subCategories: [],
            vendors: []
        };
        this.tagArrayHandler = this.tagArrayHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.dataHandler = this.dataHandler.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.searchVal !== prevState.searchVal) {
            return {searchVal: nextProps.searchVal};
        } else return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {products} = this.props.catalogueStates;
        const {searchVal} = this.props;

        if (prevProps.searchVal !== searchVal) {
            this.setState({searchVal});
        }

        if (prevProps.catalogueStates !== this.props.catalogueStates) {
            const tags = this.tagArrayHandler(products.data);
            this.setState({tags});
        }
    }

    getSuggestionValue(suggestion) {
        const {selectedTags} = this.state;
        this.setState({
            selectedTags: selectedTags.includes(suggestion) ?
                selectedTags : [...selectedTags, suggestion],
            value: ""
        });
        return "";
    };

    renderSuggestion(suggestion) {
        return <div className="suggest">
            {suggestion}
        </div>
    }

    removeSelectedTag(tagIndex) {
        let newTags = [...this.state.selectedTags];
        newTags.splice(tagIndex, 1);

        this.setState({
            selectedTags: newTags
        })
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.tags.filter(tag => {
                return tag.toLowerCase().includes(inputValue);
            }
        );
    };

    tagArrayHandler(products) {
        let items = [];
        products.map(item => {
            const tag = item.tags;
            items.push(tag);
        });

        const tags = ([].concat.apply([], items));

        return [...new Set(tags)];
    };

    onChange(event, {newValue}) {
        this.setState({
            value: newValue
        });
    };

    changeHandler(e) {
        const val = e.target.value;
        this.setState({
            searchVal: e.target.value
        }, () => {
            this.props.sendSearchQuery(val);
        });
    }

    clearFilters() {
        this.setState({
            qty_range: {min: 0, max: 100},
            price_range: {min: 0, max: 100},
            tags: [],
            selectedTags: [],
            value: '',
            suggestions: [],
            searchVal: "",
            categories: [],
            brands: [],
            subCategories: [],
            vendors: []
        })
    }

    onSuggestionsFetchRequested({value}) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    closeFilter() {
        this.props.filterShowHide(false);
    }

    dataHandler(arr, name) {
        this.setState({
            [name]: arr
        });
    }

    applyFilter() {
        const {filterData, filterShowHide} = this.props;
        const {vendors, brands, categories, subCategories, selectedTags, qty_range, price_range, searchVal} = this.state;

        let data = {
            qty_min: qty_range.min,
            qty_max: qty_range.max,
            price_range_min: price_range.min,
            price_range_max: price_range.max,
        };

        if (searchVal !== "") {
            data.search_value = searchVal
        }

        if (!!vendors.length) {
            data.vendors = vendors
        }

        if (!!brands.length) {
            data.brands = brands
        }

        if (!!categories.length) {
            data.categories = categories
        }

        if (!!subCategories.length) {
            data.sub_categories = subCategories
        }

        if (!!selectedTags.length) {
            data.selected_tags = selectedTags
        }

        let token = localStorage['userToken'];
        let uri = getApiCredentials.host + `/api/products/filter?s=${JSON.stringify(data)}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + token
            }
        };
        const reqInstance = new Request(uri, requestOptions);

        fetch(reqInstance)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(data => {
                filterData(data);
            }).catch((err) => console.log(err, "error"));

        filterShowHide(false);
    }

    render() {
        const filterData = this.props.catalogueStates;
        const {qty_range, price_range, value, suggestions, searchVal, selectedTags} = this.state;
        const inputProps = {
            value,
            onChange: this.onChange
        };

        return (
            <div className='catalogue-filter-bar' id={filterData.filterIsOpened === true ? 'open' : null}>
                <div className='shared-scroll-view'>
                    <div className="filter_block">
                        <div className="filter_title_block">
                            <div className="filter_title">
                                <div className="filter_title_text">
                                    <h3>Filter</h3>
                                    <p>Select the following items to filter the Catalogues</p>
                                </div>
                                <span className="close_filther_block" onClick={() => this.closeFilter()}/>
                            </div>
                            <div className="apply_btn">
                                <button onClick={this.applyFilter}>Apply</button>
                            </div>

                            {/*<button onClick={this.clearFilters}
                                    className="clear-filter-btn">
                                Clear filter
                                <i className="material-icons">close</>
                            </button>*/}

                        </div>
                        <div className="filter_search_block">
                            <input type="text" value={searchVal} onChange={this.changeHandler}
                                   placeholder="Enter your search here..."/>
                        </div>
                        <div className='dropdown-wrap'>
                            <FilterDropdown
                                changeHandler={this.dataHandler}
                                data={filterData.products.data} type="Vendor"/>
                            <FilterDropdown
                                changeHandler={this.dataHandler}
                                data={filterData.products.data} type="Brand"/>
                            <FilterDropdown
                                changeHandler={this.dataHandler}
                                data={filterData.products.data} type="Category"/>
                            <FilterDropdown
                                changeHandler={this.dataHandler}
                                data={filterData.products.data} type="Sub Category"/>
                        </div>
                        <div className='tags-sec'>
                            <span className='tag-head'>Tags</span>
                            <Autosuggestion
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={this.getSuggestionValue}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={inputProps}
                            />
                            {!!selectedTags.length &&
                            <div className="selected-tag-list">
                                {selectedTags.map((tag, index) => {
                                    return <div className="tag-item"
                                                key={index}>
                                        {tag}
                                        <i className="material-icons remove-tag"
                                           onClick={() =>
                                               this.removeSelectedTag(index)
                                           }>
                                            close
                                        </i>
                                    </div>
                                })}
                            </div>}
                        </div>
                        <div className='range-wrapper'>
                            <div className='range-head'>Min Order QTY</div>
                            <InputRange
                                maxValue={100}
                                minValue={0}
                                value={qty_range}
                                onChange={value => this.setState({qty_range: value})}/>
                        </div>
                        <div className='order-values'>
                            <div className='value-square'>{qty_range.min}</div>
                            <span className='line-value'/>
                            <div className='value-square'>{qty_range.max}</div>
                        </div>
                        <div className='range-wrapper'>
                            <div className='range-head'>Price</div>
                            <InputRange
                                maxValue={100}
                                minValue={0}
                                value={price_range}
                                onChange={value => this.setState({price_range: value})}/>
                        </div>
                        <div className='order-values'>
                            <span>{`$${price_range.min}`}</span>
                            <span> - </span>
                            <span>{`$${price_range.max}`}</span>
                        </div>
                        <div className='apply-btn-wrapper'>
                            <button className='apply-btn' onClick={this.applyFilter}>Apply</button>
                        </div>
                        {/*<button onClick={this.clearFilters}
                                className="clear-filter-btn">
                            Clear filter
                            <i className="material-icons">close</>
                        </button>*/}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        catalogueStates: state.catalogueReducer,
        searchVal: state.search,
        filteredProducts: state.filterData.filteredProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendSearchQuery: bindActionCreators(sendSearchQuery, dispatch),
        filterShowHide: bindActionCreators(filterShowHide, dispatch),
        filterData: bindActionCreators(filterData, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);