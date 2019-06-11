'use strict';

/**
 * Zone.js controller
 *
 * @description: A set of functions called "actions" for managing `Zone`.
 */

module.exports = {

  /**
   * Retrieve zone records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.zone.search(ctx.query);
    } else {
      return strapi.services.zone.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a zone record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.zone.fetch(ctx.params);
  },

  /**
   * Count zone records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.zone.count(ctx.query, populate);
  },

  /**
   * Create a/an zone record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.zone.add(ctx.request.body);
  },

  /**
   * Update a/an zone record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.zone.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an zone record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.zone.remove(ctx.params);
  }
};
