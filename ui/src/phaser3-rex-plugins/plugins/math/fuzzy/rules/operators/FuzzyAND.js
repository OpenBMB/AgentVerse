import FuzzyCompositeTerm from './FuzzyCompositeTerm.js';

/**
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyCompositeTerm
*/
class FuzzyAND extends FuzzyCompositeTerm {
	constructor() {
		const terms = Array.from(arguments);
		super(terms);
	}

	getDegreeOfMembership() {
		const terms = this.terms;
		let minDOM = Infinity;
		for (let i = 0, l = terms.length; i < l; i++) {
			const currentDOM = terms[i].getDegreeOfMembership();
			if (currentDOM < minDOM) {
				minDOM = currentDOM;
			}

		}

		return minDOM;

	}

}

export default FuzzyAND;
