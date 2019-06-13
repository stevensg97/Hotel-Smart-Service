'use strict';

/**
 * Calendary.js controller
 *
 * @description: A set of functions called "actions" for managing `Calendary`.
 */

module.exports = {

  /**
   * Retrieve calendary records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.calendary.search(ctx.query);
    } else {
      return strapi.services.calendary.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a calendary record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.calendary.fetch(ctx.params);
  },

  /**
   * Count calendary records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.calendary.count(ctx.query, populate);
  },

  /**
   * Create a/an calendary record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.calendary.add(ctx.request.body);
  },

  /**
   * Update a/an calendary record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.calendary.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an calendary record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.calendary.remove(ctx.params);
  }
};
