export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ICartItem = {
  __typename?: 'CartItem';
  product: IProduct;
  quantity: Scalars['Int'];
};

export type IMutation = {
  __typename?: 'Mutation';
  addToCart: Scalars['Boolean'];
  createProduct: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
};


export type IMutationAddToCartArgs = {
  productId: Scalars['ID'];
};


export type IMutationCreateProductArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  short_description: Scalars['String'];
};


export type IMutationRemoveFromCartArgs = {
  productId: Scalars['ID'];
};

export type INode = {
  id: Scalars['ID'];
};

export type IPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type IProduct = INode & {
  __typename?: 'Product';
  description: Scalars['String'];
  id: Scalars['ID'];
  img: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  shortDescription: Scalars['String'];
};

export type IQuery = {
  __typename?: 'Query';
  cart: IQueryCartConnection;
  node?: Maybe<INode>;
  nodes: Array<Maybe<INode>>;
  products: IQueryProductsConnection;
};


export type IQueryCartArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type IQueryNodeArgs = {
  id: Scalars['ID'];
};


export type IQueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type IQueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type IQueryCartConnection = {
  __typename?: 'QueryCartConnection';
  edges: Array<Maybe<IQueryCartConnectionEdge>>;
  pageInfo: IPageInfo;
};

export type IQueryCartConnectionEdge = {
  __typename?: 'QueryCartConnectionEdge';
  cursor: Scalars['String'];
  node: ICartItem;
};

export type IQueryProductsConnection = {
  __typename?: 'QueryProductsConnection';
  edges: Array<Maybe<IQueryProductsConnectionEdge>>;
  pageInfo: IPageInfo;
};

export type IQueryProductsConnectionEdge = {
  __typename?: 'QueryProductsConnectionEdge';
  cursor: Scalars['String'];
  node: IProduct;
};

export type IProductFragmentFragment = { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string };

export type ICartConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ICartConnectionQuery = { __typename?: 'Query', cart: { __typename?: 'QueryCartConnection', edges: Array<{ __typename?: 'QueryCartConnectionEdge', node: { __typename?: 'CartItem', quantity: number, product: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } } } | null> } };

export type IProductConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type IProductConnectionQuery = { __typename?: 'Query', products: { __typename?: 'QueryProductsConnection', edges: Array<{ __typename?: 'QueryProductsConnectionEdge', node: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } } | null> } };

export type IProductNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IProductNodeQuery = { __typename?: 'Query', node?: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } | null };

export type IAddToCartMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type IAddToCartMutation = { __typename?: 'Mutation', addToCart: boolean };

export type IRemoveFromCartMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type IRemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: boolean };
