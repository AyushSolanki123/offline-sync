import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum ModelAttributeTypes {
  BINARY = "binary",
  BINARY_SET = "binarySet",
  BOOL = "bool",
  LIST = "list",
  MAP = "map",
  NUMBER = "number",
  NUMBER_SET = "numberSet",
  STRING = "string",
  STRING_SET = "stringSet",
  NULL = "_null"
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

type EagerProduct = {
  readonly id: string;
  readonly title: string;
  readonly price?: number | null;
  readonly category?: string | null;
  readonly image?: string | null;
  readonly isDeleted?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

type LazyProduct = {
  readonly id: string;
  readonly title: string;
  readonly price?: number | null;
  readonly category?: string | null;
  readonly image?: string | null;
  readonly isDeleted?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _version: number;
  readonly _deleted?: boolean | null;
  readonly _lastChangedAt: number;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product)

type EagerModelProductConnection = {
  readonly items: (Product | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

type LazyModelProductConnection = {
  readonly items: (Product | null)[];
  readonly nextToken?: string | null;
  readonly startedAt?: number | null;
}

export declare type ModelProductConnection = LazyLoading extends LazyLoadingDisabled ? EagerModelProductConnection : LazyModelProductConnection

export declare const ModelProductConnection: (new (init: ModelInit<ModelProductConnection>) => ModelProductConnection)

