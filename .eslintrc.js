module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 'off',
		'indent': ['error', 'tab', {
			'SwitchCase': 1
		}],
		'max-len': ['error', {
			'code': 100,
			'ignoreTrailingComments': true,
			'ignoreUrls': true,
			'ignoreStrings': true
		}],
		'no-param-reassign': ['error', {
			'props': true,
			'ignorePropertyModificationsFor': [
				'acc', // for reduce accumulators
				'state', // for Vuex store
			]
		}],
		'no-shadow': ['error', { 'allow': ['response', 'data'] }],
		'object-curly-newline': ['error', { 'multiline': true }],
		'no-confusing-arrow': ['error', { 'allowParens': true }]
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
