/*
  @license
	Rollup.js v4.21.3
	Thu, 12 Sep 2024 07:05:19 GMT - commit 9f5a735524a5c56ba61a8dc6989374917f5aceb1

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
