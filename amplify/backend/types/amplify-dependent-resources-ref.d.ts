export type AmplifyDependentResourcesAttributes = {
  "api": {
    "offlinesync": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "offlinesync689dcdce": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "offlineSyncProducts": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "offlinesyncmysqllayer": {
      "Arn": "string"
    }
  },
  "storage": {
    "offlineSyncProducts": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}