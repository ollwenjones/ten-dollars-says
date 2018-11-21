import * as React from "react";
import * as AutoSuggest from "react-autosuggest";
import {
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams
} from "react-autosuggest";
import { PartyNameApi } from "src/rest-api/PartyNameApi";
import "./SearchField.css";
import WrapInput from "./WrapInput";

export interface SearchFieldProps extends React.HTMLProps<{}> {
  onChoseValue: (value: string) => void;
  inputClassName?: string;
  placeholder?: string;
}

export interface SearchFieldState {
  value: string;
  suggestions: string[];
}

interface ValueUpdate {
  newValue: string;
}

const initialState: SearchFieldState = {
  suggestions: [],
  value: ""
};

export default class SearchField extends React.Component<
  SearchFieldProps,
  SearchFieldState
> {
  state = { ...initialState };

  // it's terrible to have an API hard coded in here, but...POC, no time
  onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) =>
    PartyNameApi.getPartyNames(value)
      .then(suggestions => this.setState({ suggestions }))
      .catch(() => this.setState({ suggestions: [] }));

  onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

  getSuggestionValue = (suggestion: string) => {
    return suggestion;
  };

  onChange = (e: React.ChangeEvent, { newValue }: ValueUpdate) =>
    this.setState({ value: newValue });

  onSuggestionSelected = (
    e: React.FormEvent,
    { suggestionValue }: SuggestionSelectedEventData<string>
  ) => {
    e.stopPropagation();
    e.preventDefault(); // don't let it "submit" the form!
    this.props.onChoseValue(suggestionValue);
  };

  public render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      className: this.props.inputClassName,
      id: this.props.id,
      onChange: this.onChange,
      placeholder: this.props.placeholder,
      value
    };

    return (
      <WrapInput
        htmlFor={this.props.id || "search"}
        label={this.props.label || "Search"}
      >
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </WrapInput>
    );
  }
}

function renderSuggestion(suggestion: string) {
  return <div>{suggestion}</div>;
}
