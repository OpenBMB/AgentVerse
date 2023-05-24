import FuzzySet from './FuzzySet.js';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzySet
*/
class SingletonFuzzySet extends FuzzySet {
	constructor(left, midpoint, right) {

		super(midpoint);

		this.left = left;
		this.midpoint = midpoint;
		this.right = right;

	}

	computeDegreeOfMembership(value) {
		const left = this.left;
		const right = this.right;
		return (value >= left && value <= right) ? 1 : 0;

	}
}

export default SingletonFuzzySet;
