const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Quote } = require('../lib/models/Quote.js');

describe('quotes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /quotes should add a new quote', async () => {
    const newQuote = {
      episodeId: '6',
      characterId: '6',
      detail:
        'Okay, I have never heard someone say so many wrong things, one after the other, consecutively, in a row.',
    };
    const res = await request(app).post('/quotes').send(newQuote);
    expect(res.status).toBe(200);
    console.log(res.body);
    expect(res.body.episode_id).toEqual(newQuote.episode_id);
    expect(res.body.character_id).toEqual(newQuote.character_id);
    expect(res.body.detail).toEqual(newQuote.detail);
    const count = await Quote.count();
    expect(count).toEqual(10);
  });

  afterAll(() => {
    pool.end();
  });
});
