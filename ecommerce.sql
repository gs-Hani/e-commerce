CREATE TABLE "orders" (
  "id" int PRIMARY KEY,
  "total" int NOT NULL,
  "created_at" date NOT NULL,
  "modified" date NOT NULL,
  "status" varchar(50) NOT NULL,
  "user_id" int NOT NULL
);

CREATE TABLE "order_items" (
  "order_id" int,
  "product_id" int,
  "created" date NOT NULL,
  "unit_price" money NOT NULL,
  "quantity" int CHECK (quantity >= 1),
  "name" varchar(50) NOT NULL,
  PRIMARY KEY(order_id,product_id)
);

CREATE TABLE "products" (
  "id" int PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "price" bigint NOT NULL,
  "description" varchar(200) NOT NULL
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY,
  "user_name" varchar(50) NOT NULL,
  "email" varchar(50) UNIQUE,
  "password" text NOT NULL,
  "date_of_birth" varchar NOT NULL,
  "credit" money CHECK (credit >= 0),
  "created_at" varchar NOT NULL
);

CREATE TABLE "cart" (
  "id" int PRIMARY KEY,
  "user_id" int NOT NULL,
  "created" date NOT NULL,
  "modified" date NOT NULL
);

CREATE TABLE "cart_item" (
  "product_id" int NOT NULL,
  "cart_id" int NOT NULL,
  PRIMARY KEY(product_id,cart_id)
);

ALTER TABLE "cart" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");
