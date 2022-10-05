CREATE TABLE "orders" (
  "order_id" serial PRIMARY KEY,
  "total" int NOT NULL,
  "created_at" date NOT NULL,
  "modified" date NOT NULL,
  "status" varchar(50) NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "order_items" (
  "order_id" int,
  "product_id" int,
  "created" DATE NOT NULL DEFAULT CURRENT_DATE,
  "unit_price" money NOT NULL,
  "quantity" int CHECK (quantity >= 1),
  "name" varchar(50) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE "products" (
  "product_id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "price" bigint NOT NULL,
  "description" varchar(200) NOT NULL,
  "category_id" integer NOT NULL
);

CREATE TABLE "users" (
  "user_id" serial PRIMARY KEY,
  "user_name" varchar(50) NOT NULL,
  "email" varchar(50) UNIQUE,
  "password" text NOT NULL,
  "date_of_birth" varchar NOT NULL,
  "credit" money NOT NULL DEFAULT 0,
  "created_at" DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE "carts" (
  "cart_id" int PRIMARY KEY,
  "created" DATE NOT NULL DEFAULT CURRENT_DATE,
  "modified" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "cart_items" (
  "product_id" int NOT NULL,
  "cart_id" int NOT NULL,
  "quantity" int NOT NULL DEFAULT 1,
  PRIMARY KEY (product_id, cart_id)
);

ALTER TABLE "carts" ADD FOREIGN KEY ("cart_id") REFERENCES "users" ("user_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("cart_id");
