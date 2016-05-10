

/**
 * Check if a object or property is defined
 * @param  {object}  val The object or value to check
 * @return {Boolean}     Returns true if not null or undefined, false otherwise
 */
export const isDefined = function(val) {
	return (val !== null && typeof val !== 'undefined');
}