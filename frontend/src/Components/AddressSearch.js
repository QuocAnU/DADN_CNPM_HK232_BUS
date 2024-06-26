import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const GOONG_API_KEY = 'IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';

class AddressSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            suggestions: [],
            addrSearching: false,
            icon: faSearch
        };
    }

    handleInputChange = async (e) => {
        const inputValue = e.target.value;
        this.setState({ query: inputValue });
        if (inputValue) {
            this.setState({ icon: faTimes });
            this.setState({ addrSearching: true });
            try {
                const response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${inputValue}`);
                if (response.data.predictions) this.setState({ suggestions: response.data.predictions });
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            this.setState({ icon: faSearch });
            this.setState({ addrSearching: false });
        }
    };

    handleSuggestionClick = (suggestion) => {
        this.props.onSuggestionSelect(suggestion);
        this.setState({ query: suggestion.description, addrSearching: false });
    };

    render() {
        const { onSuggestionSelect } = this.props;
        return (
            <div className="search-address">
                <FontAwesomeIcon 
                    icon={this.state.icon} 
                    onClick = {() => {
                        onSuggestionSelect(null)
                        this.setState({ addrSearching: false });
                        this.setState({ query: ""});
                        this.setState({ suggestions: [] });
                        this.setState({icon: faSearch})
                    }
                }/>
                <input
                    type="text"
                    placeholder="Tìm địa chỉ ..."
                    className="address"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <div>
                    {this.state.addrSearching && this.state.suggestions.map((suggestion) => (
                        <div key={suggestion.place_id} onClick={() => this.handleSuggestionClick(suggestion)}>
                            {suggestion.description}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AddressSearch;
