/* global Type */
'use strict';

/**
 * Type.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

// Strapi utilities.
const utils = require('strapi-hook-bookshelf/lib/utils/');
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {

  /**
   * Promise to fetch all types.
   *
   * @return {Promise}
   */

  fetchAll: (params, populate) => {
    // Select field to populate.
    const withRelated = populate || Type.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const filters = convertRestQueryParams(params);

    return Type.query(buildQuery({ model: Type, filters }))
      .fetchAll({ withRelated })
      .then(data => data.toJSON());
  },

  /**
   * Promise to fetch a/an type.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Type.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    return Type.forge(_.pick(params, 'id')).fetch({
      withRelated: populate
    });
  },

  /**
   * Promise to count a/an type.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = convertRestQueryParams(params);

    return Type.query(buildQuery({ model: Type, filters: _.pick(filters, 'where') })).count();
  },

  /**
   * Promise to add a/an type.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Type.associations.map(ast => ast.alias));
    const data = _.omit(values, Type.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Type.forge(data).save();

    // Create relational data and return the entry.
    return Type.updateRelations({ id: entry.id , values: relations });
  },

  /**
   * Promise to edit a/an type.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Type.associations.map(ast => ast.alias));
    const data = _.omit(values, Type.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Type.forge(params).save(data);

    // Create relational data and return the entry.
    return Type.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an type.
   *
   * @return {Promise}
   */

  remove: async (params) => {
    params.values = {};
    Type.associations.map(association => {
      switch (association.nature) {
        case 'oneWay':
        case 'oneToOne':
        case 'manyToOne':
        case 'oneToManyMorph':
          params.values[association.alias] = null;
          break;
        case 'oneToMany':
        case 'manyToMany':
        case 'manyToManyMorph':
          params.values[association.alias] = [];
          break;
        default:
      }
    });

    await Type.updateRelations(params);

    return Type.forge(params).destroy();
  },

  /**
   * Promise to search a/an type.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Bookshelf.
    const filters = strapi.utils.models.convertParams('type', params);
    // Select field to populate.
    const populate = Type.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias);

    const associations = Type.associations.map(x => x.alias);
    const searchText = Object.keys(Type._attributes)
      .filter(attribute => attribute !== Type.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['string', 'text'].includes(Type._attributes[attribute].type));

    const searchInt = Object.keys(Type._attributes)
      .filter(attribute => attribute !== Type.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['integer', 'decimal', 'float'].includes(Type._attributes[attribute].type));

    const searchBool = Object.keys(Type._attributes)
      .filter(attribute => attribute !== Type.primaryKey && !associations.includes(attribute))
      .filter(attribute => ['boolean'].includes(Type._attributes[attribute].type));

    const query = (params._q || '').replace(/[^a-zA-Z0-9.-\s]+/g, '');

    return Type.query(qb => {
      if (!_.isNaN(_.toNumber(query))) {
        searchInt.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query)}`);
        });
      }

      if (query === 'true' || query === 'false') {
        searchBool.forEach(attribute => {
          qb.orWhereRaw(`${attribute} = ${_.toNumber(query === 'true')}`);
        });
      }

      // Search in columns with text using index.
      switch (Type.client) {
        case 'mysql':
          qb.orWhereRaw(`MATCH(${searchText.join(',')}) AGAINST(? IN BOOLEAN MODE)`, `*${query}*`);
          break;
        case 'pg': {
          const searchQuery = searchText.map(attribute =>
            _.toLower(attribute) === attribute
              ? `to_tsvector(${attribute})`
              : `to_tsvector('${attribute}')`
          );

          qb.orWhereRaw(`${searchQuery.join(' || ')} @@ to_tsquery(?)`, query);
          break;
        }
      }

      if (filters.sort) {
        qb.orderBy(filters.sort.key, filters.sort.order);
      }

      if (filters.skip) {
        qb.offset(_.toNumber(filters.skip));
      }

      if (filters.limit) {
        qb.limit(_.toNumber(filters.limit));
      }
    }).fetchAll({
      withRelated: populate
    });
  }
};
