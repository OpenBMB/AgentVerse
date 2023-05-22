/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyTerm
*/
class FuzzyCompositeTerm {

	constructor(terms) {
		this.terms = terms;
	}

	clearDegreeOfMembership() {
		const terms = this.terms;
		for (let i = 0, l = terms.length; i < l; i++) {
			terms[i].clearDegreeOfMembership();

		}

		return this;
	}

	updateDegreeOfMembership(value) {
		const terms = this.terms;
		for (let i = 0, l = terms.length; i < l; i++) {
			terms[i].updateDegreeOfMembership(value);

		}

		return this;

	}

}

export default FuzzyCompositeTerm;
