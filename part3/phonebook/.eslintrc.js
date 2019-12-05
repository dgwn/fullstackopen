module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'no-console': 0,
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
			'error', 'always'
		],
		'arrow-spacing': [
			'error', {'before': true, 'after': true}
		],
		'eqeqeq': 'error',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
