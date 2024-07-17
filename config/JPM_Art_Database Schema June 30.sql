--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 15.2

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: jpmiles
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO jpmiles;

--
-- Name: enum_Artworks_edition; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Artworks_edition" AS ENUM (
    'CP',
    'AP'
);


ALTER TYPE public."enum_Artworks_edition" OWNER TO jpm_art;

--
-- Name: enum_Diptyches_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Diptyches_diptychType" AS ENUM (
    'entangledPrints',
    'fusedPortrait',
    'fusedLandscape'
);


ALTER TYPE public."enum_Diptyches_diptychType" OWNER TO jpm_art;

--
-- Name: enum_Diptychs_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Diptychs_diptychType" AS ENUM (
    'entangledPrints',
    'fusedPortrait',
    'fusedLandscape',
    'Entangled',
    'FusedPortrait',
    'FusedLandscape',
    'EntangledPrints'
);


ALTER TYPE public."enum_Diptychs_diptychType" OWNER TO jpm_art;

--
-- Name: enum_EntityTypes_entityType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_EntityTypes_entityType" AS ENUM (
    'Person',
    'Company',
    'Organization'
);


ALTER TYPE public."enum_EntityTypes_entityType" OWNER TO jpm_art;

--
-- Name: enum_Locations_LocationType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Locations_LocationType" AS ENUM (
    'Home',
    'Business',
    'Other'
);


ALTER TYPE public."enum_Locations_LocationType" OWNER TO jpm_art;

--
-- Name: enum_Locations_locationType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Locations_locationType" AS ENUM (
    'Home',
    'Business',
    'Other'
);


ALTER TYPE public."enum_Locations_locationType" OWNER TO jpm_art;

--
-- Name: enum_PersonContactInfos_purchasePrivacyLevel; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);


ALTER TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" OWNER TO jpm_art;

--
-- Name: enum_Pricings_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Pricings_diptychType" AS ENUM (
    'entangledPrints',
    'fusedPortrait',
    'fusedLandscape'
);


ALTER TYPE public."enum_Pricings_diptychType" OWNER TO jpm_art;

--
-- Name: enum_Pricings_photoAspectRatio; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Pricings_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);


ALTER TYPE public."enum_Pricings_photoAspectRatio" OWNER TO jpm_art;

--
-- Name: enum_PrintSizes_diptychType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrintSizes_diptychType" AS ENUM (
    'entangledPrints',
    'fusedPortrait',
    'fusedLandscape'
);


ALTER TYPE public."enum_PrintSizes_diptychType" OWNER TO jpm_art;

--
-- Name: enum_PrintSizes_photoAspectRatio; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrintSizes_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);


ALTER TYPE public."enum_PrintSizes_photoAspectRatio" OWNER TO jpm_art;

--
-- Name: enum_PrivacyPreferences_preferenceType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PrivacyPreferences_preferenceType" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);


ALTER TYPE public."enum_PrivacyPreferences_preferenceType" OWNER TO jpm_art;

--
-- Name: enum_ProvenanceLocations_eventType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_ProvenanceLocations_eventType" AS ENUM (
    'Exhibition',
    'Storage',
    'Other'
);


ALTER TYPE public."enum_ProvenanceLocations_eventType" OWNER TO jpm_art;

--
-- Name: enum_PurchaseLocations_locationType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_PurchaseLocations_locationType" AS ENUM (
    'Shipping',
    'Billing'
);


ALTER TYPE public."enum_PurchaseLocations_locationType" OWNER TO jpm_art;

--
-- Name: enum_Sales_saleStatus; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Sales_saleStatus" AS ENUM (
    'Pending',
    'Completed',
    'Cancelled'
);


ALTER TYPE public."enum_Sales_saleStatus" OWNER TO jpm_art;

--
-- Name: enum_Sales_saleType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Sales_saleType" AS ENUM (
    'Primary',
    'Secondary'
);


ALTER TYPE public."enum_Sales_saleType" OWNER TO jpm_art;

--
-- Name: enum_UserLocations_locationType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_UserLocations_locationType" AS ENUM (
    'Home',
    'Business',
    'Shipping'
);


ALTER TYPE public."enum_UserLocations_locationType" OWNER TO jpm_art;

--
-- Name: enum_Users_entityType; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Users_entityType" AS ENUM (
    'Person',
    'Organization'
);


ALTER TYPE public."enum_Users_entityType" OWNER TO jpm_art;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: jpm_art
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'Admin',
    'Artist',
    'RegularUser',
    'AnonymousUser'
);


ALTER TYPE public."enum_Users_role" OWNER TO jpm_art;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: APSaleEligibilities; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."APSaleEligibilities" (
    "apSaleEligibilityId" integer NOT NULL,
    "cpArtworkId" integer NOT NULL,
    "apArtworkId" integer NOT NULL,
    "cpSaleDate" timestamp with time zone NOT NULL,
    "apSaleEligibilityDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."APSaleEligibilities" OWNER TO jpm_art;

--
-- Name: APSaleEligibilities_apSaleEligibilityId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."APSaleEligibilities_apSaleEligibilityId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."APSaleEligibilities_apSaleEligibilityId_seq" OWNER TO jpm_art;

--
-- Name: APSaleEligibilities_apSaleEligibilityId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."APSaleEligibilities_apSaleEligibilityId_seq" OWNED BY public."APSaleEligibilities"."apSaleEligibilityId";


--
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
-- Name: ArtistsAdditionalPhotos_artistImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq" OWNED BY public."ArtistsAdditionalPhotos"."artistImageId";


--
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
-- Name: Artists_artistId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Artists_artistId_seq" OWNED BY public."Artists"."artistId";


--
-- Name: ArtworkExhibition; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkExhibition" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "exhibitionId" integer NOT NULL,
    "artworkId" integer NOT NULL
);


ALTER TABLE public."ArtworkExhibition" OWNER TO jpm_art;

--
-- Name: ArtworkImages; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkImages" (
    "artworkImageId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "imageUrl" character varying(255) NOT NULL,
    "isPrimary" boolean DEFAULT false NOT NULL,
    caption character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkImages" OWNER TO jpm_art;

--
-- Name: ArtworkImages_artworkImageId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkImages_artworkImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkImages_artworkImageId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkImages_artworkImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkImages_artworkImageId_seq" OWNED BY public."ArtworkImages"."artworkImageId";


--
-- Name: ArtworkLocations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkLocations" (
    "artworkLocationId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "eventId" integer,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkLocations" OWNER TO jpm_art;

--
-- Name: ArtworkLocations_artworkLocationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkLocations_artworkLocationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkLocations_artworkLocationId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkLocations_artworkLocationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkLocations_artworkLocationId_seq" OWNED BY public."ArtworkLocations"."artworkLocationId";


--
-- Name: ArtworkPendings; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkPendings" (
    "artworkPendingId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "userId" integer,
    "pendingUntil" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkPendings" OWNER TO jpm_art;

--
-- Name: ArtworkPendings_artworkPendingId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkPendings_artworkPendingId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkPendings_artworkPendingId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkPendings_artworkPendingId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkPendings_artworkPendingId_seq" OWNED BY public."ArtworkPendings"."artworkPendingId";


--
-- Name: ArtworkTags; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkTags" (
    "artworkTagId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "tagType" character varying(50) NOT NULL,
    "tagValue" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkTags" OWNER TO jpm_art;

