import { boolean, pgEnum, pgTable, primaryKey, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('User', {
  id: serial().primaryKey(),
  userId: uuid().defaultRandom().unique(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const ProjectTable = pgTable('Project', {
  id: serial().primaryKey(),
  projectId: uuid().defaultRandom().unique(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  year: varchar({ length: 255 }).notNull(),
  medium: varchar({ length: 255 }),
  dimensions: varchar({ length: 255 }),
  duration: varchar({ length: 255 }),
  published: boolean().notNull().default(false),
  userId: serial()
    .references(() => UserTable.id)
    .notNull(),
  categoryId: serial()
    .references(() => CategoryTable.id)
    .notNull(),
  previewImageId: serial().references(() => MediaTable.id),
  videoId: serial().references(() => MediaTable.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const CategoryTable = pgTable('Category', {
  id: serial().primaryKey(),
  categoryId: uuid().defaultRandom().unique(),
  name: varchar({ length: 255 }).notNull(),
  published: boolean().notNull().default(false),
});

export const MediaTable = pgTable('Media', {
  id: serial().primaryKey(),
  mediaId: uuid().defaultRandom().unique(),
  publicUrl: varchar({ length: 255 }).notNull(),
  path: varchar({ length: 255 }).unique().notNull(),
  type: varchar({ length: 255 }),
});

export const ProjectImageTable = pgTable('ProjectImage', {
  id: serial().primaryKey(),
  projectId: serial()
    .references(() => ProjectTable.id)
    .notNull(),
  imageId: serial()
    .references(() => MediaTable.id)
    .notNull(),
});
