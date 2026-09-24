const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(__dirname + '/source/output.html', 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1];
let callbacks;
const context = vm.createContext({structuredClone, console:{warn(){}}, window:{SingularWidget:{init(c){callbacks=c}}}});
context.SingularWidget = context.window.SingularWidget;
vm.runInContext(code, context);
// Isolate callback validation from SVG rendering; browser preview checks the actual renderer.
vm.runInContext('render = function() {};', context);
const state = () => JSON.parse(vm.runInContext('JSON.stringify(state)', context));
const ui = JSON.parse(fs.readFileSync(__dirname+'/ui-definition.json','utf8'));
callbacks.onInit({});
callbacks.onValue(Object.fromEntries(ui.model.fields.map(f=>[f.id,f.defaultValue])));
assert.equal(ui.model.fields.length,24);
assert.equal(new Set(ui.model.fields.map(f=>f.id)).size,24);
callbacks.onValue({formation:'3-5-2',gap:'60',player1Name:'New keeper',player1Number:'01'});
assert.equal(state().formation,'3-5-2');
assert.equal(state().gap,60);
assert.deepEqual(state().players[0],{name:'New keeper',number:'01'});
assert.equal(state().players[10].name,'BALOGUN');
for (const formation of ['4-4-4','4-','0-5-5','6-4','1-1-1-1-1-5']) {
  callbacks.onValue({formation}); assert.equal(state().formation,'3-5-2');
}
callbacks.onValue({gap:'not a number'}); assert.equal(state().gap,60);
callbacks.onValue({gap:999}); assert.equal(state().gap,160);
callbacks.onValue({gap:-5,player2Number:0,player2Name:''});
assert.equal(state().gap,0); assert.equal(state().players[1].number,'0'); assert.equal(state().players[1].name,'');
callbacks.onValue(null); callbacks.onValue([]);
for(const group of ui.model.groups)for(const id of group.childIds)assert(ui.model.fields.some(f=>f.id===id));
console.log('PASS: SDK registration, 24 fields, partial updates, formation validation, gap limits, player text and group references.');