--
-- Name: ArtworkTags_artworkTagId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkTags_artworkTagId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkTags_artworkTagId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkTags_artworkTagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkTags_artworkTagId_seq" OWNED BY public."ArtworkTags"."artworkTagId";


--
-- Name: ArtworkTransactions; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkTransactions" (
    "transactionId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "eventId" integer NOT NULL,
    "transactionType" character varying(255) NOT NULL,
    amount numeric(10,2),
    currency character varying(3),
    "paymentMethod" character varying(255),
    "termsConditions" text,
    "transactionDate" timestamp with time zone NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "partyAEntityId" integer,
    "partyBEntityId" integer,
    "agreementUrl" character varying(255),
    notes text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkTransactions" OWNER TO jpm_art;

--
-- Name: ArtworkTransactions_transactionId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkTransactions_transactionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkTransactions_transactionId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkTransactions_transactionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkTransactions_transactionId_seq" OWNED BY public."ArtworkTransactions"."transactionId";


--
-- Name: ArtworkTransfers; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ArtworkTransfers" (
    "artworkTransferId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "eventId" integer NOT NULL,
    "transferDate" timestamp with time zone NOT NULL,
    "transferType" character varying(50) NOT NULL,
    "fromUserId" integer NOT NULL,
    "toUserId" integer NOT NULL,
    "ownershipTransferred" boolean DEFAULT false NOT NULL,
    "possessionTransferred" boolean DEFAULT false NOT NULL,
    notes text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ArtworkTransfers" OWNER TO jpm_art;

--
-- Name: ArtworkTransfers_artworkTransferId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ArtworkTransfers_artworkTransferId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ArtworkTransfers_artworkTransferId_seq" OWNER TO jpm_art;

--
-- Name: ArtworkTransfers_artworkTransferId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ArtworkTransfers_artworkTransferId_seq" OWNED BY public."ArtworkTransfers"."artworkTransferId";


--
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
-- Name: Artworks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Artworks_id_seq" OWNED BY public."Artworks".id;


--
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
-- Name: AuditTrails_AuditID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."AuditTrails_AuditID_seq" OWNED BY public."AuditTrails"."AuditID";


--
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
-- Name: ConditionReports; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ConditionReports" (
    "conditionReportId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "dateReported" timestamp with time zone NOT NULL,
    "reporterId" integer NOT NULL,
    "conditionSummary" text,
    "detailedReport" text,
    images character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ConditionReports" OWNER TO jpm_art;

--
-- Name: ConditionReports_conditionReportId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ConditionReports_conditionReportId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ConditionReports_conditionReportId_seq" OWNER TO jpm_art;

--
-- Name: ConditionReports_conditionReportId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ConditionReports_conditionReportId_seq" OWNED BY public."ConditionReports"."conditionReportId";


--
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
-- Name: DiptychSVGs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."DiptychSVGs_id_seq" OWNED BY public."DiptychSVGs".id;


--
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
-- Name: Diptychs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Diptychs_id_seq" OWNED BY public."Diptychs".id;


--
-- Name: Documents; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Documents" (
    "documentId" integer NOT NULL,
    "documentType" character varying(50) NOT NULL,
    "documentUrl" character varying(255),
    "saleId" integer,
    "transactionId" integer,
    "eventId" integer,
    "productionId" integer,
    "shippingId" integer,
    "artworkId" integer,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Documents" OWNER TO jpm_art;

--
-- Name: Documents_documentId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Documents_documentId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Documents_documentId_seq" OWNER TO jpm_art;

--
-- Name: Documents_documentId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Documents_documentId_seq" OWNED BY public."Documents"."documentId";


--
-- Name: EventRoles; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."EventRoles" (
    "eventRoleId" integer NOT NULL,
    "eventId" integer NOT NULL,
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone
);


ALTER TABLE public."EventRoles" OWNER TO jpm_art;

--
-- Name: EventRoles_eventRoleId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."EventRoles_eventRoleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventRoles_eventRoleId_seq" OWNER TO jpm_art;

--
-- Name: EventRoles_eventRoleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."EventRoles_eventRoleId_seq" OWNED BY public."EventRoles"."eventRoleId";


--
-- Name: EventTypes; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."EventTypes" (
    "eventTypeId" integer NOT NULL,
    "eventType" character varying(255) NOT NULL
);


ALTER TABLE public."EventTypes" OWNER TO jpm_art;

--
-- Name: EventTypes_eventTypeId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."EventTypes_eventTypeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EventTypes_eventTypeId_seq" OWNER TO jpm_art;

--
-- Name: EventTypes_eventTypeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."EventTypes_eventTypeId_seq" OWNED BY public."EventTypes"."eventTypeId";


--
-- Name: Events; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Events" (
    "eventId" integer NOT NULL,
    "eventTypeId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "eventDate" timestamp with time zone NOT NULL,
    description text,
    location character varying(255),
    "transferType" character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Events" OWNER TO jpm_art;

--
-- Name: Events_eventId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Events_eventId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Events_eventId_seq" OWNER TO jpm_art;

--
-- Name: Events_eventId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Events_eventId_seq" OWNED BY public."Events"."eventId";


--
-- Name: ExhibitionImages; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ExhibitionImages" (
    "exhibitionImageId" integer NOT NULL,
    "exhibitionId" integer NOT NULL,
    "imageUrl" character varying(255) NOT NULL,
    caption character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ExhibitionImages" OWNER TO jpm_art;

--
-- Name: ExhibitionImages_exhibitionImageId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ExhibitionImages_exhibitionImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ExhibitionImages_exhibitionImageId_seq" OWNER TO jpm_art;

--
-- Name: ExhibitionImages_exhibitionImageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ExhibitionImages_exhibitionImageId_seq" OWNED BY public."ExhibitionImages"."exhibitionImageId";


--
-- Name: Exhibitions; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Exhibitions" (
    "exhibitionId" integer NOT NULL,
    title character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    curator character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Exhibitions" OWNER TO jpm_art;

--
-- Name: Exhibitions_exhibitionId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Exhibitions_exhibitionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Exhibitions_exhibitionId_seq" OWNER TO jpm_art;

--
-- Name: Exhibitions_exhibitionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Exhibitions_exhibitionId_seq" OWNED BY public."Exhibitions"."exhibitionId";


--
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
-- Name: Frames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Frames_id_seq" OWNED BY public."Frames".id;


