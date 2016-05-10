// import Marker from './marker';
// import Map from './map';
import {isDefined} from './utils';

export class StaticMap {

	/**
	 * @constructor
	 * @param  {object} options The options object
	 */
	constructor(options) {

		// Validate the passed options objectx§
		validateOptions(options);

		this._mapBounds = options.mapBounds;

		this._mapSettings = null;
		this._map = null;
	}

	addMarkers(markers) {

		// Make sure that we have the map initialized
		if ( !this._mapSettings ) {
			this._mapSettings = this.initializeMap();
		}

	}

	validateOptions(options) {

		const errors = [];

		if ( !isDefined(options) )
			errors[errors.length] = 'You must provide an options object.';

		if ( !isDefined(options.mapBounds) || 
				!isDefined(options.mapBounds.lat) ||
				!isDefined(options.mapBounds.lng) )
			errors[errors.length] = 'You must provide a valid mapBounds parameter in the options object.';

	}

	// isDefined(val) {
	// 	return (val !== null || typeof val !== 'undefined');
	// }

	/**
	 * Initialize map settings based on the passed map options
	 * @return {object} Settings object
	 */
	initializeMap() {
		
		let settings = {
			scale : Math.pow(2, this._mapZoom),
			topRight:  this.fromLatLngToPoint(this._mapBounds.getNorthEast()),
			bottomLeft: this.fromLatLngToPoint(this._mapBounds.getSouthWest())
		};

		return settings;
	}

	// return {
	// 	addMarkers: this.addMarkers

	// }

}

/**
 * Export API methods
 */