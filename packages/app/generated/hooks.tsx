import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

export const ProductFragmentFragmentDoc = gql`
    fragment ProductFragment on Product {
  id
  name
  price
  shortDescription
  description
  img
}
    `;
export const CartConnectionDocument = gql`
    query cartConnection {
  cart {
    edges {
      node {
        quantity
        product {
          ...ProductFragment
        }
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useCartConnectionQuery__
 *
 * To run a query within a React component, call `useCartConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ICartConnectionQuery, ICartConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ICartConnectionQuery, ICartConnectionQueryVariables>(CartConnectionDocument, options);
      }
export function useCartConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ICartConnectionQuery, ICartConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ICartConnectionQuery, ICartConnectionQueryVariables>(CartConnectionDocument, options);
        }
export type CartConnectionQueryHookResult = ReturnType<typeof useCartConnectionQuery>;
export type CartConnectionLazyQueryHookResult = ReturnType<typeof useCartConnectionLazyQuery>;
export type CartConnectionQueryResult = Apollo.QueryResult<ICartConnectionQuery, ICartConnectionQueryVariables>;
export const ProductConnectionDocument = gql`
    query productConnection {
  products {
    edges {
      node {
        ...ProductFragment
      }
    }
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductConnectionQuery__
 *
 * To run a query within a React component, call `useProductConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductConnectionQuery(baseOptions?: Apollo.QueryHookOptions<IProductConnectionQuery, IProductConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IProductConnectionQuery, IProductConnectionQueryVariables>(ProductConnectionDocument, options);
      }
export function useProductConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IProductConnectionQuery, IProductConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IProductConnectionQuery, IProductConnectionQueryVariables>(ProductConnectionDocument, options);
        }
export type ProductConnectionQueryHookResult = ReturnType<typeof useProductConnectionQuery>;
export type ProductConnectionLazyQueryHookResult = ReturnType<typeof useProductConnectionLazyQuery>;
export type ProductConnectionQueryResult = Apollo.QueryResult<IProductConnectionQuery, IProductConnectionQueryVariables>;
export const ProductNodeDocument = gql`
    query productNode($id: ID!) {
  node(id: $id) {
    ...ProductFragment
  }
}
    ${ProductFragmentFragmentDoc}`;

/**
 * __useProductNodeQuery__
 *
 * To run a query within a React component, call `useProductNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductNodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductNodeQuery(baseOptions: Apollo.QueryHookOptions<IProductNodeQuery, IProductNodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IProductNodeQuery, IProductNodeQueryVariables>(ProductNodeDocument, options);
      }
export function useProductNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IProductNodeQuery, IProductNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IProductNodeQuery, IProductNodeQueryVariables>(ProductNodeDocument, options);
        }
export type ProductNodeQueryHookResult = ReturnType<typeof useProductNodeQuery>;
export type ProductNodeLazyQueryHookResult = ReturnType<typeof useProductNodeLazyQuery>;
export type ProductNodeQueryResult = Apollo.QueryResult<IProductNodeQuery, IProductNodeQueryVariables>;
export const AddToCartDocument = gql`
    mutation addToCart($productId: ID!) {
  addToCart(productId: $productId)
}
    `;
export type IAddToCartMutationFn = Apollo.MutationFunction<IAddToCartMutation, IAddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<IAddToCartMutation, IAddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IAddToCartMutation, IAddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<IAddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<IAddToCartMutation, IAddToCartMutationVariables>;
export const RemoveFromCartDocument = gql`
    mutation removeFromCart($productId: ID!) {
  removeFromCart(productId: $productId)
}
    `;
export type IRemoveFromCartMutationFn = Apollo.MutationFunction<IRemoveFromCartMutation, IRemoveFromCartMutationVariables>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: Apollo.MutationHookOptions<IRemoveFromCartMutation, IRemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IRemoveFromCartMutation, IRemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<IRemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<IRemoveFromCartMutation, IRemoveFromCartMutationVariables>;