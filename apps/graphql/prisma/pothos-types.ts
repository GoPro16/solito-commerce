import type { Prisma, Product } from "/Users/kylegray/Workspaces/github/cebroker-commerce/node_modules/@prisma/client";
export default interface PrismaTypes {
    Product: {
        Name: "Product";
        Shape: Product;
        Include: never;
        Select: Prisma.ProductSelect;
        Where: Prisma.ProductWhereUniqueInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}