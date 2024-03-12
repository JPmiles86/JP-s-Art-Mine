--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 15.2

-- Started on 2024-03-07 15:10:41 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: jpmiles
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO jpmiles;

--
-- TOC entry 890 (class 1247 OID 25252)
-- Name: enum_Artworks_edition; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Artworks_edition" AS ENUM (
    'CP',
    'AP'
);


ALTER TYPE public."enum_Artworks_edition" OWNER TO jpm_art;

--
-- TOC entry 869 (class 1247 OID 25173)
-- Name: enum_Diptyches_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Diptyches_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);


ALTER TYPE public."enum_Diptyches_diptychType" OWNER TO jpm_art;

--
-- TOC entry 893 (class 1247 OID 25301)
-- Name: enum_Diptychs_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Diptychs_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape',
    'Entangled',
    'FusedPortrait',
    'FusedLandscape',
    'EntangledPrints'
);


ALTER TYPE public."enum_Diptychs_diptychType" OWNER TO jpm_art;

--
-- TOC entry 926 (class 1247 OID 41755)
-- Name: enum_EntityTypes_entityType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_EntityTypes_entityType" AS ENUM (
    'Person',
    'Company',
    'Organization'
);


ALTER TYPE public."enum_EntityTypes_entityType" OWNER TO jpm_art;

--
-- TOC entry 932 (class 1247 OID 41774)
-- Name: enum_Locations_LocationType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Locations_LocationType" AS ENUM (
    'Home',
    'Business',
    'Other'
);


ALTER TYPE public."enum_Locations_LocationType" OWNER TO jpm_art;

--
-- TOC entry 938 (class 1247 OID 41791)
-- Name: enum_PersonContactInfos_purchasePrivacyLevel; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);


ALTER TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" OWNER TO jpm_art;

--
-- TOC entry 878 (class 1247 OID 25204)
-- Name: enum_Pricings_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Pricings_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);


ALTER TYPE public."enum_Pricings_diptychType" OWNER TO jpm_art;

--
-- TOC entry 875 (class 1247 OID 25198)
-- Name: enum_Pricings_photoAspectRatio; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Pricings_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);


ALTER TYPE public."enum_Pricings_photoAspectRatio" OWNER TO jpm_art;

--
-- TOC entry 884 (class 1247 OID 25230)
-- Name: enum_PrintSizes_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrintSizes_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);


ALTER TYPE public."enum_PrintSizes_diptychType" OWNER TO jpm_art;

--
-- TOC entry 881 (class 1247 OID 25224)
-- Name: enum_PrintSizes_photoAspectRatio; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrintSizes_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);


ALTER TYPE public."enum_PrintSizes_photoAspectRatio" OWNER TO jpm_art;

--
-- TOC entry 953 (class 1247 OID 41864)
-- Name: enum_PrivacyPreferences_preferenceType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrivacyPreferences_preferenceType" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);


ALTER TYPE public."enum_PrivacyPreferences_preferenceType" OWNER TO jpm_art;

--
-- TOC entry 920 (class 1247 OID 41679)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'Admin',
    'Artist',
    'RegularUser'
);


ALTER TYPE public."enum_Users_role" OWNER TO jpm_art;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 241 (class 1259 OID 41836)
-- Name: Artists; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Artists" (
    "artistId" integer NOT NULL,
    "userId" integer NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "middleName" character varying(255),
    "lastName" character varying(255) NOT NULL,
    "birthYear" integer,
    "deathYear" integer,
    "shortBio" text,
    "extendedBio" text,
    "birthCountry" character varying(255),
    "cityOfResidence" character varying(255),
    "countryOfResidence" character varying(255),
    "profilePhotoUrl" character varying(255),
    "exhibitionHistory" text
);


ALTER TABLE public."Artists" OWNER TO jpm_art;

