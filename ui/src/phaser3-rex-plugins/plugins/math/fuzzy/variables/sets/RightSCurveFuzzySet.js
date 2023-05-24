import FuzzySet from './FuzzySet.js';

/**
* @author {@link https://github.com/robp94|robp94}
* @augments FuzzySet
*/
class RightSCurveFuzzySet extends FuzzySet {
	constructor(left, midpoint, right) {

		// the representative value is the midpoint of the plateau of the shoulder
		const representativeValue = (midpoint + right) / 2;
		super(representativeValue);

		this.left = left;
		this.midpoint = midpoint;
		this.right = right;

	}

	computeDegreeOfMembership(value) {

		const midpoint = this.midpoint;
		const left = this.left;
		const right = this.right;

		// find DOM if the given value is left of the center or equal to the center

		if ((value >= left) && (value <= midpoint)) {
			if (value <= ((left + midpoint) / 2)) {
				return 2 * (Math.pow((value - left) / (midpoint - left), 2));

			} else {
				return 1 - (2 * (Math.pow((value - midpoint) / (midpoint - left), 2)));

			}
		}

		// find DOM if the given value is right of the midpoint
		if ((value > midpoint) && (value <= right)) {
			return 1;

		}

		// out of range
		return 0;

	}
}

export default RightSCurveFuzzySet;