--
-- Name: HiddenPhotos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."HiddenPhotos" (
    "hiddenPhotoId" integer NOT NULL,
    "photoId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."HiddenPhotos" OWNER TO jpm_art;

--
-- Name: HiddenPhotos_hiddenPhotoId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HiddenPhotos_hiddenPhotoId_seq" OWNER TO jpm_art;

--
-- Name: HiddenPhotos_hiddenPhotoId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq" OWNED BY public."HiddenPhotos"."hiddenPhotoId";


--
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
-- Name: Insurances; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Insurances" (
    "insuranceId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "insurerId" integer NOT NULL,
    "policyNumber" character varying(255) NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "coverageAmount" numeric(10,2) NOT NULL,
    premium numeric(10,2) NOT NULL,
    deductible numeric(10,2),
    "termsConditions" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Insurances" OWNER TO jpm_art;

--
-- Name: Insurances_insuranceId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Insurances_insuranceId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Insurances_insuranceId_seq" OWNER TO jpm_art;

--
-- Name: Insurances_insuranceId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Insurances_insuranceId_seq" OWNED BY public."Insurances"."insuranceId";


--
-- Name: Likes; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Likes" (
    "likeId" integer NOT NULL,
    "userId" integer NOT NULL,
    "photoId" integer NOT NULL,
    "diptychIdCode" integer,
    "isLiked" boolean DEFAULT true NOT NULL,
    notes text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Likes" OWNER TO jpm_art;

--
-- Name: Likes_likeId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Likes_likeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Likes_likeId_seq" OWNER TO jpm_art;

--
-- Name: Likes_likeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Likes_likeId_seq" OWNED BY public."Likes"."likeId";


--
-- Name: Loans; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Loans" (
    "loanId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "lenderId" integer NOT NULL,
    "borrowerId" integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "locationId" integer NOT NULL,
    "loanStatus" character varying(50) NOT NULL,
    "loanPurpose" character varying(255) NOT NULL,
    "startConditionReportId" integer,
    "endConditionReportId" integer,
    "loanAgreementId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Loans" OWNER TO jpm_art;

--
-- Name: Loans_loanId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Loans_loanId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Loans_loanId_seq" OWNER TO jpm_art;

--
-- Name: Loans_loanId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Loans_loanId_seq" OWNED BY public."Loans"."loanId";


--
-- Name: Locations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Locations" (
    "locationId" integer NOT NULL,
    "businessName" character varying(255),
    "addressLine1" character varying(255) NOT NULL,
    "addressLine2" character varying(255),
    city character varying(100) NOT NULL,
    "stateProvince" character varying(100) NOT NULL,
    "postalCode" character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    "locationType" character varying(255) NOT NULL
);


ALTER TABLE public."Locations" OWNER TO jpm_art;

--
-- Name: Locations_locationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Locations_locationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Locations_locationId_seq" OWNER TO jpm_art;

--
-- Name: Locations_locationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Locations_locationId_seq" OWNED BY public."Locations"."locationId";


--
-- Name: OrganizationContactInfos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."OrganizationContactInfos" (
    "organizationContactId" integer NOT NULL,
    "userId" integer NOT NULL,
    "organizationName" character varying(255),
    "organizationType" character varying(255),
    "taxIdNumber" character varying(255),
    "primaryEmail" character varying(255),
    "secondaryEmail" character varying(255),
    "primaryPhone" character varying(20),
    "secondaryPhone" character varying(20),
    instagram character varying(255),
    twitter character varying(255),
    "linkedIn" character varying(255),
    website character varying(255),
    "contactPersonName" character varying(255),
    "contactPersonRole" character varying(255),
    "contactPersonEmail" character varying(255),
    "contactPersonPhone" character varying(20),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."OrganizationContactInfos" OWNER TO jpm_art;

--
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
-- Name: OrganizationContactInfos_organizationContactId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."OrganizationContactInfos_organizationContactId_seq" OWNED BY public."OrganizationContactInfos"."organizationContactId";


--
-- Name: PasswordResetTokens; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PasswordResetTokens" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    expires timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PasswordResetTokens" OWNER TO jpm_art;

--
-- Name: PasswordResetTokens_id_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PasswordResetTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PasswordResetTokens_id_seq" OWNER TO jpm_art;

--
-- Name: PasswordResetTokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PasswordResetTokens_id_seq" OWNED BY public."PasswordResetTokens".id;


--
-- Name: PersonContactInfos; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PersonContactInfos" (
    "personContactId" integer NOT NULL,
    "userId" integer NOT NULL,
    "firstName" character varying(255),
    "middleName" character varying(255),
    "lastName" character varying(255),
    "preferredName" character varying(255),
    "primaryEmail" character varying(255),
    "secondaryEmail" character varying(255),
    "primaryPhone" character varying(20),
    "secondaryPhone" character varying(20),
    profession character varying(255),
    instagram character varying(255),
    twitter character varying(255),
    "linkedIn" character varying(255),
    website character varying(255),
    "dateOfBirth" date,
    "countryOfBirth" character varying(255),
    "countryOfResidence" character varying(255),
    "relationshipToArtist" character varying(255),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PersonContactInfos" OWNER TO jpm_art;

--
-- Name: PersonContactInfos_personContactId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

ALTER TABLE public."PersonContactInfos" ALTER COLUMN "personContactId" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."PersonContactInfos_personContactId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
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
-- Name: Photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Photos_id_seq" OWNED BY public."Photos".id;


--
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
-- Name: Pricings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Pricings_id_seq" OWNED BY public."Pricings".id;


--
-- Name: PrintShops; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PrintShops" (
    "printShopId" integer NOT NULL,
    "companyName" character varying(255) NOT NULL,
    "locationId" integer NOT NULL,
    "contactPerson" character varying(255)
);


ALTER TABLE public."PrintShops" OWNER TO jpm_art;

--
-- Name: PrintShops_printShopId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PrintShops_printShopId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PrintShops_printShopId_seq" OWNER TO jpm_art;

--
-- Name: PrintShops_printShopId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrintShops_printShopId_seq" OWNED BY public."PrintShops"."printShopId";


--
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
-- Name: PrintSizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrintSizes_id_seq" OWNED BY public."PrintSizes".id;


--
-- Name: PrinterMachines; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PrinterMachines" (
    "printerId" integer NOT NULL,
    "printerName" character varying(255) NOT NULL,
    "printerLocation" character varying(255)
);


ALTER TABLE public."PrinterMachines" OWNER TO jpm_art;

--
-- Name: PrinterMachines_printerId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PrinterMachines_printerId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PrinterMachines_printerId_seq" OWNER TO jpm_art;

--
-- Name: PrinterMachines_printerId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrinterMachines_printerId_seq" OWNED BY public."PrinterMachines"."printerId";


--
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
-- Name: PrivacyPreferences_privacyId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PrivacyPreferences_privacyId_seq" OWNED BY public."PrivacyPreferences"."privacyId";


--
-- Name: Productions; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Productions" (
    "productionId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "printShopId" integer NOT NULL,
    "printerId" integer NOT NULL,
    "paperTypeId" integer NOT NULL,
    "inkTypeId" integer NOT NULL,
    "printingDate" timestamp with time zone NOT NULL,
    "proofingIterations" integer,
    "finalApprovalBy" character varying(255),
    "additionalNotes" text,
    "printCost" numeric(10,2) NOT NULL,
    "printInvoice" character varying(255),
    "shippingId" integer,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."Productions" OWNER TO jpm_art;

--
-- Name: Productions_productionId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Productions_productionId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Productions_productionId_seq" OWNER TO jpm_art;

--
-- Name: Productions_productionId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Productions_productionId_seq" OWNED BY public."Productions"."productionId";


--
-- Name: ProvenanceLocations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ProvenanceLocations" (
    "provenanceLocationId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "eventType" public."enum_ProvenanceLocations_eventType" NOT NULL,
    "eventDate" timestamp with time zone NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."ProvenanceLocations" OWNER TO jpm_art;

--
-- Name: ProvenanceLocations_provenanceLocationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ProvenanceLocations_provenanceLocationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProvenanceLocations_provenanceLocationId_seq" OWNER TO jpm_art;

