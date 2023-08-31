/**
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class FuzzyVariable {
	constructor() {

		this.fuzzySets = [];

		this.minRange = Infinity;
		this.maxRange = - Infinity;

	}

	add(fuzzySet) {
		this.fuzzySets.push(fuzzySet);

		// adjust range
		if (fuzzySet.left < this.minRange) {
			this.minRange = fuzzySet.left
		};
		if (fuzzySet.right > this.maxRange) {
			this.maxRange = fuzzySet.right;
		}

		return this;
	}

	remove(fuzzySet) {

		const fuzzySets = this.fuzzySets;

		const index = fuzzySets.indexOf(fuzzySet);
		fuzzySets.splice(index, 1);

		// iterate over all fuzzy sets to recalculate the min/max range
		this.minRange = Infinity;
		this.maxRange = - Infinity;

		for (let i = 0, l = fuzzySets.length; i < l; i++) {

			const fuzzySet = fuzzySets[i];

			if (fuzzySet.left < this.minRange) {
				this.minRange = fuzzySet.left;
			}
			if (fuzzySet.right > this.maxRange) {
				this.maxRange = fuzzySet.right;
			}

		}

		return this;
	}

	fuzzify(value) {

		if (value < this.minRange || value > this.maxRange) {
			// Logger.warn('YUKA.FuzzyVariable: Value for fuzzification out of range.');
			return;
		}

		const fuzzySets = this.fuzzySets;
		for (let i = 0, l = fuzzySets.length; i < l; i++) {
			const fuzzySet = fuzzySets[i];
			fuzzySet.degreeOfMembership = fuzzySet.computeDegreeOfMembership(value);

		}

		return this;
	}


	defuzzifyMaxAv() {

		// the average of maxima (MaxAv for short) defuzzification method scales the
		// representative value of each fuzzy set by its DOM and takes the average
		const fuzzySets = this.fuzzySets;

		let bottom = 0;
		let top = 0;

		for (let i = 0, l = fuzzySets.length; i < l; i++) {
			const fuzzySet = fuzzySets[i];
			bottom += fuzzySet.degreeOfMembership;
			top += fuzzySet.representativeValue * fuzzySet.degreeOfMembership;
		}

		return (bottom === 0) ? 0 : (top / bottom);
	}

	defuzzifyCentroid(samples = 10) {

		const fuzzySets = this.fuzzySets;
		const stepSize = (this.maxRange - this.minRange) / samples;

		let totalArea = 0;
		let sumOfMoments = 0;

		for (let s = 1; s <= samples; s++) {
			const sample = this.minRange + (s * stepSize);

			for (let i = 0, l = fuzzySets.length; i < l; i++) {
				const fuzzySet = fuzzySets[i];
				const contribution = Math.min(fuzzySet.degreeOfMembership, fuzzySet.computeDegreeOfMembership(sample));
				totalArea += contribution;
				sumOfMoments += (sample * contribution);
			}

		}

		return (totalArea === 0) ? 0 : (sumOfMoments / totalArea);
	}

}

export default FuzzyVariable;
