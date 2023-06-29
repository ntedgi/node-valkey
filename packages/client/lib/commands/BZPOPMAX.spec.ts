import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import BZPOPMAX from './BZPOPMAX';

describe('BZPOPMAX', () => {
  describe('transformArguments', () => {
    it('single', () => {
      assert.deepEqual(
        BZPOPMAX.transformArguments('key', 0),
        ['BZPOPMAX', 'key', '0']
      );
    });

    it('multiple', () => {
      assert.deepEqual(
        BZPOPMAX.transformArguments(['1', '2'], 0),
        ['BZPOPMAX', '1', '2', '0']
      );
    });
  });

  testUtils.testAll('bzPopMax - null', async client => {
    assert.equal(
      await client.bzPopMax('key', Number.MIN_VALUE),
      null
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.SERVERS.OPEN
  });

  testUtils.testAll('bzPopMax - with member', async client => {
    const key = 'key',
      member = {
        value: 'a',
        score: 1
      },
      [, reply] = await Promise.all([
        client.zAdd(key, member),
        client.bzPopMax(key, Number.MIN_VALUE)
      ]);

    assert.deepEqual(reply, {
      key,
      ...member
    });
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.SERVERS.OPEN
  });
});