--
-- Name: ProvenanceLocations_provenanceLocationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ProvenanceLocations_provenanceLocationId_seq" OWNED BY public."ProvenanceLocations"."provenanceLocationId";


--
-- Name: PurchaseLocations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PurchaseLocations" (
    "purchaseLocationId" integer NOT NULL,
    "saleId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "locationType" public."enum_PurchaseLocations_locationType" NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PurchaseLocations" OWNER TO jpm_art;

--
-- Name: PurchaseLocations_purchaseLocationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PurchaseLocations_purchaseLocationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PurchaseLocations_purchaseLocationId_seq" OWNER TO jpm_art;

--
-- Name: PurchaseLocations_purchaseLocationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PurchaseLocations_purchaseLocationId_seq" OWNED BY public."PurchaseLocations"."purchaseLocationId";


--
-- Name: PurchaseProvenanceRecords; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."PurchaseProvenanceRecords" (
    "purchaseProvenanceId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "purchaseId" integer NOT NULL,
    "entityType" character varying(20) NOT NULL,
    "person_firstName" character varying(255),
    "person_middleName" character varying(255),
    "person_lastName" character varying(255),
    "person_preferredName" character varying(255),
    "person_primaryEmail" character varying(255),
    "person_secondaryEmail" character varying(255),
    "person_primaryPhone" character varying(20),
    "person_secondaryPhone" character varying(20),
    person_profession character varying(255),
    person_instagram character varying(255),
    person_twitter character varying(255),
    "person_linkedIn" character varying(255),
    person_website character varying(255),
    "person_dateOfBirth" date,
    "person_countryOfBirth" character varying(255),
    "person_countryOfResidence" character varying(255),
    "person_relationshipToArtist" character varying(255),
    "org_organizationName" character varying(255),
    "org_organizationType" character varying(255),
    "org_taxIdNumber" character varying(255),
    "org_primaryEmail" character varying(255),
    "org_secondaryEmail" character varying(255),
    "org_primaryPhone" character varying(20),
    "org_secondaryPhone" character varying(20),
    org_instagram character varying(255),
    org_twitter character varying(255),
    "org_linkedIn" character varying(255),
    org_website character varying(255),
    "org_contactPersonName" character varying(255),
    "org_contactPersonRole" character varying(255),
    "org_contactPersonEmail" character varying(255),
    "org_contactPersonPhone" character varying(20),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."PurchaseProvenanceRecords" OWNER TO jpm_art;

--
-- Name: PurchaseProvenanceRecords_purchaseProvenanceId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."PurchaseProvenanceRecords_purchaseProvenanceId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PurchaseProvenanceRecords_purchaseProvenanceId_seq" OWNER TO jpm_art;

--
-- Name: PurchaseProvenanceRecords_purchaseProvenanceId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."PurchaseProvenanceRecords_purchaseProvenanceId_seq" OWNED BY public."PurchaseProvenanceRecords"."purchaseProvenanceId";


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Roles" (
    "roleId" integer NOT NULL,
    "roleName" character varying(255) NOT NULL
);


ALTER TABLE public."Roles" OWNER TO jpm_art;

--
-- Name: Roles_roleId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Roles_roleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_roleId_seq" OWNER TO jpm_art;

--
-- Name: Roles_roleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Roles_roleId_seq" OWNED BY public."Roles"."roleId";


--
-- Name: Sales; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Sales" (
    "saleId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "sellerId" integer NOT NULL,
    "sellerAgentId" integer,
    "buyerId" integer NOT NULL,
    "buyerAgentId" integer,
    "newOwnerId" integer NOT NULL,
    "saleDate" timestamp with time zone NOT NULL,
    "salePrice" numeric(10,2) NOT NULL,
    "discountCode" character varying(255),
    "discountPercentage" numeric(5,2),
    "purchasePrice" numeric(10,2) NOT NULL,
    "saleType" public."enum_Sales_saleType" NOT NULL,
    "charityId" integer,
    "charityRevenue" numeric(10,2),
    "sellerRevenue" numeric(10,2),
    "buyerAgentFee" numeric(10,2),
    "sellerAgentFee" numeric(10,2),
    "artistResaleRoyalty" numeric(10,2),
    "platformFee" numeric(10,2),
    "saleStatus" public."enum_Sales_saleStatus" NOT NULL,
    "productionId" integer,
    "shippingId" integer,
    "anonymousPurchase" boolean NOT NULL,
    "agentPurchaserRelationship" character varying(255),
    "termsConditions" text,
    "paymentMethod" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Sales" OWNER TO jpm_art;

--
-- Name: Sales_saleId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Sales_saleId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Sales_saleId_seq" OWNER TO jpm_art;

--
-- Name: Sales_saleId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Sales_saleId_seq" OWNED BY public."Sales"."saleId";


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO jpm_art;

--
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
-- Name: ShippingCompanies; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."ShippingCompanies" (
    "shippingCompanyId" integer NOT NULL,
    "companyName" character varying(255) NOT NULL,
    "trackingUrlTemplate" character varying(255)
);


ALTER TABLE public."ShippingCompanies" OWNER TO jpm_art;

--
-- Name: ShippingCompanies_shippingCompanyId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."ShippingCompanies_shippingCompanyId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ShippingCompanies_shippingCompanyId_seq" OWNER TO jpm_art;

--
-- Name: ShippingCompanies_shippingCompanyId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."ShippingCompanies_shippingCompanyId_seq" OWNED BY public."ShippingCompanies"."shippingCompanyId";


