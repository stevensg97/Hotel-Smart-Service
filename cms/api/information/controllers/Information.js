'use strict';

/**
 * Information.js controller
 *
 * @description: A set of functions called "actions" for managing `Information`.
 */

module.exports = {

  /**
   * Retrieve information records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.information.search(ctx.query);
    } else {
      return strapi.services.information.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a information record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.information.fetch(ctx.params);
  },

  /**
   * Count information records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.information.count(ctx.query, populate);
  },

  /**
   * Create a/an information record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.information.add(ctx.request.body);
  },

  /**
   * Update a/an information record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.information.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an information record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.information.remove(ctx.params);
  }
};
