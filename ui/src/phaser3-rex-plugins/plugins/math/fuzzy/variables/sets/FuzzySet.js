/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyTerm
*/

class FuzzySet {

	constructor(representativeValue = 0) {
		this.degreeOfMembership = 0;
		this.representativeValue = representativeValue;

		this.left = 0;
		this.right = 0;

	}

	computeDegreeOfMembership() { }

	clearDegreeOfMembership() {

		this.degreeOfMembership = 0;

		return this;

	}

	getDegreeOfMembership() {
		return this.degreeOfMembership;

	}

	updateDegreeOfMembership(value) {
		if (value > this.degreeOfMembership) {
			this.degreeOfMembership = value;
		}

		return this;

	}

}

export default FuzzySet;
