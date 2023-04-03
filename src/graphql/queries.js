/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports = {
    getProduct: `
    query GetProduct($id: ID!) {
      getProduct(id: $id) {
        id
        title
        price
        category
        image
        isDeleted
        createdAt
        updatedAt
      }
    }
  `,
    listProducts: `
    query ListProducts(
      $filter: ModelProductFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          title
          price
          category
          image
          isDeleted
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  `,
    syncProducts: `
    query SyncProducts(
      $filter: ModelProductFilterInput
      $limit: Int
      $nextToken: String
      $lastSync: AWSTimestamp
    ) {
      syncProducts(
        filter: $filter
        limit: $limit
        nextToken: $nextToken
        lastSync: $lastSync
      ) {
        items {
          id
          title
          price
          category
          image
          isDeleted
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  `,
};
