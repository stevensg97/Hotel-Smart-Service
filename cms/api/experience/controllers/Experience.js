'use strict';

/**
 * Experience.js controller
 *
 * @description: A set of functions called "actions" for managing `Experience`.
 */

module.exports = {

  /**
   * Retrieve experience records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.experience.search(ctx.query);
    } else {
      return strapi.services.experience.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a experience record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.experience.fetch(ctx.params);
  },

  /**
   * Count experience records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.experience.count(ctx.query, populate);
  },

  /**
   * Create a/an experience record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.experience.add(ctx.request.body);
  },

  /**
   * Update a/an experience record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.experience.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an experience record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.experience.remove(ctx.params);
  }
};
