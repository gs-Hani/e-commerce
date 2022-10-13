CREATE TABLE "orders" (
  "order_id"   serial      PRIMARY KEY,
  "total"      int         NOT NULL,
  "created_at" date        NOT NULL DEFAULT CURRENT_DATE,
  "status"     varchar(50) NOT NULL DEFAULT processing,
  "user_id"    int         NOT NULL
);

CREATE TABLE "order_items" (
  "order_id"   int,
  "product_id" int,
  "name"       varchar(50) NOT NULL,
  "unit_price" int         NOT NULL,
  "quantity"   int         CHECK (quantity >= 1),
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE "products" (
  "product_id"  serial       PRIMARY KEY,
  "name"        varchar(50)  NOT NULL,
  "price"       bigint       NOT NULL,
  "description" varchar(200) NOT NULL,
  "category_id" integer      NOT NULL
);

CREATE TABLE "users" (
  "user_id"       serial      PRIMARY KEY,
  "user_name"     varchar(50) NOT NULL,
  "email"         varchar(50) UNIQUE,
  "password"      text        NOT NULL,
  "date_of_birth" varchar     NOT NULL,
  "credit"        int         NOT NULL DEFAULT 0,
  "created_at"    DATE        NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE "carts" (
  "cart_id"  int  PRIMARY KEY,
  "created"  DATE NOT NULL DEFAULT CURRENT_DATE,
  "modified" DATE 
);

CREATE TABLE "cart_items" (
  "product_id" int NOT NULL,
  "cart_id"    int NOT NULL,
  "quantity"   int NOT NULL DEFAULT 1,
  PRIMARY KEY (product_id, cart_id)
);

ALTER TABLE "carts"       ADD FOREIGN KEY ("cart_id")    REFERENCES "users"    ("user_id");

ALTER TABLE "orders"      ADD FOREIGN KEY ("user_id")    REFERENCES "users"    ("user_id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id")   REFERENCES "orders"   ("order_id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");

ALTER TABLE "cart_items"  ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");

ALTER TABLE "cart_items"  ADD FOREIGN KEY ("cart_id")    REFERENCES "carts"    ("cart_id");

CREATE OR REPLACE FUNCTION modifyCart() RETURNS TRIGGER AS $$
    BEGIN
        UPDATE carts SET modified = current_timestamp ;
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER carts_modified 
AFTER UPDATE ON cart_items
FOR EACH ROW 
EXECUTE PROCEDURE modifyCart();