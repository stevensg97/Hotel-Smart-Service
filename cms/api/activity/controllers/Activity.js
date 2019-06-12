'use strict';

/**
 * Activity.js controller
 *
 * @description: A set of functions called "actions" for managing `Activity`.
 */

module.exports = {

  /**
   * Retrieve activity records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.activity.search(ctx.query);
    } else {
      return strapi.services.activity.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a activity record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.activity.fetch(ctx.params);
  },

  /**
   * Count activity records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.activity.count(ctx.query, populate);
  },

  /**
   * Create a/an activity record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.activity.add(ctx.request.body);
  },

  /**
   * Update a/an activity record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.activity.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an activity record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.activity.remove(ctx.params);
  }
};
