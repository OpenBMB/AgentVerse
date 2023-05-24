import FuzzyCompositeTerm from './FuzzyCompositeTerm.js';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyCompositeTerm
*/
class FuzzyFAIRLY extends FuzzyCompositeTerm {

	constructor(fuzzyTerm) {
		super([fuzzyTerm]);
	}

	clearDegreeOfMembership() {
		this.terms[0].clearDegreeOfMembership();
		return this;
	}

	getDegreeOfMembership() {
		const dom = this.terms[0].getDegreeOfMembership();
		return Math.sqrt(dom);
	}

	updateDegreeOfMembership(value) {
		this.terms[0].updateDegreeOfMembership(Math.sqrt(value));
		return this;
	}

}

export default FuzzyFAIRLY;
