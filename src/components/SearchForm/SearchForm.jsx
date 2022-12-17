import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = { text: '' };
  handalInput = event => {
    this.setState({ text: event.currentTarget.value.toLowerCase().trim() });
  };
  handelSadmit = event => {
    const { text } = this.state;
    event.preventDefault();
    this.props.onSubmit(text);
    this.setState({ text: '' });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handelSadmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handalInput}
          value={this.state.text}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