--
-- TOC entry 243 (class 1259 OID 41850)
-- Name: ArtistsAdditionalPhotos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtistsAdditionalPhotos" (
    "artistImageId" integer NOT NULL,
    "artistId" integer NOT NULL,
    "photoUrl" character varying(255) NOT NULL,
    description text,
    photographer character varying(255),
    "dateTaken" character varying(255),
    "yearTaken" integer,
    location character varying(255),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtistsAdditionalPhotos" OWNER TO jpm_art;

--
-- TOC entry 242 (class 1259 OID 41849)
-- Name: ArtistsAdditionalPhotos_artistImageId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtistsAdditionalPhotos_artistImageId_seq" OWNER TO jpm_art;

--
-- TOC entry 3830 (class 0 OID 0)
-- Dependencies: 242
-- Name: ArtistsAdditionalPhotos_artistImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq" OWNED BY public."ArtistsAdditionalPhotos"."artistImageId";


--
-- TOC entry 240 (class 1259 OID 41835)
-- Name: Artists_artistId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Artists_artistId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Artists_artistId_seq" OWNER TO jpm_art;

--
-- TOC entry 3831 (class 0 OID 0)
-- Dependencies: 240
-- Name: Artists_artistId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Artists_artistId_seq" OWNED BY public."Artists"."artistId";


--
-- TOC entry 224 (class 1259 OID 25825)
-- Name: Artworks; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Artworks" (
    id integer NOT NULL,
    "artworkID" character varying(255),
    "sizeCategoryId" integer,
    edition public."enum_Artworks_edition",
    status character varying(255),
    "photoRefId" integer,
    "diptychId" integer,
    "pricingId" integer,
    "printSizeId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Artworks" OWNER TO jpm_art;

--
-- TOC entry 223 (class 1259 OID 25824)
-- Name: Artworks_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Artworks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Artworks_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3832 (class 0 OID 0)
-- Dependencies: 223
-- Name: Artworks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Artworks_id_seq" OWNED BY public."Artworks".id;


