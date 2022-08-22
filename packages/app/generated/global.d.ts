type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type ICartItem = {
  __typename?: 'CartItem';
  product: IProduct;
  quantity: Scalars['Int'];
};

type IMutation = {
  __typename?: 'Mutation';
  addToCart: Scalars['Boolean'];
  createProduct: Scalars['Boolean'];
  removeFromCart: Scalars['Boolean'];
};


type IMutationAddToCartArgs = {
  productId: Scalars['ID'];
};


type IMutationCreateProductArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  short_description: Scalars['String'];
};


type IMutationRemoveFromCartArgs = {
  productId: Scalars['ID'];
};

type INode = {
  id: Scalars['ID'];
};

type IPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

type IProduct = INode & {
  __typename?: 'Product';
  description: Scalars['String'];
  id: Scalars['ID'];
  img: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  shortDescription: Scalars['String'];
};

type IQuery = {
  __typename?: 'Query';
  cart: IQueryCartConnection;
  node?: Maybe<INode>;
  nodes: Array<Maybe<INode>>;
  products: IQueryProductsConnection;
};


type IQueryCartArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


type IQueryNodeArgs = {
  id: Scalars['ID'];
};


type IQueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


type IQueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

type IQueryCartConnection = {
  __typename?: 'QueryCartConnection';
  edges: Array<Maybe<IQueryCartConnectionEdge>>;
  pageInfo: IPageInfo;
};

type IQueryCartConnectionEdge = {
  __typename?: 'QueryCartConnectionEdge';
  cursor: Scalars['String'];
  node: ICartItem;
};

type IQueryProductsConnection = {
  __typename?: 'QueryProductsConnection';
  edges: Array<Maybe<IQueryProductsConnectionEdge>>;
  pageInfo: IPageInfo;
};

type IQueryProductsConnectionEdge = {
  __typename?: 'QueryProductsConnectionEdge';
  cursor: Scalars['String'];
  node: IProduct;
};

type IProductFragmentFragment = { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string };

type ICartConnectionQueryVariables = Exact<{ [key: string]: never; }>;


type ICartConnectionQuery = { __typename?: 'Query', cart: { __typename?: 'QueryCartConnection', edges: Array<{ __typename?: 'QueryCartConnectionEdge', node: { __typename?: 'CartItem', quantity: number, product: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } } } | null> } };

type IProductConnectionQueryVariables = Exact<{ [key: string]: never; }>;


type IProductConnectionQuery = { __typename?: 'Query', products: { __typename?: 'QueryProductsConnection', edges: Array<{ __typename?: 'QueryProductsConnectionEdge', node: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } } | null> } };

type IProductNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


type IProductNodeQuery = { __typename?: 'Query', node?: { __typename?: 'Product', id: string, name: string, price: number, shortDescription: string, description: string, img: string } | null };

type IAddToCartMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


type IAddToCartMutation = { __typename?: 'Mutation', addToCart: boolean };

type IRemoveFromCartMutationVariables = Exact<{
  productId: Scalars['ID'];
}>;


type IRemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: boolean };
