'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const StaticMap = require('../src/staticmap');

describe('StaticMap', () => {

	let staticMap;

	describe('#validateOptions()', () => {

		it('null should throw error', () => {
			let staticMap = new StaticMap(),
				options = null;

			assert.throws((options) => {staticMap.validateOptions(args)}, Error);
		});

		it('incorrectly configured mapBounds property object should throw error', () => {
			let options = {
				mapBounds: {}
			},
			staticMap = new StaticMap();

			assert.throws(() => {staticMap.validateOptions(options)}, Error);
		});

		it('correctly configured mapBounds property object should not throw error', () => {
			let options = {
				mapBounds: {
					sw: {lat: 10, lng: 10},
					ne: {lat: 10, lng: 10}
				}
			},
			staticMap = new StaticMap();
			assert.doesNotThrow(() => {staticMap.validateOptions(options)}, Error);
		});

	});

});