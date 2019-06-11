'use strict';

/**
 * Beach.js controller
 *
 * @description: A set of functions called "actions" for managing `Beach`.
 */

module.exports = {

  /**
   * Retrieve beach records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.beach.search(ctx.query);
    } else {
      return strapi.services.beach.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a beach record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.beach.fetch(ctx.params);
  },

  /**
   * Count beach records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.beach.count(ctx.query, populate);
  },

  /**
   * Create a/an beach record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.beach.add(ctx.request.body);
  },

  /**
   * Update a/an beach record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.beach.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an beach record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.beach.remove(ctx.params);
  }
};
