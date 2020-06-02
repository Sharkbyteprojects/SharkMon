const assert = require("assert");
const os=require("os");
const objectToTest=require("./static")();
assert.strictEqual(objectToTest.tmpdir, os.tmpdir());
assert.strictEqual(objectToTest.codename, os.release());
assert.strictEqual(objectToTest.totalmem, Math.round(os.totalmem() * 0.000001));
assert.strictEqual(Math.round(2.6), 3);
assert.strictEqual(objectToTest.osuptime, os.uptime());