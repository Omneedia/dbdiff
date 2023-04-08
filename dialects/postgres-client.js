const { Client } = require('pg');

class PostgresClient {
  constructor(conOptions) {
    this.conOptions = conOptions;
    this.client = null;
  }

  async connect() {
    if (this.client) return;
    this.client = new Client(this.conOptions);
    await this.client.connect();
  }

  async query(sql, params = []) {
    await this.connect();
    try {
      const result = await this.client.query(sql, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async find(sql, params = []) {
    const result = await this.query(sql, params);
    return result.rows;
  }

  async findOne(sql, params = []) {
    const result = await this.query(sql, params);
    return result.rows[0];
  }

  async dropTables() {
    const sql = 'drop schema public cascade; create schema public;';
    await this.query(sql);
  }
}

module.exports = PostgresClient;
