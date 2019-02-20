import * as React from 'react'
import { FieldProps } from 'formik'
// import Geosuggest, { Suggest } from 'react-geosuggest'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
// import ReactGoogleMap from 'react-google-map'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'
import ReactGoogleMapsLoader from 'react-google-maps-loader'
import { Input } from 'antd'

interface DefaultCenter { lat: number, lng: number }
interface State { defaultCenter: DefaultCenter | null, search: string, value: string }
interface Props { handleAddress: (address:string, placeID:string) => void }

// lat: -34.397, lng: 150.644
const MapWithMarker = withGoogleMap<{
                        defaultCenter: DefaultCenter 
                        lat: number
                        lng: number 
                        onClick: (e: google.maps.MouseEvent) => void
                    }>(props =>
    <GoogleMap defaultZoom={15} defaultCenter={props.defaultCenter} onClick={props.onClick}>
        <Marker position={{lat: props.lat, lng: props.lng}} />
    </GoogleMap>
)

export class PlacesField extends React.PureComponent<FieldProps<any> & {} & Props, State> {
    state: State = { defaultCenter: null, search:'', value:'' }
    handleInputChange(e:any) {
      this.setState({search: e.target.value, value: e.target.value})
    }
    handleSelectSuggest(suggest:any) {
      console.log(suggest)
      this.props.handleAddress(suggest.formatted_address, suggest.place_id)
      const { lat, lng } = suggest.geometry.location
      this.setState({ defaultCenter: { lat: parseFloat(lat()), lng: parseFloat(lng()) } })
    }
    handleMarkerChange(lat:any, lng:any) {
      this.setState({defaultCenter: {lat,lng}})
    }
    // onSuggestSelect = (place: Suggest) => { 
    //     const { location: { lat, lng} } = place
    //     const { form: { setValues, values } } = this.props
    //     setValues({  ...values, latitude: lat, longitude: lng })
    //     this.setState({ defaultCenter: { lat: parseFloat(lat), lng: parseFloat(lng) } })
    // }
    render() {
        const { search, value } = this.state
        return (
            <div>
              <ReactGoogleMapsLoader
                params={{key: process.env.GOOGLE_API_KEY || 'AIzaSyC62pZkd42nbbOvOqKME-bOt2TN0aLBqmw', libraries: 'places,geocode'}}
                render={googleMaps =>
                  googleMaps && (
                    <div>
                      <ReactGooglePlacesSuggest
                        autocompletionRequest={{input: search}}
                        googleMaps={googleMaps}
                        onSelectSuggest={this.handleSelectSuggest.bind(this)}
                      >
                        <Input
                          type="text"
                          value={value}
                          placeholder="Buscar recinto..."
                          onChange={this.handleInputChange.bind(this)}
                        />
                      </ReactGooglePlacesSuggest>
                    </div>
                  )}
              />
                {
                this.state.defaultCenter && <MapWithMarker 
                    containerElement={<div style={{ height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}} />}
                    defaultCenter={this.state.defaultCenter}
                    lat={this.state.defaultCenter.lat}
                    lng={this.state.defaultCenter.lng}
                    onClick={ x => {
                        const lat = x.latLng.lat()
                        const lng = x.latLng.lng()
                        this.handleMarkerChange(lat,lng)
                        // setValues({...values, latitude: lat, longitude: lng})
                    } }
                />
                }
            </div>
        )
  }
}
