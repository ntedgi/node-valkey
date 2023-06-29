import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import ZPOPMAX_COUNT from './ZPOPMAX_COUNT';

describe('ZPOPMAX COUNT', () => {
  it('transformArguments', () => {
    assert.deepEqual(
      ZPOPMAX_COUNT.transformArguments('key', 1),
      ['ZPOPMAX', 'key', '1']
    );
  });

  testUtils.testAll('zPopMaxCount', async client => {
    const members = [{
      value: '1',
      score: 1
    }, {
      value: '2',
      score: 2
    }];

    const [ , reply] = await Promise.all([
      client.zAdd('key', members),
      client.zPopMaxCount('key', members.length)
    ]);

    assert.deepEqual(reply, members.reverse());
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.SERVERS.OPEN
  });
});
