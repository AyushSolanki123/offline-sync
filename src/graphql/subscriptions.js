/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports = {
    onCreateProduct: `
    subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
      onCreateProduct(filter: $filter) {
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
    onUpdateProduct: `
    subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
      onUpdateProduct(filter: $filter) {
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
    onDeleteProduct: `
    subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
      onDeleteProduct(filter: $filter) {
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
};
