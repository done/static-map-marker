
/**
 * @class Map view
 */
export class Map {

	/**
	 * @constructor
	 * @param {object} options - Options object
	 */
	constructor(options) {
		
		if ( typeof options === 'undefined' )
			throw new Error('You must provide an options object.');

		this._mapSettings = null;

		// Map bounds
		this._mapBounds = options.mapBounds;
		// Map zoom
		this._mapZoom = options.mapZoom;
		// Default marker image path
		this._defaultMarkerImage = options.defaultMarkerImage;
		// Map element, could either be a selector or a DOM Element
		if ( typeof options.mapEl === 'string' ) {
			this._mapEl = document.querySelector(options.mapEl);
		} else {
			this._mapEl = options.mapEl;
		}

	}

	/**
	 * Add markers to the static map image
	 * @param {array} markers An array of marker objects
	 */
	addMarkers(markers) {
		
		// Make sure that we have the map settings calulated
		if ( !this._mapSettings ) {
			this._mapSettings = this.initializeMap();
		}

		// Markers 
		// [{lat: 14, lng: 16 [, image: 'marker.png', class: '']}]

		for ( let i = 0, len = markers.length; i < len; i++ ) {
			createMarker(markers[i]);
		}

	}

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

	createMarker(data) {

		let markerEl = document.createElement('div'),
			imageEl = document.createElement('img');

		return marker;
	}

	getClosestMarkerToCenter() {
		//
	}

	/**
	 * Converts a gogole.maps.LatLng to a point object
	 * @param  {google.maps.LatLng} latlng Longitude and latitude positions
	 * @return {google.maps.Point}	A point object with x and y positions
	 */
	fromLatLngToPoint(latlng) {

		const tileSize = 256,
			  x = (latlng.lng() + 180) / 360 * tileSize,
			  y = ((1 - Math.log(Math.tan(latlng.lat() * Math.PI / 180) + 1 / Math.cos(latlng.lat() * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, 0)) * tileSize;
		return new google.maps.Point(x, y);
	}

	get mapEl() {
		return this._mapEl;
	}

}