CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "user_userId_unique" UNIQUE("userId"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
