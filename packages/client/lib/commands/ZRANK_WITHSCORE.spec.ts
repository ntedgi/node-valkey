import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import ZRANK_WITHSCORE from './ZRANK_WITHSCORE';

describe('ZRANK WITHSCORE', () => {
  testUtils.isVersionGreaterThanHook([7, 2]);

  it('transformArguments', () => {
    assert.deepEqual(
      ZRANK_WITHSCORE.transformArguments('key', 'member'),
      ['ZRANK', 'key', 'member', 'WITHSCORE']
    );
  });

  testUtils.testAll('zRankWithScore - null', async client => {
    assert.equal(
      await client.zRankWithScore('key', 'member'),
      null
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });

  testUtils.testAll('zRankWithScore - with member', async client => {
    const member = {
      value: '1',
      score: 1
    }

    const [, reply] = await Promise.all([
      client.zAdd('key', member),
      client.zRankWithScore('key', member.value)
    ])
    assert.deepEqual(
      reply,
      {
        rank: 0,
        score: 1
      }
    );
  }, {
    client: GLOBAL.SERVERS.OPEN,
    cluster: GLOBAL.CLUSTERS.OPEN
  });
});