const categories = [
	{ 
		displayName: 'Fish',
		data: fishData,		
	},
	{
		displayName: 'Bugs',
		data: bugData,
	},
	{
		displayName: 'Sea Creatures',
		data: seaCreatureData,
	},
	{
		displayName: 'Fossils',
		data: fossilData,
	},
]


const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const monthMap = {
	1: {
		name: 'January',
		abbr: 'J',
	},
	2: {
		name: 'February',
		abbr: 'F',
	},
	3: {
		name: 'March',
		abbr: 'M',
	},
	4: {
		name: 'April',
		abbr: 'A',
	},
	5: {
		name: 'May',
		abbr: 'M',
	},
	6: {
		name: 'June',
		abbr: 'J',
	},
	7: {
		name: 'July',
		abbr: 'J',
	},
	8: {
		name: 'August',
		abbr: 'A',
	},
	9: {
		name: 'September',
		abbr: 'S',
	},
	10: {
		name: 'October',
		abbr: 'O',
	},
	11: {
		name: 'November',
		abbr: 'N',
	},
	12: {
		name: 'December',
		abbr: 'D',
	},
}

const toMonthName = (month) => {
	return monthMap[month]
}

const splitToParagraphs =  (str) => {
	const content = str ? str.split(' & ') : []
	return (
		<>
			{content.map((item)=> <p>{item}</p>)}
		</>
	)
}

const getCurrentMonth = () => {
	const today = new Date
	return monthMap[today.getMonth()]
}

const getShadowName = (shadow) => {
	let shadowName = []
	if (shadow) {
		if (shadow?.indexOf('fin') > -1) {
			return 'Finned'
		}
		if (shadow?.indexOf('Largest') > -1) {
			return 'Huge'
		}
		if (shadow?.indexOf('Smallest') > -1) {
			return 'Tiny'
		}

		shadowName = shadow.split(' (')
		return shadowName[0]
	}
}

const getAvailability = () => {}

export {
	categories,
	toMonthName,
	splitToParagraphs,
	monthArray,
	getAvailability,
	getCurrentMonth,
	getShadowName
}