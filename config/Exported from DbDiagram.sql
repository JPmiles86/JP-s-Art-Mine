CREATE TYPE "enum_Artworks_edition" AS ENUM (
  'CP',
  'AP'
);

CREATE TYPE "enum_Diptyches_diptychType" AS ENUM (
  'Singles',
  'mergedPortrait',
  'mergedLandscape'
);

CREATE TYPE "enum_Diptychs_diptychType" AS ENUM (
  'Singles',
  'mergedPortrait',
  'mergedLandscape',
  'Entangled',
  'FusedPortrait',
  'FusedLandscape',
  'EntangledPrints'
);

CREATE TYPE "enum_Pricings_diptychType" AS ENUM (
  'Singles',
  'mergedPortrait',
  'mergedLandscape'
);

CREATE TYPE "enum_Pricings_photoAspectRatio" AS ENUM (
  '2:3',
  '3:4'
);

CREATE TYPE "enum_PrintSizes_diptychType" AS ENUM (
  'Singles',
  'mergedPortrait',
  'mergedLandscape'
);

CREATE TYPE "enum_PrintSizes_photoAspectRatio" AS ENUM (
  '2:3',
  '3:4'
);

CREATE TABLE "Artworks" (
  "id" integer NOT NULL,
  "artworkID" "character varying(255)",
  "sizeCategoryId" integer,
  "edition" enum_Artworks_edition,
  "status" "character varying(255)",
  "photoRefId" integer,
  "diptychId" integer,
  "pricingId" integer,
  "printSizeId" integer,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "CameraModels" (
  "Model" "character varying(255)" NOT NULL,
  "cameraMake" "character varying(255)",
  "cameraModel" "character varying(255)",
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "Dates" (
  "date" "character varying(255)" NOT NULL,
  "dateFormal" "character varying(255)",
  "shortDescription" "character varying(150)",
  "extendedDescription" text,
  "imageUrl" "character varying(255)",
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "DiptychSVGs" (
  "id" integer NOT NULL,
  "DiptychId" integer NOT NULL,
  "fused" "character varying(255)" NOT NULL,
  "FrameId" integer NOT NULL,
  "aspectRatio" "character varying(255)" NOT NULL,
  "orientation" "character varying(255)" NOT NULL,
  "leftSide" "character varying(255)" NOT NULL,
  "leftRotation" "character varying(255)" NOT NULL,
  "rightSide" "character varying(255)" NOT NULL,
  "rightRotation" "character varying(255)" NOT NULL,
  "shapeInCenterEdge" "character varying(255)" NOT NULL,
  "shapeAtTopEdge" "character varying(255)" NOT NULL,
  "shapeCode" "character varying(255)" NOT NULL,
  "DiptychIdName" "character varying(255)" NOT NULL,
  "DiptychIdCode" "character varying(255)" NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "Diptychs" (
  "id" integer NOT NULL,
  "diptychName" "character varying(255)" NOT NULL,
  "diptychType" enum_Diptychs_diptychType NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "Frames" (
  "id" integer NOT NULL,
  "frameType" "character varying(255)" NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "ImageNumbers" (
  "number" "character varying(255)" NOT NULL,
  "shortDescription" "character varying(150)",
  "extendedDescription" text,
  "imageUrl" "character varying(255)",
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "Photos" (
  "id" integer NOT NULL,
  "photoID" "character varying(255)",
  "series" "character varying(255)",
  "seriesCode" "character varying(255)",
  "seriesName" "character varying(255)",
  "date" "character varying(255)",
  "number" "character varying(255)",
  "model" "character varying(255)",
  "lens" "character varying(255)",
  "focalLength" "character varying(255)",
  "shutterSpeed" "character varying(255)",
  "aperture" "character varying(255)",
  "iso" "character varying(255)",
  "dimensions" "character varying(255)",
  "aspectRatio" "character varying(255)",
  "dateOriginal" timestamp,
  "imagePath" "character varying(255)",
  "uniqueKey" "character varying(255)",
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "Pricings" (
  "id" integer NOT NULL,
  "sizeCategoryId" integer NOT NULL,
  "photoAspectRatio" enum_Pricings_photoAspectRatio,
  "diptychType" enum_Pricings_diptychType,
  "price" doubleprecision NOT NULL,
  "currency" "character varying(255)" NOT NULL,
  "dateEffective" timestamp NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "PrintSizes" (
  "id" integer NOT NULL,
  "sizeCategoryId" integer NOT NULL,
  "photoAspectRatio" enum_PrintSizes_photoAspectRatio NOT NULL,
  "diptychType" enum_PrintSizes_diptychType NOT NULL,
  "sizeInInches" "character varying(255)" NOT NULL,
  "sizeInCm" "character varying(255)" NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "SequelizeMeta" (
  "name" "character varying(255)" NOT NULL
);

CREATE TABLE "Series" (
  "seriesCode" "character varying(255)" NOT NULL,
  "seriesName" "character varying(255)" NOT NULL,
  "shortDescription" "character varying(150)",
  "extendedDescription" text,
  "imageUrl" "character varying(255)",
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

CREATE TABLE "SizeCategories" (
  "id" integer NOT NULL,
  "sizeLabel" "character varying(255)" NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "sizeName" "character varying(255)"
);

ALTER TABLE "Artworks" ADD CONSTRAINT "Artworks_diptychId_fkey" FOREIGN KEY ("diptychId") REFERENCES "Diptychs" ("id") ON UPDATE CASCADE;

ALTER TABLE "Artworks" ADD CONSTRAINT "Artworks_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES "Photos" ("id") ON UPDATE CASCADE;

ALTER TABLE "Artworks" ADD CONSTRAINT "Artworks_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricings" ("id") ON UPDATE CASCADE;

ALTER TABLE "Artworks" ADD CONSTRAINT "Artworks_printSizeId_fkey" FOREIGN KEY ("printSizeId") REFERENCES "PrintSizes" ("id") ON UPDATE CASCADE;

ALTER TABLE "Artworks" ADD CONSTRAINT "Artworks_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategories" ("id") ON UPDATE CASCADE;

ALTER TABLE "DiptychSVGs" ADD CONSTRAINT "DiptychSVGs_DiptychId_fkey" FOREIGN KEY ("DiptychId") REFERENCES "Diptychs" ("id");

ALTER TABLE "DiptychSVGs" ADD CONSTRAINT "DiptychSVGs_FrameId_fkey" FOREIGN KEY ("FrameId") REFERENCES "Frames" ("id");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_date_fkey" FOREIGN KEY ("date") REFERENCES "Dates" ("date");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_model_fkey" FOREIGN KEY ("model") REFERENCES "CameraModels" ("Model");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_number_fkey" FOREIGN KEY ("number") REFERENCES "ImageNumbers" ("number");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_seriesCode_fkey" FOREIGN KEY ("seriesCode") REFERENCES "Series" ("seriesCode");

ALTER TABLE "Pricings" ADD CONSTRAINT "Pricings_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategories" ("id");

ALTER TABLE "PrintSizes" ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategories" ("id");
