CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryId" uuid DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	CONSTRAINT "Category_categoryId_unique" UNIQUE("categoryId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Media" (
	"id" serial PRIMARY KEY NOT NULL,
	"mediaId" uuid DEFAULT gen_random_uuid(),
	"publicUrl" varchar(255) NOT NULL,
	"path" varchar(255) NOT NULL,
	"type" varchar(255),
	CONSTRAINT "Media_mediaId_unique" UNIQUE("mediaId"),
	CONSTRAINT "Media_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProjectImage" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" serial NOT NULL,
	"imageId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" uuid DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"year" varchar(255) NOT NULL,
	"medium" varchar(255),
	"dimensions" varchar(255),
	"duration" varchar(255),
	"published" boolean DEFAULT false NOT NULL,
	"userId" serial NOT NULL,
	"categoryId" serial NOT NULL,
	"previewImageId" serial NOT NULL,
	"videoId" serial NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Project_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
ALTER TABLE "user" RENAME TO "User";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "user_userId_unique";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
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
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_userId_unique" UNIQUE("userId");--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");