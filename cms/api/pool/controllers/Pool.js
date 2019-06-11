'use strict';

/**
 * Pool.js controller
 *
 * @description: A set of functions called "actions" for managing `Pool`.
 */

module.exports = {

  /**
   * Retrieve pool records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.pool.search(ctx.query);
    } else {
      return strapi.services.pool.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a pool record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.pool.fetch(ctx.params);
  },

  /**
   * Count pool records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.pool.count(ctx.query, populate);
  },

  /**
   * Create a/an pool record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.pool.add(ctx.request.body);
  },

  /**
   * Update a/an pool record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.pool.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an pool record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.pool.remove(ctx.params);
  }
};
