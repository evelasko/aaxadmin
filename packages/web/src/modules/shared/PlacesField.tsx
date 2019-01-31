// @ts-ignore
/*
import * as React from 'react'
import { Input } from 'antd'
import { FieldProps } from 'formik'
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete'

interface State { address: string | null }

export class PlacesField extends React.PureComponent<FieldProps<any> & {}, State> {
    state = { address: '' }
    handleChange = (address: any) => {
        this.setState({ address });
    }
    handleSelect = (address: any) => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <PlacesAutocomplete
            value={ this.state.address }
            onChange={this.handleChange}
            onSelect={this.handleSelect}
        >
        {
           ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>

                <input
                    {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style, }) } >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        }
      </PlacesAutocomplete>
        )
}}
*/