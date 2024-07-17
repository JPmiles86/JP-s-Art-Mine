--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
-- Name: Artworks id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks" ALTER COLUMN id SET DEFAULT nextval('public."Artworks_id_seq"'::regclass);


--
-- Name: DiptychSVGs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."DiptychSVGs" ALTER COLUMN id SET DEFAULT nextval('public."DiptychSVGs_id_seq"'::regclass);


--
-- Name: Diptychs id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs" ALTER COLUMN id SET DEFAULT nextval('public."Diptychs_id_seq"'::regclass);


--
-- Name: Frames id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames" ALTER COLUMN id SET DEFAULT nextval('public."Frames_id_seq"'::regclass);


--
-- Name: Photos id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."Photos_id_seq"'::regclass);


--
-- Name: Pricings id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings" ALTER COLUMN id SET DEFAULT nextval('public."Pricings_id_seq"'::regclass);


--
-- Name: PrintSizes id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes" ALTER COLUMN id SET DEFAULT nextval('public."PrintSizes_id_seq"'::regclass);


--
-- Name: SizeCategories id; Type: DEFAULT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."SizeCategories" ALTER COLUMN id SET DEFAULT nextval('public."SizeCategories_id_seq"'::regclass);


--
-- Name: Artworks Artworks_artworkID_key; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key" UNIQUE ("artworkID");


--
-- Name: Artworks Artworks_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pkey" PRIMARY KEY (id);


--
-- Name: CameraModels CameraModels_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."CameraModels"
    ADD CONSTRAINT "CameraModels_pkey" PRIMARY KEY ("Model");


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
-- Name: Diptychs Diptychs_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_pkey" PRIMARY KEY (id);


--
-- Name: Frames Frames_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Frames"
    ADD CONSTRAINT "Frames_pkey" PRIMARY KEY (id);


--
-- Name: ImageNumbers ImageNumbers_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."ImageNumbers"
    ADD CONSTRAINT "ImageNumbers_pkey" PRIMARY KEY (number);


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
-- Name: Pricings Pricings_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_pkey" PRIMARY KEY (id);


--
-- Name: PrintSizes PrintSizes_pkey; Type: CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_pkey" PRIMARY KEY (id);


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
-- Name: PrintSizes PrintSizes_sizeCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jpm_art
--

ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);


--
-- PostgreSQL database dump complete
--

