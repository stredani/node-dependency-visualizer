#!/usr/bin/env node

const treeWalk = require("./tree");

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
	{ name: 'treewalk-prefix', alias: 'p', type: String },
	{ name: 'show-leaf-dependencies', alias: 'l', type: Boolean },
];

const options = commandLineArgs(optionDefinitions);

const { spawn } = require( 'child_process' );
const ls = spawn( 'npm', [ 'ls', '--json' ] );

let data = "";

ls.stdout.on("data", (chunk) => {
	data += chunk;
});

ls.stdout.on("close", () => {
	const tree = JSON.parse(data);
	process.stdout.write(`strict digraph DeviceTypeHierarchy_Oblamatikproducts {
  rankdir=BT;
  compound=true;
  node[shape=record,style=filled,fillcolor=white]
`);
	treeWalk(tree.name, tree, options["treewalk-prefix"], options["show-leaf-dependencies"]);
	process.stdout.write("}\n");
});