--
-- Name: Shippings; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."Shippings" (
    "shippingId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    "originLocationId" integer NOT NULL,
    "destinationLocationId" integer NOT NULL,
    "shippingCompanyId" integer NOT NULL,
    "trackingNumber" character varying(255),
    "shippedDate" timestamp with time zone NOT NULL,
    "estimatedArrivalDate" timestamp with time zone,
    "actualArrivalDate" timestamp with time zone,
    "shippingCost" numeric(10,2) NOT NULL,
    "shippingInvoice" character varying(255),
    "insuranceValue" numeric(10,2),
    status character varying(255) NOT NULL,
    notes text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Shippings" OWNER TO jpm_art;

--
-- Name: Shippings_shippingId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."Shippings_shippingId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Shippings_shippingId_seq" OWNER TO jpm_art;

--
-- Name: Shippings_shippingId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Shippings_shippingId_seq" OWNED BY public."Shippings"."shippingId";


--
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
-- Name: SizeCategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."SizeCategories_id_seq" OWNED BY public."SizeCategories".id;


--
-- Name: UserLocations; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."UserLocations" (
    "userLocationId" integer NOT NULL,
    "userId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserLocations" OWNER TO jpm_art;

--
-- Name: UserLocations_userLocationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."UserLocations_userLocationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserLocations_userLocationId_seq" OWNER TO jpm_art;

--
-- Name: UserLocations_userLocationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."UserLocations_userLocationId_seq" OWNED BY public."UserLocations"."userLocationId";


--
-- Name: UserNotifications; Type: TABLE; Schema: public; Owner: jpm_art
--

CREATE TABLE public."UserNotifications" (
    "userNotificationId" integer NOT NULL,
    "userId" integer NOT NULL,
    "artworkId" integer NOT NULL,
    notified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserNotifications" OWNER TO jpm_art;

--
-- Name: UserNotifications_userNotificationId_seq; Type: SEQUENCE; Schema: public; Owner: jpm_art
--

CREATE SEQUENCE public."UserNotifications_userNotificationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserNotifications_userNotificationId_seq" OWNER TO jpm_art;

--
-- Name: UserNotifications_userNotificationId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."UserNotifications_userNotificationId_seq" OWNED BY public."UserNotifications"."userNotificationId";


--
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
    "profilePhotoUrl" character varying(255),
    "isAnonymous" boolean DEFAULT false,
    role public."enum_Users_role" DEFAULT 'RegularUser'::public."enum_Users_role",
    "entityType" public."enum_Users_entityType",
    "createdBy" integer,
    "creationReason" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO jpm_art;

--
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
-- Name: Users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jpm_art
--

ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";


--
-- Name: APSaleEligibilities apSaleEligibilityId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."APSaleEligibilities" ALTER COLUMN "apSaleEligibilityId" SET DEFAULT nextval('public."APSaleEligibilities_apSaleEligibilityId_seq"'::regclass);


--
-- Name: Artists artistId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists" ALTER COLUMN "artistId" SET DEFAULT nextval('public."Artists_artistId_seq"'::regclass);


--
-- Name: ArtistsAdditionalPhotos artistImageId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" SET DEFAULT nextval('public."ArtistsAdditionalPhotos_artistImageId_seq"'::regclass);


--
-- Name: ArtworkImages artworkImageId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkImages" ALTER COLUMN "artworkImageId" SET DEFAULT nextval('public."ArtworkImages_artworkImageId_seq"'::regclass);


--
-- Name: ArtworkLocations artworkLocationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkLocations" ALTER COLUMN "artworkLocationId" SET DEFAULT nextval('public."ArtworkLocations_artworkLocationId_seq"'::regclass);


--
-- Name: ArtworkPendings artworkPendingId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkPendings" ALTER COLUMN "artworkPendingId" SET DEFAULT nextval('public."ArtworkPendings_artworkPendingId_seq"'::regclass);


--
-- Name: ArtworkTags artworkTagId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTags" ALTER COLUMN "artworkTagId" SET DEFAULT nextval('public."ArtworkTags_artworkTagId_seq"'::regclass);


--
-- Name: ArtworkTransactions transactionId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions" ALTER COLUMN "transactionId" SET DEFAULT nextval('public."ArtworkTransactions_transactionId_seq"'::regclass);


--
-- Name: ArtworkTransfers artworkTransferId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers" ALTER COLUMN "artworkTransferId" SET DEFAULT nextval('public."ArtworkTransfers_artworkTransferId_seq"'::regclass);


--
-- Name: Artworks id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks" ALTER COLUMN id SET DEFAULT nextval('public."Artworks_id_seq"'::regclass);


--
-- Name: AuditTrails AuditID; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails" ALTER COLUMN "AuditID" SET DEFAULT nextval('public."AuditTrails_AuditID_seq"'::regclass);


--
-- Name: ConditionReports conditionReportId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ConditionReports" ALTER COLUMN "conditionReportId" SET DEFAULT nextval('public."ConditionReports_conditionReportId_seq"'::regclass);


--
-- Name: DiptychSVGs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs" ALTER COLUMN id SET DEFAULT nextval('public."DiptychSVGs_id_seq"'::regclass);


--
-- Name: Diptychs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs" ALTER COLUMN id SET DEFAULT nextval('public."Diptychs_id_seq"'::regclass);


--
-- Name: Documents documentId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents" ALTER COLUMN "documentId" SET DEFAULT nextval('public."Documents_documentId_seq"'::regclass);


--
-- Name: EventRoles eventRoleId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventRoles" ALTER COLUMN "eventRoleId" SET DEFAULT nextval('public."EventRoles_eventRoleId_seq"'::regclass);


--
-- Name: EventTypes eventTypeId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventTypes" ALTER COLUMN "eventTypeId" SET DEFAULT nextval('public."EventTypes_eventTypeId_seq"'::regclass);


--
-- Name: Events eventId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Events" ALTER COLUMN "eventId" SET DEFAULT nextval('public."Events_eventId_seq"'::regclass);


--
-- Name: ExhibitionImages exhibitionImageId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ExhibitionImages" ALTER COLUMN "exhibitionImageId" SET DEFAULT nextval('public."ExhibitionImages_exhibitionImageId_seq"'::regclass);


--
-- Name: Exhibitions exhibitionId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Exhibitions" ALTER COLUMN "exhibitionId" SET DEFAULT nextval('public."Exhibitions_exhibitionId_seq"'::regclass);


--
-- Name: Frames id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames" ALTER COLUMN id SET DEFAULT nextval('public."Frames_id_seq"'::regclass);


--
-- Name: HiddenPhotos hiddenPhotoId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."HiddenPhotos" ALTER COLUMN "hiddenPhotoId" SET DEFAULT nextval('public."HiddenPhotos_hiddenPhotoId_seq"'::regclass);


--
-- Name: Insurances insuranceId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Insurances" ALTER COLUMN "insuranceId" SET DEFAULT nextval('public."Insurances_insuranceId_seq"'::regclass);


--
-- Name: Likes likeId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Likes" ALTER COLUMN "likeId" SET DEFAULT nextval('public."Likes_likeId_seq"'::regclass);


--
-- Name: Loans loanId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans" ALTER COLUMN "loanId" SET DEFAULT nextval('public."Loans_loanId_seq"'::regclass);


--
-- Name: Locations locationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Locations" ALTER COLUMN "locationId" SET DEFAULT nextval('public."Locations_locationId_seq"'::regclass);


--
-- Name: OrganizationContactInfos organizationContactId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" SET DEFAULT nextval('public."OrganizationContactInfos_organizationContactId_seq"'::regclass);


--
-- Name: PasswordResetTokens id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PasswordResetTokens" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetTokens_id_seq"'::regclass);


--
-- Name: Photos id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."Photos_id_seq"'::regclass);


--
-- Name: Pricings id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings" ALTER COLUMN id SET DEFAULT nextval('public."Pricings_id_seq"'::regclass);


--
-- Name: PrintShops printShopId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintShops" ALTER COLUMN "printShopId" SET DEFAULT nextval('public."PrintShops_printShopId_seq"'::regclass);


--
-- Name: PrintSizes id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes" ALTER COLUMN id SET DEFAULT nextval('public."PrintSizes_id_seq"'::regclass);


--
-- Name: PrinterMachines printerId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrinterMachines" ALTER COLUMN "printerId" SET DEFAULT nextval('public."PrinterMachines_printerId_seq"'::regclass);


--
-- Name: PrivacyPreferences privacyId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences" ALTER COLUMN "privacyId" SET DEFAULT nextval('public."PrivacyPreferences_privacyId_seq"'::regclass);


--
-- Name: Productions productionId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions" ALTER COLUMN "productionId" SET DEFAULT nextval('public."Productions_productionId_seq"'::regclass);


--
-- Name: ProvenanceLocations provenanceLocationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ProvenanceLocations" ALTER COLUMN "provenanceLocationId" SET DEFAULT nextval('public."ProvenanceLocations_provenanceLocationId_seq"'::regclass);


--
-- Name: PurchaseLocations purchaseLocationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseLocations" ALTER COLUMN "purchaseLocationId" SET DEFAULT nextval('public."PurchaseLocations_purchaseLocationId_seq"'::regclass);


--
-- Name: PurchaseProvenanceRecords purchaseProvenanceId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseProvenanceRecords" ALTER COLUMN "purchaseProvenanceId" SET DEFAULT nextval('public."PurchaseProvenanceRecords_purchaseProvenanceId_seq"'::regclass);


--
-- Name: Roles roleId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Roles" ALTER COLUMN "roleId" SET DEFAULT nextval('public."Roles_roleId_seq"'::regclass);


--
-- Name: Sales saleId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales" ALTER COLUMN "saleId" SET DEFAULT nextval('public."Sales_saleId_seq"'::regclass);


--
-- Name: ShippingCompanies shippingCompanyId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ShippingCompanies" ALTER COLUMN "shippingCompanyId" SET DEFAULT nextval('public."ShippingCompanies_shippingCompanyId_seq"'::regclass);


--
-- Name: Shippings shippingId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings" ALTER COLUMN "shippingId" SET DEFAULT nextval('public."Shippings_shippingId_seq"'::regclass);


--
-- Name: SizeCategories id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories" ALTER COLUMN id SET DEFAULT nextval('public."SizeCategories_id_seq"'::regclass);


--
-- Name: UserLocations userLocationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserLocations" ALTER COLUMN "userLocationId" SET DEFAULT nextval('public."UserLocations_userLocationId_seq"'::regclass);


--
-- Name: UserNotifications userNotificationId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserNotifications" ALTER COLUMN "userNotificationId" SET DEFAULT nextval('public."UserNotifications_userNotificationId_seq"'::regclass);


--
-- Name: Users userId; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);


--
-- Name: APSaleEligibilities APSaleEligibilities_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."APSaleEligibilities"
    ADD CONSTRAINT "APSaleEligibilities_pkey" PRIMARY KEY ("apSaleEligibilityId");


--
-- Name: ArtistsAdditionalPhotos ArtistsAdditionalPhotos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_pkey" PRIMARY KEY ("artistImageId");


--
-- Name: Artists Artists_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_pkey" PRIMARY KEY ("artistId");


--
-- Name: ArtworkExhibition ArtworkExhibition_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkExhibition"
    ADD CONSTRAINT "ArtworkExhibition_pkey" PRIMARY KEY ("exhibitionId", "artworkId");


--
-- Name: ArtworkImages ArtworkImages_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkImages"
    ADD CONSTRAINT "ArtworkImages_pkey" PRIMARY KEY ("artworkImageId");


--
-- Name: ArtworkLocations ArtworkLocations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkLocations"
    ADD CONSTRAINT "ArtworkLocations_pkey" PRIMARY KEY ("artworkLocationId");


--
-- Name: ArtworkPendings ArtworkPendings_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkPendings"
    ADD CONSTRAINT "ArtworkPendings_pkey" PRIMARY KEY ("artworkPendingId");


--
-- Name: ArtworkTags ArtworkTags_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTags"
    ADD CONSTRAINT "ArtworkTags_pkey" PRIMARY KEY ("artworkTagId");


--
-- Name: ArtworkTransactions ArtworkTransactions_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions"
    ADD CONSTRAINT "ArtworkTransactions_pkey" PRIMARY KEY ("transactionId");


--
-- Name: ArtworkTransfers ArtworkTransfers_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers"
    ADD CONSTRAINT "ArtworkTransfers_pkey" PRIMARY KEY ("artworkTransferId");


--
-- Name: Artworks Artworks_artworkID_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key" UNIQUE ("artworkID");


--
-- Name: Artworks Artworks_artworkID_key1; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key1" UNIQUE ("artworkID");


--
-- Name: Artworks Artworks_artworkID_key2; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key2" UNIQUE ("artworkID");


--
-- Name: Artworks Artworks_artworkID_key3; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key3" UNIQUE ("artworkID");


--
-- Name: Artworks Artworks_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pkey" PRIMARY KEY (id);


--
-- Name: AuditTrails AuditTrails_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_pkey" PRIMARY KEY ("AuditID");


--
-- Name: CameraModels CameraModels_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."CameraModels"
    ADD CONSTRAINT "CameraModels_pkey" PRIMARY KEY ("Model");


--
-- Name: ConditionReports ConditionReports_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ConditionReports"
    ADD CONSTRAINT "ConditionReports_pkey" PRIMARY KEY ("conditionReportId");


--
-- Name: Dates Dates_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Dates"
    ADD CONSTRAINT "Dates_pkey" PRIMARY KEY (date);


--
-- Name: DiptychSVGs DiptychSVGs_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_pkey" PRIMARY KEY (id);


--
-- Name: Diptychs Diptychs_diptychName_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key" UNIQUE ("diptychName");


--
-- Name: Diptychs Diptychs_diptychName_key1; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key1" UNIQUE ("diptychName");


--
-- Name: Diptychs Diptychs_diptychName_key2; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key2" UNIQUE ("diptychName");


--
-- Name: Diptychs Diptychs_diptychName_key3; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key3" UNIQUE ("diptychName");


--
-- Name: Diptychs Diptychs_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_pkey" PRIMARY KEY (id);


--
-- Name: Documents Documents_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_pkey" PRIMARY KEY ("documentId");


--
-- Name: EventRoles EventRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventRoles"
    ADD CONSTRAINT "EventRoles_pkey" PRIMARY KEY ("eventRoleId");


--
-- Name: EventTypes EventTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventTypes"
    ADD CONSTRAINT "EventTypes_pkey" PRIMARY KEY ("eventTypeId");


--
-- Name: Events Events_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("eventId");


--
-- Name: ExhibitionImages ExhibitionImages_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ExhibitionImages"
    ADD CONSTRAINT "ExhibitionImages_pkey" PRIMARY KEY ("exhibitionImageId");


--
-- Name: Exhibitions Exhibitions_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Exhibitions"
    ADD CONSTRAINT "Exhibitions_pkey" PRIMARY KEY ("exhibitionId");


--
-- Name: Frames Frames_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames"
    ADD CONSTRAINT "Frames_pkey" PRIMARY KEY (id);


--
-- Name: HiddenPhotos HiddenPhotos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_pkey" PRIMARY KEY ("hiddenPhotoId");


--
-- Name: ImageNumbers ImageNumbers_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ImageNumbers"
    ADD CONSTRAINT "ImageNumbers_pkey" PRIMARY KEY (number);


--
-- Name: Insurances Insurances_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Insurances"
    ADD CONSTRAINT "Insurances_pkey" PRIMARY KEY ("insuranceId");


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("likeId");


--
-- Name: Loans Loans_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_pkey" PRIMARY KEY ("loanId");


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("locationId");


--
-- Name: OrganizationContactInfos OrganizationContactInfos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_pkey" PRIMARY KEY ("organizationContactId");


--
-- Name: PasswordResetTokens PasswordResetTokens_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PasswordResetTokens"
    ADD CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY (id);


--
-- Name: PersonContactInfos PersonContactInfos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_pkey" PRIMARY KEY ("personContactId");


--
-- Name: Photos Photos_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_pkey" PRIMARY KEY (id);


--
-- Name: Photos Photos_uniqueKey_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key" UNIQUE ("uniqueKey");


--
-- Name: Photos Photos_uniqueKey_key1; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key1" UNIQUE ("uniqueKey");


--
-- Name: Photos Photos_uniqueKey_key2; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key2" UNIQUE ("uniqueKey");


--
-- Name: Photos Photos_uniqueKey_key3; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key3" UNIQUE ("uniqueKey");


--
-- Name: Pricings Pricings_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_pkey" PRIMARY KEY (id);


--
-- Name: PrintShops PrintShops_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintShops"
    ADD CONSTRAINT "PrintShops_pkey" PRIMARY KEY ("printShopId");


--
-- Name: PrintSizes PrintSizes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_pkey" PRIMARY KEY (id);


--
-- Name: PrinterMachines PrinterMachines_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrinterMachines"
    ADD CONSTRAINT "PrinterMachines_pkey" PRIMARY KEY ("printerId");


--
-- Name: PrivacyPreferences PrivacyPreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_pkey" PRIMARY KEY ("privacyId");


--
-- Name: Productions Productions_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions"
    ADD CONSTRAINT "Productions_pkey" PRIMARY KEY ("productionId");


--
-- Name: ProvenanceLocations ProvenanceLocations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ProvenanceLocations"
    ADD CONSTRAINT "ProvenanceLocations_pkey" PRIMARY KEY ("provenanceLocationId");


--
-- Name: PurchaseLocations PurchaseLocations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseLocations"
    ADD CONSTRAINT "PurchaseLocations_pkey" PRIMARY KEY ("purchaseLocationId");


--
-- Name: PurchaseProvenanceRecords PurchaseProvenanceRecords_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseProvenanceRecords"
    ADD CONSTRAINT "PurchaseProvenanceRecords_pkey" PRIMARY KEY ("purchaseProvenanceId");


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId");


--
-- Name: Sales Sales_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId");


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Series Series_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("seriesCode");


--
-- Name: ShippingCompanies ShippingCompanies_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ShippingCompanies"
    ADD CONSTRAINT "ShippingCompanies_pkey" PRIMARY KEY ("shippingCompanyId");


--
-- Name: Shippings Shippings_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings"
    ADD CONSTRAINT "Shippings_pkey" PRIMARY KEY ("shippingId");


--
-- Name: SizeCategories SizeCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_pkey" PRIMARY KEY (id);


--
-- Name: SizeCategories SizeCategories_sizeLabel_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key" UNIQUE ("sizeLabel");


--
-- Name: SizeCategories SizeCategories_sizeLabel_key1; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key1" UNIQUE ("sizeLabel");


--
-- Name: SizeCategories SizeCategories_sizeLabel_key2; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key2" UNIQUE ("sizeLabel");


--
-- Name: SizeCategories SizeCategories_sizeLabel_key3; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key3" UNIQUE ("sizeLabel");


--
-- Name: UserLocations UserLocations_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_pkey" PRIMARY KEY ("userLocationId");


--
-- Name: UserNotifications UserNotifications_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserNotifications"
    ADD CONSTRAINT "UserNotifications_pkey" PRIMARY KEY ("userNotificationId");


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: APSaleEligibilities APSaleEligibilities_apArtworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."APSaleEligibilities"
    ADD CONSTRAINT "APSaleEligibilities_apArtworkId_fkey" FOREIGN KEY ("apArtworkId") REFERENCES public."Artworks"(id);


--
-- Name: APSaleEligibilities APSaleEligibilities_cpArtworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."APSaleEligibilities"
    ADD CONSTRAINT "APSaleEligibilities_cpArtworkId_fkey" FOREIGN KEY ("cpArtworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtistsAdditionalPhotos ArtistsAdditionalPhotos_artistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES public."Artists"("artistId") ON UPDATE CASCADE;


--
-- Name: Artists Artists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- Name: ArtworkExhibition ArtworkExhibition_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkExhibition"
    ADD CONSTRAINT "ArtworkExhibition_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ArtworkExhibition ArtworkExhibition_exhibitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkExhibition"
    ADD CONSTRAINT "ArtworkExhibition_exhibitionId_fkey" FOREIGN KEY ("exhibitionId") REFERENCES public."Exhibitions"("exhibitionId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ArtworkImages ArtworkImages_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkImages"
    ADD CONSTRAINT "ArtworkImages_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkLocations ArtworkLocations_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkLocations"
    ADD CONSTRAINT "ArtworkLocations_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkLocations ArtworkLocations_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkLocations"
    ADD CONSTRAINT "ArtworkLocations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Events"("eventId");


--
-- Name: ArtworkLocations ArtworkLocations_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkLocations"
    ADD CONSTRAINT "ArtworkLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId");


--
-- Name: ArtworkPendings ArtworkPendings_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkPendings"
    ADD CONSTRAINT "ArtworkPendings_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkPendings ArtworkPendings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkPendings"
    ADD CONSTRAINT "ArtworkPendings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: ArtworkTags ArtworkTags_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTags"
    ADD CONSTRAINT "ArtworkTags_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkTransactions ArtworkTransactions_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions"
    ADD CONSTRAINT "ArtworkTransactions_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkTransactions ArtworkTransactions_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions"
    ADD CONSTRAINT "ArtworkTransactions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Events"("eventId");


--
-- Name: ArtworkTransactions ArtworkTransactions_partyAEntityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions"
    ADD CONSTRAINT "ArtworkTransactions_partyAEntityId_fkey" FOREIGN KEY ("partyAEntityId") REFERENCES public."Users"("userId");


--
-- Name: ArtworkTransactions ArtworkTransactions_partyBEntityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransactions"
    ADD CONSTRAINT "ArtworkTransactions_partyBEntityId_fkey" FOREIGN KEY ("partyBEntityId") REFERENCES public."Users"("userId");


--
-- Name: ArtworkTransfers ArtworkTransfers_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers"
    ADD CONSTRAINT "ArtworkTransfers_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ArtworkTransfers ArtworkTransfers_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers"
    ADD CONSTRAINT "ArtworkTransfers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Events"("eventId");


--
-- Name: ArtworkTransfers ArtworkTransfers_fromUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers"
    ADD CONSTRAINT "ArtworkTransfers_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES public."Users"("userId");


--
-- Name: ArtworkTransfers ArtworkTransfers_toUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ArtworkTransfers"
    ADD CONSTRAINT "ArtworkTransfers_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES public."Users"("userId");


--
-- Name: Artworks Artworks_diptychId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_diptychId_fkey" FOREIGN KEY ("diptychId") REFERENCES public."Diptychs"(id) ON UPDATE CASCADE;


--
-- Name: Artworks Artworks_photoRefId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES public."Photos"(id) ON UPDATE CASCADE;


--
-- Name: Artworks Artworks_pricingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES public."Pricings"(id) ON UPDATE CASCADE;


--
-- Name: Artworks Artworks_printSizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_printSizeId_fkey" FOREIGN KEY ("printSizeId") REFERENCES public."PrintSizes"(id) ON UPDATE CASCADE;


--
-- Name: Artworks Artworks_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id) ON UPDATE CASCADE;


--
-- Name: AuditTrails AuditTrails_UserID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- Name: ConditionReports ConditionReports_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ConditionReports"
    ADD CONSTRAINT "ConditionReports_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ConditionReports ConditionReports_reporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ConditionReports"
    ADD CONSTRAINT "ConditionReports_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES public."Users"("userId");


--
-- Name: DiptychSVGs DiptychSVGs_DiptychId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_DiptychId_fkey" FOREIGN KEY ("DiptychId") REFERENCES public."Diptychs"(id);


--
-- Name: DiptychSVGs DiptychSVGs_FrameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_FrameId_fkey" FOREIGN KEY ("FrameId") REFERENCES public."Frames"(id);


--
-- Name: Documents Documents_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Documents Documents_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Events"("eventId");


--
-- Name: Documents Documents_productionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES public."Productions"("productionId");


--
-- Name: Documents Documents_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sales"("saleId");


--
-- Name: Documents Documents_shippingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES public."Shippings"("shippingId");


--
-- Name: Documents Documents_transactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Documents"
    ADD CONSTRAINT "Documents_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES public."ArtworkTransactions"("transactionId");


--
-- Name: EventRoles EventRoles_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventRoles"
    ADD CONSTRAINT "EventRoles_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Events"("eventId");


--
-- Name: EventRoles EventRoles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventRoles"
    ADD CONSTRAINT "EventRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"("roleId");


--
-- Name: EventRoles EventRoles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."EventRoles"
    ADD CONSTRAINT "EventRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: Events Events_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Events Events_eventTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES public."EventTypes"("eventTypeId");


--
-- Name: ExhibitionImages ExhibitionImages_exhibitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ExhibitionImages"
    ADD CONSTRAINT "ExhibitionImages_exhibitionId_fkey" FOREIGN KEY ("exhibitionId") REFERENCES public."Exhibitions"("exhibitionId");


--
-- Name: HiddenPhotos HiddenPhotos_photoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photos"(id);


--
-- Name: HiddenPhotos HiddenPhotos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: Insurances Insurances_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Insurances"
    ADD CONSTRAINT "Insurances_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Insurances Insurances_insurerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Insurances"
    ADD CONSTRAINT "Insurances_insurerId_fkey" FOREIGN KEY ("insurerId") REFERENCES public."Users"("userId");


--
-- Name: Likes Likes_diptychIdCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_diptychIdCode_fkey" FOREIGN KEY ("diptychIdCode") REFERENCES public."DiptychSVGs"(id);


--
-- Name: Likes Likes_photoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photos"(id);


--
-- Name: Likes Likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: Loans Loans_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Loans Loans_borrowerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES public."Users"("userId");


--
-- Name: Loans Loans_endConditionReportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_endConditionReportId_fkey" FOREIGN KEY ("endConditionReportId") REFERENCES public."ConditionReports"("conditionReportId");


--
-- Name: Loans Loans_lenderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES public."Users"("userId");


--
-- Name: Loans Loans_loanAgreementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_loanAgreementId_fkey" FOREIGN KEY ("loanAgreementId") REFERENCES public."Documents"("documentId");


--
-- Name: Loans Loans_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId");


--
-- Name: Loans Loans_startConditionReportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Loans"
    ADD CONSTRAINT "Loans_startConditionReportId_fkey" FOREIGN KEY ("startConditionReportId") REFERENCES public."ConditionReports"("conditionReportId");


--
-- Name: OrganizationContactInfos OrganizationContactInfos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- Name: PersonContactInfos PersonContactInfos_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: Photos Photos_date_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_date_fkey" FOREIGN KEY (date) REFERENCES public."Dates"(date);


--
-- Name: Photos Photos_model_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_model_fkey" FOREIGN KEY (model) REFERENCES public."CameraModels"("Model");


--
-- Name: Photos Photos_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_number_fkey" FOREIGN KEY (number) REFERENCES public."ImageNumbers"(number);


--
-- Name: Photos Photos_seriesCode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_seriesCode_fkey" FOREIGN KEY ("seriesCode") REFERENCES public."Series"("seriesCode");


--
-- Name: Pricings Pricings_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);


--
-- Name: PrintShops PrintShops_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintShops"
    ADD CONSTRAINT "PrintShops_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId");


