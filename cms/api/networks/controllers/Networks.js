'use strict';

/**
 * Networks.js controller
 *
 * @description: A set of functions called "actions" for managing `Networks`.
 */

module.exports = {

  /**
   * Retrieve networks records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.networks.search(ctx.query);
    } else {
      return strapi.services.networks.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a networks record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.networks.fetch(ctx.params);
  },

  /**
   * Count networks records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.networks.count(ctx.query, populate);
  },

  /**
   * Create a/an networks record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.networks.add(ctx.request.body);
  },

  /**
   * Update a/an networks record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.networks.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an networks record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.networks.remove(ctx.params);
  }
};