--
-- TOC entry 247 (class 1259 OID 41884)
-- Name: AuditTrails; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."AuditTrails" (
    "AuditID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "ChangeType" text NOT NULL,
    "ChangeDetails" text NOT NULL,
    "ChangeDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."AuditTrails" OWNER TO jpm_art;

--
-- TOC entry 246 (class 1259 OID 41883)
-- Name: AuditTrails_AuditID_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."AuditTrails_AuditID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AuditTrails_AuditID_seq" OWNER TO jpm_art;

--
-- TOC entry 3833 (class 0 OID 0)
-- Dependencies: 246
-- Name: AuditTrails_AuditID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."AuditTrails_AuditID_seq" OWNED BY public."AuditTrails"."AuditID";


--
-- TOC entry 209 (class 1259 OID 25113)
-- Name: CameraModels; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."CameraModels" (
    "Model" character varying(255) NOT NULL,
    "cameraMake" character varying(255),
    "cameraModel" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CameraModels" OWNER TO jpm_art;

--
-- TOC entry 220 (class 1259 OID 25692)
-- Name: Dates; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Dates" (
    date character varying(255) NOT NULL,
    "dateFormal" character varying(255),
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Dates" OWNER TO jpm_art;

--
-- TOC entry 228 (class 1259 OID 33529)
-- Name: DiptychSVGs; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."DiptychSVGs" (
    id integer NOT NULL,
    "DiptychId" integer NOT NULL,
    fused character varying(255) NOT NULL,
    "FrameId" integer NOT NULL,
    "aspectRatio" character varying(255) NOT NULL,
    orientation character varying(255) NOT NULL,
    "leftSide" character varying(255) NOT NULL,
    "leftRotation" character varying(255) NOT NULL,
    "rightSide" character varying(255) NOT NULL,
    "rightRotation" character varying(255) NOT NULL,
    "shapeInCenterEdge" character varying(255) NOT NULL,
    "shapeAtTopEdge" character varying(255) NOT NULL,
    "shapeCode" character varying(255) NOT NULL,
    "DiptychIdName" character varying(255) NOT NULL,
    "DiptychIdCode" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."DiptychSVGs" OWNER TO jpm_art;

--
-- TOC entry 227 (class 1259 OID 33528)
-- Name: DiptychSVGs_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."DiptychSVGs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DiptychSVGs_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3834 (class 0 OID 0)
-- Dependencies: 227
-- Name: DiptychSVGs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."DiptychSVGs_id_seq" OWNED BY public."DiptychSVGs".id;


--
-- TOC entry 217 (class 1259 OID 25420)
-- Name: Diptychs; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Diptychs" (
    id integer NOT NULL,
    "diptychName" character varying(255) NOT NULL,
    "diptychType" public."enum_Diptychs_diptychType" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Diptychs" OWNER TO jpm_art;

--
-- TOC entry 216 (class 1259 OID 25419)
-- Name: Diptychs_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Diptychs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Diptychs_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3835 (class 0 OID 0)
-- Dependencies: 216
-- Name: Diptychs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Diptychs_id_seq" OWNED BY public."Diptychs".id;


--
-- TOC entry 233 (class 1259 OID 41762)
-- Name: EntityTypes; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."EntityTypes" (
    "entityId" integer NOT NULL,
    "userId" integer NOT NULL,
    "entityType" public."enum_EntityTypes_entityType" NOT NULL
);


ALTER TABLE public."EntityTypes" OWNER TO jpm_art;

--
-- TOC entry 232 (class 1259 OID 41761)
-- Name: EntityTypes_entityId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."EntityTypes_entityId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EntityTypes_entityId_seq" OWNER TO jpm_art;

--
-- TOC entry 3836 (class 0 OID 0)
-- Dependencies: 232
-- Name: EntityTypes_entityId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."EntityTypes_entityId_seq" OWNED BY public."EntityTypes"."entityId";


--
-- TOC entry 226 (class 1259 OID 25868)
-- Name: Frames; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Frames" (
    id integer NOT NULL,
    "frameType" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Frames" OWNER TO jpm_art;

--
-- TOC entry 225 (class 1259 OID 25867)
-- Name: Frames_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Frames_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Frames_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3837 (class 0 OID 0)
-- Dependencies: 225
-- Name: Frames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Frames_id_seq" OWNED BY public."Frames".id;


--
-- TOC entry 211 (class 1259 OID 25134)
-- Name: ImageNumbers; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ImageNumbers" (
    number character varying(255) NOT NULL,
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ImageNumbers" OWNER TO jpm_art;

--
-- TOC entry 235 (class 1259 OID 41782)
-- Name: Locations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Locations" (
    "LocationID" integer NOT NULL,
    "AddressLine1" character varying(255) NOT NULL,
    "AddressLine2" character varying(255),
    "City" character varying(100) NOT NULL,
    "StateProvince" character varying(100) NOT NULL,
    "PostalCode" character varying(20) NOT NULL,
    "Country" character varying(100) NOT NULL,
    "LocationType" public."enum_Locations_LocationType" NOT NULL
);


ALTER TABLE public."Locations" OWNER TO jpm_art;

--
-- TOC entry 234 (class 1259 OID 41781)
-- Name: Locations_LocationID_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Locations_LocationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Locations_LocationID_seq" OWNER TO jpm_art;

--
-- TOC entry 3838 (class 0 OID 0)
-- Dependencies: 234
-- Name: Locations_LocationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Locations_LocationID_seq" OWNED BY public."Locations"."LocationID";


--
-- TOC entry 239 (class 1259 OID 41817)
-- Name: OrganizationContactInfos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."OrganizationContactInfos" (
    "organizationContactId" integer NOT NULL,
    "entityId" integer NOT NULL,
    "organizationName" character varying(255) NOT NULL,
    "primaryEmail" character varying(255) NOT NULL,
    "secondaryEmail" character varying(255),
    "primaryPhone" character varying(20) NOT NULL,
    "secondaryPhone" character varying(20),
    "locationId" integer,
    instagram character varying(255),
    twitter character varying(255),
    "linkedIn" character varying(255),
    website character varying(255),
    "profilePhotoUrl" character varying(255),
    preferences text,
    "contactPerson1" character varying(255),
    "contactPerson1Role" character varying(255),
    "contactPerson1Email" character varying(255),
    "contactPerson1Phone" character varying(20),
    "contactPerson2" character varying(255),
    "contactPerson2Role" character varying(255),
    "contactPerson2Email" character varying(255),
    "contactPerson2Phone" character varying(20),
    "contactPerson3" character varying(255),
    "contactPerson3Role" character varying(255),
    "contactPerson3Email" character varying(255),
    "contactPerson3Phone" character varying(20),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."OrganizationContactInfos" OWNER TO jpm_art;

--
-- TOC entry 238 (class 1259 OID 41816)
-- Name: OrganizationContactInfos_organizationContactId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."OrganizationContactInfos_organizationContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OrganizationContactInfos_organizationContactId_seq" OWNER TO jpm_art;

--
-- TOC entry 3839 (class 0 OID 0)
-- Dependencies: 238
-- Name: OrganizationContactInfos_organizationContactId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."OrganizationContactInfos_organizationContactId_seq" OWNED BY public."OrganizationContactInfos"."organizationContactId";


--
-- TOC entry 237 (class 1259 OID 41798)
-- Name: PersonContactInfos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PersonContactInfos" (
    "personContactId" integer NOT NULL,
    "entityId" integer NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "middleName" character varying(255),
    "lastName" character varying(255) NOT NULL,
    "primaryEmail" character varying(255) NOT NULL,
    "secondaryEmail" character varying(255),
    "primaryPhone" character varying(20) NOT NULL,
    "secondaryPhone" character varying(20),
    "locationId" integer,
    instagram character varying(255),
    twitter character varying(255),
    "linkedIn" character varying(255),
    website character varying(255),
    "profilePhotoUrl" character varying(255),
    "relationshipToArtist" character varying(255),
    "purchasePrivacyLevel" public."enum_PersonContactInfos_purchasePrivacyLevel" NOT NULL,
    preferences text,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PersonContactInfos" OWNER TO jpm_art;

--
-- TOC entry 236 (class 1259 OID 41797)
-- Name: PersonContactInfos_personContactId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PersonContactInfos_personContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PersonContactInfos_personContactId_seq" OWNER TO jpm_art;

--
-- TOC entry 3840 (class 0 OID 0)
-- Dependencies: 236
-- Name: PersonContactInfos_personContactId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PersonContactInfos_personContactId_seq" OWNED BY public."PersonContactInfos"."personContactId";


--
-- TOC entry 222 (class 1259 OID 25794)
-- Name: Photos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Photos" (
    id integer NOT NULL,
    "photoID" character varying(255),
    series character varying(255),
    "seriesCode" character varying(255),
    "seriesName" character varying(255),
    date character varying(255),
    number character varying(255),
    model character varying(255),
    lens character varying(255),
    "focalLength" character varying(255),
    "shutterSpeed" character varying(255),
    aperture character varying(255),
    iso character varying(255),
    dimensions character varying(255),
    "aspectRatio" character varying(255),
    "dateOriginal" timestamp with time zone,
    "imagePath" character varying(255),
    "uniqueKey" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Photos" OWNER TO jpm_art;

--
-- TOC entry 221 (class 1259 OID 25793)
-- Name: Photos_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Photos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Photos_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3841 (class 0 OID 0)
-- Dependencies: 221
-- Name: Photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Photos_id_seq" OWNED BY public."Photos".id;


--
-- TOC entry 219 (class 1259 OID 25637)
-- Name: Pricings; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Pricings" (
    id integer NOT NULL,
    "sizeCategoryId" integer NOT NULL,
    "photoAspectRatio" public."enum_Pricings_photoAspectRatio",
    "diptychType" public."enum_Pricings_diptychType",
    price double precision NOT NULL,
    currency character varying(255) NOT NULL,
    "dateEffective" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Pricings" OWNER TO jpm_art;

--
-- TOC entry 218 (class 1259 OID 25636)
-- Name: Pricings_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Pricings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Pricings_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3842 (class 0 OID 0)
-- Dependencies: 218
-- Name: Pricings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Pricings_id_seq" OWNED BY public."Pricings".id;


--
-- TOC entry 215 (class 1259 OID 25238)
-- Name: PrintSizes; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PrintSizes" (
    id integer NOT NULL,
    "sizeCategoryId" integer NOT NULL,
    "photoAspectRatio" public."enum_PrintSizes_photoAspectRatio" NOT NULL,
    "diptychType" public."enum_PrintSizes_diptychType" NOT NULL,
    "sizeInInches" character varying(255) NOT NULL,
    "sizeInCm" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PrintSizes" OWNER TO jpm_art;

--
-- TOC entry 214 (class 1259 OID 25237)
-- Name: PrintSizes_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PrintSizes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PrintSizes_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3843 (class 0 OID 0)
-- Dependencies: 214
-- Name: PrintSizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrintSizes_id_seq" OWNED BY public."PrintSizes".id;


--
-- TOC entry 245 (class 1259 OID 41872)
-- Name: PrivacyPreferences; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PrivacyPreferences" (
    "privacyId" integer NOT NULL,
    "userId" integer NOT NULL,
    "transactionId" integer,
    "preferenceType" public."enum_PrivacyPreferences_preferenceType" NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PrivacyPreferences" OWNER TO jpm_art;

--
-- TOC entry 244 (class 1259 OID 41871)
-- Name: PrivacyPreferences_privacyId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PrivacyPreferences_privacyId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PrivacyPreferences_privacyId_seq" OWNER TO jpm_art;

--
-- TOC entry 3844 (class 0 OID 0)
-- Dependencies: 244
-- Name: PrivacyPreferences_privacyId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrivacyPreferences_privacyId_seq" OWNED BY public."PrivacyPreferences"."privacyId";


--
-- TOC entry 229 (class 1259 OID 41673)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO jpm_art;

--
-- TOC entry 210 (class 1259 OID 25120)
-- Name: Series; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Series" (
    "seriesCode" character varying(255) NOT NULL,
    "seriesName" character varying(255) NOT NULL,
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Series" OWNER TO jpm_art;

--
-- TOC entry 213 (class 1259 OID 25189)
-- Name: SizeCategories; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."SizeCategories" (
    id integer NOT NULL,
    "sizeLabel" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sizeName" character varying(255)
);


ALTER TABLE public."SizeCategories" OWNER TO jpm_art;

--
-- TOC entry 212 (class 1259 OID 25188)
-- Name: SizeCategories_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."SizeCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SizeCategories_id_seq" OWNER TO jpm_art;

--
-- TOC entry 3845 (class 0 OID 0)
-- Dependencies: 212
-- Name: SizeCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."SizeCategories_id_seq" OWNED BY public."SizeCategories".id;


--
-- TOC entry 231 (class 1259 OID 41740)
-- Name: Users; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Users" (
    "userId" integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "authMethod" character varying(50),
    provider character varying(255),
    "providerId" character varying(255),
    "accessToken" character varying(255),
    "refreshToken" character varying(255),
    username character varying(100),
    "isAnonymous" boolean DEFAULT false,
    role public."enum_Users_role" DEFAULT 'RegularUser'::public."enum_Users_role",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO jpm_art;

--
-- TOC entry 230 (class 1259 OID 41739)
-- Name: Users_userId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_userId_seq" OWNER TO jpm_art;

--
-- TOC entry 3846 (class 0 OID 0)
-- Dependencies: 230
-- Name: Users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";


--
-- TOC entry 3603 (class 2604 OID 41839)
-- Name: Artists artistId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists" ALTER COLUMN "artistId" SET DEFAULT nextval('public."Artists_artistId_seq"'::regclass);


--
-- TOC entry 3604 (class 2604 OID 41853)
-- Name: ArtistsAdditionalPhotos artistImageId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" SET DEFAULT nextval('public."ArtistsAdditionalPhotos_artistImageId_seq"'::regclass);


--
-- TOC entry 3593 (class 2604 OID 25828)
-- Name: Artworks id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks" ALTER COLUMN id SET DEFAULT nextval('public."Artworks_id_seq"'::regclass);


--
-- TOC entry 3606 (class 2604 OID 41887)
-- Name: AuditTrails AuditID; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails" ALTER COLUMN "AuditID" SET DEFAULT nextval('public."AuditTrails_AuditID_seq"'::regclass);


--
-- TOC entry 3595 (class 2604 OID 33532)
-- Name: DiptychSVGs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs" ALTER COLUMN id SET DEFAULT nextval('public."DiptychSVGs_id_seq"'::regclass);


--
-- TOC entry 3590 (class 2604 OID 25423)
-- Name: Diptychs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs" ALTER COLUMN id SET DEFAULT nextval('public."Diptychs_id_seq"'::regclass);


--
-- TOC entry 3599 (class 2604 OID 41765)
-- Name: EntityTypes entityId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EntityTypes" ALTER COLUMN "entityId" SET DEFAULT nextval('public."EntityTypes_entityId_seq"'::regclass);


--
-- TOC entry 3594 (class 2604 OID 25871)
-- Name: Frames id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames" ALTER COLUMN id SET DEFAULT nextval('public."Frames_id_seq"'::regclass);


--
-- TOC entry 3600 (class 2604 OID 41785)
-- Name: Locations LocationID; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Locations" ALTER COLUMN "LocationID" SET DEFAULT nextval('public."Locations_LocationID_seq"'::regclass);


--
-- TOC entry 3602 (class 2604 OID 41820)
-- Name: OrganizationContactInfos organizationContactId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" SET DEFAULT nextval('public."OrganizationContactInfos_organizationContactId_seq"'::regclass);


--
-- TOC entry 3601 (class 2604 OID 41801)
-- Name: PersonContactInfos personContactId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos" ALTER COLUMN "personContactId" SET DEFAULT nextval('public."PersonContactInfos_personContactId_seq"'::regclass);


--
-- TOC entry 3592 (class 2604 OID 25797)
-- Name: Photos id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."Photos_id_seq"'::regclass);


--
-- TOC entry 3591 (class 2604 OID 25640)
-- Name: Pricings id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings" ALTER COLUMN id SET DEFAULT nextval('public."Pricings_id_seq"'::regclass);


--
-- TOC entry 3589 (class 2604 OID 25241)
-- Name: PrintSizes id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes" ALTER COLUMN id SET DEFAULT nextval('public."PrintSizes_id_seq"'::regclass);


--
-- TOC entry 3605 (class 2604 OID 41875)
-- Name: PrivacyPreferences privacyId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences" ALTER COLUMN "privacyId" SET DEFAULT nextval('public."PrivacyPreferences_privacyId_seq"'::regclass);


--
-- TOC entry 3588 (class 2604 OID 25192)
-- Name: SizeCategories id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories" ALTER COLUMN id SET DEFAULT nextval('public."SizeCategories_id_seq"'::regclass);


--
-- TOC entry 3596 (class 2604 OID 41743)
-- Name: Users userId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);


--
-- TOC entry 3658 (class 2606 OID 41857)
-- Name: ArtistsAdditionalPhotos ArtistsAdditionalPhotos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_pkey" PRIMARY KEY ("artistImageId");


--
-- TOC entry 3656 (class 2606 OID 41843)
-- Name: Artists Artists_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_pkey" PRIMARY KEY ("artistId");


--
-- TOC entry 3632 (class 2606 OID 25834)
-- Name: Artworks Artworks_artworkID_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key" UNIQUE ("artworkID");


--
-- TOC entry 3634 (class 2606 OID 25832)
-- Name: Artworks Artworks_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pkey" PRIMARY KEY (id);


--
-- TOC entry 3662 (class 2606 OID 41891)
-- Name: AuditTrails AuditTrails_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_pkey" PRIMARY KEY ("AuditID");


--
-- TOC entry 3608 (class 2606 OID 25119)
-- Name: CameraModels CameraModels_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."CameraModels"
    ADD CONSTRAINT "CameraModels_pkey" PRIMARY KEY ("Model");


--
-- TOC entry 3626 (class 2606 OID 25698)
-- Name: Dates Dates_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Dates"
    ADD CONSTRAINT "Dates_pkey" PRIMARY KEY (date);


--
-- TOC entry 3638 (class 2606 OID 33536)
-- Name: DiptychSVGs DiptychSVGs_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_pkey" PRIMARY KEY (id);


--
-- TOC entry 3620 (class 2606 OID 25427)
-- Name: Diptychs Diptychs_diptychName_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key" UNIQUE ("diptychName");


--
-- TOC entry 3622 (class 2606 OID 25425)
-- Name: Diptychs Diptychs_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_pkey" PRIMARY KEY (id);


--
-- TOC entry 3648 (class 2606 OID 41767)
-- Name: EntityTypes EntityTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EntityTypes"
    ADD CONSTRAINT "EntityTypes_pkey" PRIMARY KEY ("entityId");


--
-- TOC entry 3636 (class 2606 OID 25873)
-- Name: Frames Frames_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames"
    ADD CONSTRAINT "Frames_pkey" PRIMARY KEY (id);


--
-- TOC entry 3612 (class 2606 OID 25140)
-- Name: ImageNumbers ImageNumbers_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ImageNumbers"
    ADD CONSTRAINT "ImageNumbers_pkey" PRIMARY KEY (number);


--
-- TOC entry 3650 (class 2606 OID 41789)
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("LocationID");


--
-- TOC entry 3654 (class 2606 OID 41824)
-- Name: OrganizationContactInfos OrganizationContactInfos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_pkey" PRIMARY KEY ("organizationContactId");


--
-- TOC entry 3652 (class 2606 OID 41805)
-- Name: PersonContactInfos PersonContactInfos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_pkey" PRIMARY KEY ("personContactId");


--
-- TOC entry 3628 (class 2606 OID 25801)
-- Name: Photos Photos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3630 (class 2606 OID 25803)
-- Name: Photos Photos_uniqueKey_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key" UNIQUE ("uniqueKey");


--
-- TOC entry 3624 (class 2606 OID 25642)
-- Name: Pricings Pricings_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_pkey" PRIMARY KEY (id);


--
-- TOC entry 3618 (class 2606 OID 25245)
-- Name: PrintSizes PrintSizes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3660 (class 2606 OID 41877)
-- Name: PrivacyPreferences PrivacyPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_pkey" PRIMARY KEY ("privacyId");


--
-- TOC entry 3640 (class 2606 OID 41677)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3610 (class 2606 OID 25126)
-- Name: Series Series_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("seriesCode");


--
-- TOC entry 3614 (class 2606 OID 25194)
-- Name: SizeCategories SizeCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_pkey" PRIMARY KEY (id);


--
-- TOC entry 3616 (class 2606 OID 25196)
-- Name: SizeCategories SizeCategories_sizeLabel_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key" UNIQUE ("sizeLabel");


--
-- TOC entry 3642 (class 2606 OID 41751)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 3644 (class 2606 OID 41749)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");


--
-- TOC entry 3646 (class 2606 OID 41753)
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- TOC entry 3682 (class 2606 OID 41858)
-- Name: ArtistsAdditionalPhotos ArtistsAdditionalPhotos_artistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES public."Artists"("artistId") ON UPDATE CASCADE;


--
-- TOC entry 3681 (class 2606 OID 41844)
-- Name: Artists Artists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- TOC entry 3669 (class 2606 OID 25845)
-- Name: Artworks Artworks_diptychId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_diptychId_fkey" FOREIGN KEY ("diptychId") REFERENCES public."Diptychs"(id) ON UPDATE CASCADE;


--
-- TOC entry 3670 (class 2606 OID 25840)
-- Name: Artworks Artworks_photoRefId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES public."Photos"(id) ON UPDATE CASCADE;


--
-- TOC entry 3671 (class 2606 OID 25850)
-- Name: Artworks Artworks_pricingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES public."Pricings"(id) ON UPDATE CASCADE;


--
-- TOC entry 3672 (class 2606 OID 25855)
-- Name: Artworks Artworks_printSizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_printSizeId_fkey" FOREIGN KEY ("printSizeId") REFERENCES public."PrintSizes"(id) ON UPDATE CASCADE;


--
-- TOC entry 3673 (class 2606 OID 25835)
-- Name: Artworks Artworks_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id) ON UPDATE CASCADE;


--
-- TOC entry 3684 (class 2606 OID 41892)
-- Name: AuditTrails AuditTrails_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- TOC entry 3674 (class 2606 OID 33537)
-- Name: DiptychSVGs DiptychSVGs_DiptychId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_DiptychId_fkey" FOREIGN KEY ("DiptychId") REFERENCES public."Diptychs"(id);


--
-- TOC entry 3675 (class 2606 OID 33542)
-- Name: DiptychSVGs DiptychSVGs_FrameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_FrameId_fkey" FOREIGN KEY ("FrameId") REFERENCES public."Frames"(id);


--
-- TOC entry 3676 (class 2606 OID 41768)
-- Name: EntityTypes EntityTypes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EntityTypes"
    ADD CONSTRAINT "EntityTypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- TOC entry 3679 (class 2606 OID 41825)
-- Name: OrganizationContactInfos OrganizationContactInfos_entityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."EntityTypes"("entityId") ON UPDATE CASCADE;


--
-- TOC entry 3680 (class 2606 OID 41830)
-- Name: OrganizationContactInfos OrganizationContactInfos_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("LocationID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3677 (class 2606 OID 41806)
-- Name: PersonContactInfos PersonContactInfos_entityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."EntityTypes"("entityId") ON UPDATE CASCADE;


--
-- TOC entry 3678 (class 2606 OID 41811)
-- Name: PersonContactInfos PersonContactInfos_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("LocationID") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3665 (class 2606 OID 25809)
-- Name: Photos Photos_date_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_date_fkey" FOREIGN KEY (date) REFERENCES public."Dates"(date);


--
-- TOC entry 3666 (class 2606 OID 25819)
-- Name: Photos Photos_model_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_model_fkey" FOREIGN KEY (model) REFERENCES public."CameraModels"("Model");


--
-- TOC entry 3667 (class 2606 OID 25814)
-- Name: Photos Photos_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_number_fkey" FOREIGN KEY (number) REFERENCES public."ImageNumbers"(number);


--
-- TOC entry 3668 (class 2606 OID 25804)
-- Name: Photos Photos_seriesCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_seriesCode_fkey" FOREIGN KEY ("seriesCode") REFERENCES public."Series"("seriesCode");


--
-- TOC entry 3664 (class 2606 OID 25643)
-- Name: Pricings Pricings_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);


--
-- TOC entry 3663 (class 2606 OID 25246)
-- Name: PrintSizes PrintSizes_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);


--
-- TOC entry 3683 (class 2606 OID 41878)
-- Name: PrivacyPreferences PrivacyPreferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- TOC entry 3829 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jpmiles
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-03-07 15:10:42 CST

--
-- PostgreSQL database dump complete
--