--
-- Name: PrintSizes PrintSizes_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);


--
-- Name: PrivacyPreferences PrivacyPreferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;


--
-- Name: Productions Productions_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions"
    ADD CONSTRAINT "Productions_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Productions Productions_printShopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions"
    ADD CONSTRAINT "Productions_printShopId_fkey" FOREIGN KEY ("printShopId") REFERENCES public."PrintShops"("printShopId");


--
-- Name: Productions Productions_printerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions"
    ADD CONSTRAINT "Productions_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES public."PrinterMachines"("printerId");


--
-- Name: Productions Productions_shippingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Productions"
    ADD CONSTRAINT "Productions_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES public."Shippings"("shippingId");


--
-- Name: ProvenanceLocations ProvenanceLocations_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ProvenanceLocations"
    ADD CONSTRAINT "ProvenanceLocations_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: ProvenanceLocations ProvenanceLocations_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ProvenanceLocations"
    ADD CONSTRAINT "ProvenanceLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId");


--
-- Name: PurchaseLocations PurchaseLocations_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseLocations"
    ADD CONSTRAINT "PurchaseLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId");


--
-- Name: PurchaseLocations PurchaseLocations_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseLocations"
    ADD CONSTRAINT "PurchaseLocations_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sales"("saleId");


