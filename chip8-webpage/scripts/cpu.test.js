var functions = require('./cpu');

test( 'Length of Array V is 16 ', ()=>{
	expect(functions.lengthOfArrayV()).toBe(16);
});

test( 'Array V is empty ', ()=>{
	expect(functions.vIsEmpty()).toBe(true);
});

test( 'I is 0 ', ()=>{
	expect(functions.iIsEmpty()).toBe(0);
});

test( 'Memory is 4096 bytes wide ', ()=>{
	expect(functions.memoryLength()).toBe(4096);
});


test( 'Memory is empty ', ()=>{
	expect(functions.memoryIsEmpty()).toBe(true);
});

test( 'Program Counter starts at 0x200 ', ()=>{
	expect(functions.pcValue()).toBe(0x200);
});

test( 'Stack length is 16 ', ()=>{
	expect(functions.stackLength()).toBe(16);
});