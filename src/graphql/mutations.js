/* eslint-disable */
// this is an auto generated file. This will be overwritten

module.exports = {
    createProduct: `
    mutation CreateProduct(
      $input: CreateProductInput!
      $condition: ModelProductConditionInput
    ) {
      createProduct(input: $input, condition: $condition) {
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
    updateProduct: `
    mutation UpdateProduct(
      $input: UpdateProductInput!
      $condition: ModelProductConditionInput
    ) {
      updateProduct(input: $input, condition: $condition) {
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
    deleteProduct: `
    mutation DeleteProduct(
      $input: DeleteProductInput!
      $condition: ModelProductConditionInput
    ) {
      deleteProduct(input: $input, condition: $condition) {
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