--
-- Name: PurchaseProvenanceRecords PurchaseProvenanceRecords_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseProvenanceRecords"
    ADD CONSTRAINT "PurchaseProvenanceRecords_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: PurchaseProvenanceRecords PurchaseProvenanceRecords_purchaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PurchaseProvenanceRecords"
    ADD CONSTRAINT "PurchaseProvenanceRecords_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES public."Sales"("saleId");


--
-- Name: Sales Sales_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Sales Sales_buyerAgentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_buyerAgentId_fkey" FOREIGN KEY ("buyerAgentId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_charityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_newOwnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_newOwnerId_fkey" FOREIGN KEY ("newOwnerId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_productionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES public."Productions"("productionId");


--
-- Name: Sales Sales_sellerAgentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_sellerAgentId_fkey" FOREIGN KEY ("sellerAgentId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."Users"("userId");


--
-- Name: Sales Sales_shippingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES public."Shippings"("shippingId");


--
-- Name: Shippings Shippings_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings"
    ADD CONSTRAINT "Shippings_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: Shippings Shippings_destinationLocationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings"
    ADD CONSTRAINT "Shippings_destinationLocationId_fkey" FOREIGN KEY ("destinationLocationId") REFERENCES public."Locations"("locationId");


--
-- Name: Shippings Shippings_originLocationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings"
    ADD CONSTRAINT "Shippings_originLocationId_fkey" FOREIGN KEY ("originLocationId") REFERENCES public."Locations"("locationId");


--
-- Name: Shippings Shippings_shippingCompanyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Shippings"
    ADD CONSTRAINT "Shippings_shippingCompanyId_fkey" FOREIGN KEY ("shippingCompanyId") REFERENCES public."ShippingCompanies"("shippingCompanyId");


--
-- Name: UserLocations UserLocations_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserLocations UserLocations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserNotifications UserNotifications_artworkId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserNotifications"
    ADD CONSTRAINT "UserNotifications_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES public."Artworks"(id);


--
-- Name: UserNotifications UserNotifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."UserNotifications"
    ADD CONSTRAINT "UserNotifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jpmiles
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

