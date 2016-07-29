// import Marker from './marker';
// import Map from './map';
import {isDefined} from './utils';

class StaticMap {

	/**
	 * @constructor
	 */
	constructor() {

		this._mapSettings = null;
		this._map = null;
		this._mapBounds = null;
	}

	/**
	 * Initialize
	 * @param  {object} options The options object
	 * @return {undefined}
	 */
	init(options) {

		// Validate the passed options objectx§
		this.validateOptions(options);

		// TODO: Check for google 
		if ( !isDefined(window.google) || !isDefined(window.google.maps) ) {
			throw new Error('Google Maps API is not available.');
		}

		// Creata a new LatLngBounds google object
		this._mapBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(options.mapBounds.sw.lat, options.mapBounds.sw.lng),
			new google.maps.LatLng(options.mapBounds.ne.lat, options.mapBounds.ne.lng)
		);
	}

	/**
	 * Add markers to the static map image
	 * @param {array} markers An array of marker objects
	 */
	addMarkers(markers) {

		// Make sure that we have the map initialized
		if ( !this._mapSettings ) {
			this._mapSettings = this.initializeMap();
		}

	}
	
	/**
	 * Validate the passed options object
	 * @param  {object} options The options object
	 * @throws {Error} If options not defined or does not have mandatory properties
	 * @return {undefined}
	 */
	validateOptions(options) {

		if ( !isDefined(options) ) {
			throw new Error('You must provide an options object.');
		}

		if ( !isDefined(options.mapBounds) || 
			!isDefined(options.mapBounds.sw) ||
			!isDefined(options.mapBounds.sw.lat) ||
			!isDefined(options.mapBounds.sw.lng) ||
			!isDefined(options.mapBounds.ne) ||
			!isDefined(options.mapBounds.ne.lat) ||
			!isDefined(options.mapBounds.ne.lng) ) {
				throw new Error('You must provide a valid mapBounds object in the options object {sw: {lat: xxx, lng: xxx}, ne: {lat: xxx, lng: xxx}}.');
		}
	}

	/**
	 * Initialize map settings based on the passed map options
	 * @return {object} Settings object
	 */
	initializeMap() {
		
		const settings = {
			scale : Math.pow(2, this._mapZoom),
			topRight:  this.fromLatLngToPoint(this._mapBounds.getNorthEast()),
			bottomLeft: this.fromLatLngToPoint(this._mapBounds.getSouthWest())
		};

		return settings;
	}

	/**
	 * Converts a gogole.maps.LatLng to a google.maps.Point object
	 * @param  {google.maps.LatLng} latlng Longitude and latitude positions
	 * @return {google.maps.Point}	A point object with x and y positions
	 */
	fromLatLngToPoint(latlng) {

		const tileSize = 256,
			  x = (latlng.lng() + 180) / 360 * tileSize,
			  y = ((1 - Math.log(Math.tan(latlng.lat() * Math.PI / 180) + 1 / Math.cos(latlng.lat() * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 0)) * tileSize;
		return new google.maps.Point(x, y);
	}

	// return {
	// 	addMarkers: this.addMarkers

	// }

}

// Export
if ( module !== null && typeof module !== 'undefined' && 
	module.exports !== null && typeof module.exports !== 'undefined' ) {
	module.exports = StaticMap;
}