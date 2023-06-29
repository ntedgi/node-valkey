import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import BZPOPMIN from './BZPOPMIN';

describe('BZPOPMIN', () => {
  describe('transformArguments', () => {
    it('single', () => {
      assert.deepEqual(
        BZPOPMIN.transformArguments('key', 0),
        ['BZPOPMIN', 'key', '0']
      );
    });

    it('multiple', () => {
      assert.deepEqual(
        BZPOPMIN.transformArguments(['1', '2'], 0),
        ['BZPOPMIN', '1', '2', '0']
      );
    });
  });

  testUtils.testAll('bzPopMin - null', async client => {
    assert.equal(
      await client.bzPopMin('key', Number.MIN_VALUE),
      null
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.SERVERS.OPEN
  });

  testUtils.testAll('bzPopMin - with member', async client => {
    const key = 'key',
      member = {
        value: 'a',
        score: 1
      },
      [, reply] = await Promise.all([
        client.zAdd(key, member),
        client.bzPopMin(key, Number.MIN_VALUE)
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
