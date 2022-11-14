const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  characterId;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.characterId = row.character_id;
    this.episodeId = row.episode_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }
  static async insert({ characterId, episodeId, detail }) {
    // implement insert to add new quote
    const { rows } = await pool.query(
      'INSERT INTO quotes (character_id, episode_id, detail) VALUES ($1, $2, $3) RETURNING *',
      [characterId, episodeId, detail]
    );
    return new Quote(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * from quotes`);
    return rows.map((row) => new Quote(row));
  }
}

module.exports = { Quote };
