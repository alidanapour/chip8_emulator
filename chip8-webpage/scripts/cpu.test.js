var functions = require('./cpu');

test( 'Array V is it empty ', ()=>{
	expect(functions.VIsEmpty()).toBe(true);
});

test( 'Length of Array V should be 16 ', ()=>{
	expect(functions.lengthOfArrayV()).toBe(16);
});

