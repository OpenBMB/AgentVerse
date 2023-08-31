import FuzzySet from './FuzzySet.js';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzySet
*/
class TriangularFuzzySet extends FuzzySet {
	constructor(left, midpoint, right) {

		super(midpoint);

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
			const grad = 1 / (midpoint - left);
			return grad * (value - left);

		}

		// find DOM if the given value is right of the center
		if ((value > midpoint) && (value <= right)) {
			const grad = 1 / (right - midpoint);
			return grad * (right - value);

		}

		// out of range
		return 0;

	}
}

export default TriangularFuzzySet;
