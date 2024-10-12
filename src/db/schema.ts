import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('User', {
  id: serial().primaryKey(),
  userId: uuid().defaultRandom().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  projects: many(ProjectTable),
}));

export const ProjectTable = pgTable('Project', {
  id: serial().primaryKey(),
  projectId: uuid().defaultRandom().notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  year: varchar({ length: 255 }).notNull(),
  medium: varchar({ length: 255 }),
  dimensions: varchar({ length: 255 }),
  duration: varchar({ length: 255 }),
  published: boolean().notNull().default(false),
  userId: integer()
    .notNull()
    .references(() => UserTable.id),
  categoryId: integer()
    .notNull()
    .references(() => CategoryTable.id),
  previewImageId: integer().references(() => MediaTable.id),
  videoId: integer().references(() => MediaTable.id),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const ProjectRelations = relations(ProjectTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [ProjectTable.userId],
    references: [UserTable.id],
  }),
  category: one(CategoryTable, {
    fields: [ProjectTable.categoryId],
    references: [CategoryTable.id],
  }),
  previewImage: one(MediaTable, {
    fields: [ProjectTable.previewImageId],
    references: [MediaTable.id],
  }),
  video: one(MediaTable, {
    fields: [ProjectTable.videoId],
    references: [MediaTable.id],
  }),
  images: many(ProjectImageTable),
}));

export const CategoryTable = pgTable('Category', {
  id: serial().primaryKey(),
  categoryId: uuid().defaultRandom().notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  published: boolean().notNull().default(false),
});

export const CategoryRelations = relations(CategoryTable, ({ many }) => ({
  projects: many(ProjectTable),
}));

export const MediaTable = pgTable('Media', {
  id: serial().primaryKey(),
  mediaId: uuid().defaultRandom().notNull().unique(),
  publicUrl: varchar({ length: 255 }).notNull(),
  path: varchar({ length: 255 }).unique().notNull(),
  type: varchar({ length: 255 }),
});

export const ProjectImageTable = pgTable('ProjectImage', {
  id: serial().primaryKey(),
  projectImageId: uuid().defaultRandom().notNull().unique(),
  projectId: integer()
    .notNull()
    .references(() => ProjectTable.id),
  imageId: integer()
    .notNull()
    .references(() => MediaTable.id),
});

export const ProjectImageRelations = relations(ProjectImageTable, ({ one }) => ({
  project: one(ProjectTable, {
    fields: [ProjectImageTable.projectId],
    references: [ProjectTable.id],
  }),
  image: one(MediaTable, {
    fields: [ProjectImageTable.imageId],
    references: [MediaTable.id],
  }),
}));
