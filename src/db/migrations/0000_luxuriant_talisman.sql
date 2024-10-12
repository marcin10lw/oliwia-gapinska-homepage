CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	CONSTRAINT "Category_categoryId_unique" UNIQUE("categoryId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Media" (
	"id" serial PRIMARY KEY NOT NULL,
	"mediaId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"publicUrl" varchar(255) NOT NULL,
	"path" varchar(255) NOT NULL,
	"type" varchar(255),
	CONSTRAINT "Media_mediaId_unique" UNIQUE("mediaId"),
	CONSTRAINT "Media_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProjectImage" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectImageId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"projectId" integer NOT NULL,
	"imageId" integer NOT NULL,
	CONSTRAINT "ProjectImage_projectImageId_unique" UNIQUE("projectImageId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"year" varchar(255) NOT NULL,
	"medium" varchar(255),
	"dimensions" varchar(255),
	"duration" varchar(255),
	"published" boolean DEFAULT false NOT NULL,
	"userId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"previewImageId" integer,
	"videoId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Project_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "User_userId_unique" UNIQUE("userId"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_imageId_Media_id_fk" FOREIGN KEY ("imageId") REFERENCES "public"."Media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_previewImageId_Media_id_fk" FOREIGN KEY ("previewImageId") REFERENCES "public"."Media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_videoId_Media_id_fk" FOREIGN KEY ("videoId") REFERENCES "public"."Media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
