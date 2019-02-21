import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

class SearchDownShift extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderInput = inputProps => {
      const { InputProps, classes, ref, ...other } = inputProps;

      return (
        <TextField
          InputProps={{
            inputRef: ref,
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput
            },
            ...InputProps
          }}
          {...other}
        />
      );
    };

    const renderSuggestions = ({
      suggestion,
      index,
      itemProps,
      highlightedIndex,
      selectedItem
    }) => {
      const isHighlighted = highlightedIndex === index;
      const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

      return (
        <MenuItem
          {...itemProps}
          key={suggestion.label}
          selected={isHighlighted}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400
          }}
        >
          {suggestion.label}
        </MenuItem>
      );
    };

    const getSuggestions = value => {
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;

      return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
              count < 5 &&
              suggestion.label.slice(0, inputLength).toLowerCase() ===
                inputValue;

            if (keep) {
              count += 1;
            }

            return keep;
          });
    };
  }
}

export default SearchDownShift;
