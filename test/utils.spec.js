'use strict';

const assert = require('chai').assert;
const Utils = require('../src/utils');

describe('Utils', () => {

	describe('#isDefined()', () => {

		it('null should return false', () => {
			let object = null;
			assert.strictEqual(Utils.isDefined(object), false);
		});

		it('undefined should return false', () => {
			let object;
			assert.strictEqual(Utils.isDefined(object), false);
		});

		it('defined object should return true', () => {
			let object = {};
			assert.strictEqual(Utils.isDefined(object), true);
		});

		it('undefined object property should return false', () => {
			let object = {};
				object.val;
			assert.strictEqual(Utils.isDefined(object.val), false);
		});

		it('defined object property should return true', () => {
			let object = {};
				object.val = 'value';
			assert.strictEqual(Utils.isDefined(object.val), true);
		});

	});

});