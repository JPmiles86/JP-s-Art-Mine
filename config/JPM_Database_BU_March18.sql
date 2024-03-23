PGDMP                         |            jpm_art_database    14.7 (Homebrew)    15.2 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    18145    jpm_art_database    DATABASE     r   CREATE DATABASE jpm_art_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
     DROP DATABASE jpm_art_database;
                jpm_art    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                jpmiles    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   jpmiles    false    4            �           1247    25252    enum_Artworks_edition    TYPE     K   CREATE TYPE public."enum_Artworks_edition" AS ENUM (
    'CP',
    'AP'
);
 *   DROP TYPE public."enum_Artworks_edition";
       public          jpm_art    false    4            k           1247    25173    enum_Diptyches_diptychType    TYPE     x   CREATE TYPE public."enum_Diptyches_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);
 /   DROP TYPE public."enum_Diptyches_diptychType";
       public          jpm_art    false    4            �           1247    25301    enum_Diptychs_diptychType    TYPE     �   CREATE TYPE public."enum_Diptychs_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape',
    'Entangled',
    'FusedPortrait',
    'FusedLandscape',
    'EntangledPrints'
);
 .   DROP TYPE public."enum_Diptychs_diptychType";
       public          jpm_art    false    4            �           1247    41915    enum_EntityTypes_entityType    TYPE     n   CREATE TYPE public."enum_EntityTypes_entityType" AS ENUM (
    'Person',
    'Company',
    'Organization'
);
 0   DROP TYPE public."enum_EntityTypes_entityType";
       public          jpm_art    false    4            �           1247    41935    enum_Locations_LocationType    TYPE     f   CREATE TYPE public."enum_Locations_LocationType" AS ENUM (
    'Home',
    'Business',
    'Other'
);
 0   DROP TYPE public."enum_Locations_LocationType";
       public          jpm_art    false    4            �           1247    41951 ,   enum_PersonContactInfos_purchasePrivacyLevel    TYPE     |   CREATE TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);
 A   DROP TYPE public."enum_PersonContactInfos_purchasePrivacyLevel";
       public          jpm_art    false    4            t           1247    25204    enum_Pricings_diptychType    TYPE     w   CREATE TYPE public."enum_Pricings_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);
 .   DROP TYPE public."enum_Pricings_diptychType";
       public          jpm_art    false    4            q           1247    25198    enum_Pricings_photoAspectRatio    TYPE     V   CREATE TYPE public."enum_Pricings_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);
 3   DROP TYPE public."enum_Pricings_photoAspectRatio";
       public          jpm_art    false    4            z           1247    25230    enum_PrintSizes_diptychType    TYPE     y   CREATE TYPE public."enum_PrintSizes_diptychType" AS ENUM (
    'Singles',
    'mergedPortrait',
    'mergedLandscape'
);
 0   DROP TYPE public."enum_PrintSizes_diptychType";
       public          jpm_art    false    4            w           1247    25224     enum_PrintSizes_photoAspectRatio    TYPE     X   CREATE TYPE public."enum_PrintSizes_photoAspectRatio" AS ENUM (
    '2:3',
    '3:4'
);
 5   DROP TYPE public."enum_PrintSizes_photoAspectRatio";
       public          jpm_art    false    4            �           1247    42024 &   enum_PrivacyPreferences_preferenceType    TYPE     v   CREATE TYPE public."enum_PrivacyPreferences_preferenceType" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);
 ;   DROP TYPE public."enum_PrivacyPreferences_preferenceType";
       public          jpm_art    false    4            �           1247    41679    enum_Users_role    TYPE     t   CREATE TYPE public."enum_Users_role" AS ENUM (
    'Admin',
    'Artist',
    'RegularUser',
    'AnonymousUser'
);
 $   DROP TYPE public."enum_Users_role";
       public          jpm_art    false    4            �            1259    41996    Artists    TABLE     !  CREATE TABLE public."Artists" (
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
    DROP TABLE public."Artists";
       public         heap    jpm_art    false    4            �            1259    42010    ArtistsAdditionalPhotos    TABLE     �  CREATE TABLE public."ArtistsAdditionalPhotos" (
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
 -   DROP TABLE public."ArtistsAdditionalPhotos";
       public         heap    jpm_art    false    4            �            1259    42009 )   ArtistsAdditionalPhotos_artistImageId_seq    SEQUENCE     �   CREATE SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq";
       public          jpm_art    false    243    4                       0    0 )   ArtistsAdditionalPhotos_artistImageId_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq" OWNED BY public."ArtistsAdditionalPhotos"."artistImageId";
          public          jpm_art    false    242            �            1259    41995    Artists_artistId_seq    SEQUENCE     �   CREATE SEQUENCE public."Artists_artistId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Artists_artistId_seq";
       public          jpm_art    false    4    241                       0    0    Artists_artistId_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Artists_artistId_seq" OWNED BY public."Artists"."artistId";
          public          jpm_art    false    240            �            1259    25825    Artworks    TABLE     �  CREATE TABLE public."Artworks" (
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
    DROP TABLE public."Artworks";
       public         heap    jpm_art    false    4    896            �            1259    25824    Artworks_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Artworks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Artworks_id_seq";
       public          jpm_art    false    4    224                       0    0    Artworks_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Artworks_id_seq" OWNED BY public."Artworks".id;
          public          jpm_art    false    223            �            1259    42044    AuditTrails    TABLE     �   CREATE TABLE public."AuditTrails" (
    "AuditID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "ChangeType" text NOT NULL,
    "ChangeDetails" text NOT NULL,
    "ChangeDate" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."AuditTrails";
       public         heap    jpm_art    false    4            �            1259    42043    AuditTrails_AuditID_seq    SEQUENCE     �   CREATE SEQUENCE public."AuditTrails_AuditID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."AuditTrails_AuditID_seq";
       public          jpm_art    false    247    4                       0    0    AuditTrails_AuditID_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."AuditTrails_AuditID_seq" OWNED BY public."AuditTrails"."AuditID";
          public          jpm_art    false    246            �            1259    25113    CameraModels    TABLE       CREATE TABLE public."CameraModels" (
    "Model" character varying(255) NOT NULL,
    "cameraMake" character varying(255),
    "cameraModel" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."CameraModels";
       public         heap    jpm_art    false    4            �            1259    25692    Dates    TABLE     O  CREATE TABLE public."Dates" (
    date character varying(255) NOT NULL,
    "dateFormal" character varying(255),
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Dates";
       public         heap    jpm_art    false    4            �            1259    33529    DiptychSVGs    TABLE     J  CREATE TABLE public."DiptychSVGs" (
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
 !   DROP TABLE public."DiptychSVGs";
       public         heap    jpm_art    false    4            �            1259    33528    DiptychSVGs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DiptychSVGs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."DiptychSVGs_id_seq";
       public          jpm_art    false    4    228                       0    0    DiptychSVGs_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."DiptychSVGs_id_seq" OWNED BY public."DiptychSVGs".id;
          public          jpm_art    false    227            �            1259    25420    Diptychs    TABLE       CREATE TABLE public."Diptychs" (
    id integer NOT NULL,
    "diptychName" character varying(255) NOT NULL,
    "diptychType" public."enum_Diptychs_diptychType" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Diptychs";
       public         heap    jpm_art    false    899    4            �            1259    25419    Diptychs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Diptychs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Diptychs_id_seq";
       public          jpm_art    false    217    4                       0    0    Diptychs_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Diptychs_id_seq" OWNED BY public."Diptychs".id;
          public          jpm_art    false    216            �            1259    41922    EntityTypes    TABLE     �   CREATE TABLE public."EntityTypes" (
    "entityId" integer NOT NULL,
    "userId" integer NOT NULL,
    "entityType" public."enum_EntityTypes_entityType" NOT NULL
);
 !   DROP TABLE public."EntityTypes";
       public         heap    jpm_art    false    4    932            �            1259    41921    EntityTypes_entityId_seq    SEQUENCE     �   CREATE SEQUENCE public."EntityTypes_entityId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."EntityTypes_entityId_seq";
       public          jpm_art    false    233    4                       0    0    EntityTypes_entityId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."EntityTypes_entityId_seq" OWNED BY public."EntityTypes"."entityId";
          public          jpm_art    false    232            �            1259    25868    Frames    TABLE     �   CREATE TABLE public."Frames" (
    id integer NOT NULL,
    "frameType" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Frames";
       public         heap    jpm_art    false    4            �            1259    25867    Frames_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Frames_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Frames_id_seq";
       public          jpm_art    false    226    4                       0    0    Frames_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Frames_id_seq" OWNED BY public."Frames".id;
          public          jpm_art    false    225            �            1259    42149    HiddenPhotos    TABLE     �   CREATE TABLE public."HiddenPhotos" (
    "hiddenPhotoId" integer NOT NULL,
    "photoRefId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."HiddenPhotos";
       public         heap    jpm_art    false    4            �            1259    42148    HiddenPhotos_hiddenPhotoId_seq    SEQUENCE     �   CREATE SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq";
       public          jpm_art    false    253    4                       0    0    HiddenPhotos_hiddenPhotoId_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq" OWNED BY public."HiddenPhotos"."hiddenPhotoId";
          public          jpm_art    false    252            �            1259    25134    ImageNumbers    TABLE     /  CREATE TABLE public."ImageNumbers" (
    number character varying(255) NOT NULL,
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."ImageNumbers";
       public         heap    jpm_art    false    4            �            1259    42090    Likes    TABLE     .  CREATE TABLE public."Likes" (
    "likeId" integer NOT NULL,
    "userId" integer NOT NULL,
    "photoId" integer NOT NULL,
    "diptychIdCode" integer,
    "isLiked" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Likes";
       public         heap    jpm_art    false    4            �            1259    42089    Likes_likeId_seq    SEQUENCE     �   CREATE SEQUENCE public."Likes_likeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Likes_likeId_seq";
       public          jpm_art    false    4    251                       0    0    Likes_likeId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Likes_likeId_seq" OWNED BY public."Likes"."likeId";
          public          jpm_art    false    250            �            1259    41942 	   Locations    TABLE     �  CREATE TABLE public."Locations" (
    "LocationID" integer NOT NULL,
    "AddressLine1" character varying(255) NOT NULL,
    "AddressLine2" character varying(255),
    "City" character varying(100) NOT NULL,
    "StateProvince" character varying(100) NOT NULL,
    "PostalCode" character varying(20) NOT NULL,
    "Country" character varying(100) NOT NULL,
    "LocationType" public."enum_Locations_LocationType" NOT NULL
);
    DROP TABLE public."Locations";
       public         heap    jpm_art    false    938    4            �            1259    41941    Locations_LocationID_seq    SEQUENCE     �   CREATE SEQUENCE public."Locations_LocationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Locations_LocationID_seq";
       public          jpm_art    false    4    235                       0    0    Locations_LocationID_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Locations_LocationID_seq" OWNED BY public."Locations"."LocationID";
          public          jpm_art    false    234            �            1259    41977    OrganizationContactInfos    TABLE       CREATE TABLE public."OrganizationContactInfos" (
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
 .   DROP TABLE public."OrganizationContactInfos";
       public         heap    jpm_art    false    4            �            1259    41976 2   OrganizationContactInfos_organizationContactId_seq    SEQUENCE     �   CREATE SEQUENCE public."OrganizationContactInfos_organizationContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 K   DROP SEQUENCE public."OrganizationContactInfos_organizationContactId_seq";
       public          jpm_art    false    4    239                        0    0 2   OrganizationContactInfos_organizationContactId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."OrganizationContactInfos_organizationContactId_seq" OWNED BY public."OrganizationContactInfos"."organizationContactId";
          public          jpm_art    false    238            �            1259    42058    PasswordResetTokens    TABLE     2  CREATE TABLE public."PasswordResetTokens" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    expires timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 )   DROP TABLE public."PasswordResetTokens";
       public         heap    jpm_art    false    4            �            1259    42057    PasswordResetTokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public."PasswordResetTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."PasswordResetTokens_id_seq";
       public          jpm_art    false    249    4            !           0    0    PasswordResetTokens_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."PasswordResetTokens_id_seq" OWNED BY public."PasswordResetTokens".id;
          public          jpm_art    false    248            �            1259    41958    PersonContactInfos    TABLE     �  CREATE TABLE public."PersonContactInfos" (
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
 (   DROP TABLE public."PersonContactInfos";
       public         heap    jpm_art    false    4    944            �            1259    41957 &   PersonContactInfos_personContactId_seq    SEQUENCE     �   CREATE SEQUENCE public."PersonContactInfos_personContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public."PersonContactInfos_personContactId_seq";
       public          jpm_art    false    4    237            "           0    0 &   PersonContactInfos_personContactId_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public."PersonContactInfos_personContactId_seq" OWNED BY public."PersonContactInfos"."personContactId";
          public          jpm_art    false    236            �            1259    25794    Photos    TABLE     *  CREATE TABLE public."Photos" (
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
    DROP TABLE public."Photos";
       public         heap    jpm_art    false    4            �            1259    25793    Photos_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Photos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Photos_id_seq";
       public          jpm_art    false    222    4            #           0    0    Photos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Photos_id_seq" OWNED BY public."Photos".id;
          public          jpm_art    false    221            �            1259    25637    Pricings    TABLE     �  CREATE TABLE public."Pricings" (
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
    DROP TABLE public."Pricings";
       public         heap    jpm_art    false    4    881    884            �            1259    25636    Pricings_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pricings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Pricings_id_seq";
       public          jpm_art    false    4    219            $           0    0    Pricings_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Pricings_id_seq" OWNED BY public."Pricings".id;
          public          jpm_art    false    218            �            1259    25238 
   PrintSizes    TABLE     �  CREATE TABLE public."PrintSizes" (
    id integer NOT NULL,
    "sizeCategoryId" integer NOT NULL,
    "photoAspectRatio" public."enum_PrintSizes_photoAspectRatio" NOT NULL,
    "diptychType" public."enum_PrintSizes_diptychType" NOT NULL,
    "sizeInInches" character varying(255) NOT NULL,
    "sizeInCm" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."PrintSizes";
       public         heap    jpm_art    false    890    4    887            �            1259    25237    PrintSizes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."PrintSizes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."PrintSizes_id_seq";
       public          jpm_art    false    4    215            %           0    0    PrintSizes_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."PrintSizes_id_seq" OWNED BY public."PrintSizes".id;
          public          jpm_art    false    214            �            1259    42032    PrivacyPreferences    TABLE     E  CREATE TABLE public."PrivacyPreferences" (
    "privacyId" integer NOT NULL,
    "userId" integer NOT NULL,
    "transactionId" integer,
    "preferenceType" public."enum_PrivacyPreferences_preferenceType" NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."PrivacyPreferences";
       public         heap    jpm_art    false    959    4            �            1259    42031     PrivacyPreferences_privacyId_seq    SEQUENCE     �   CREATE SEQUENCE public."PrivacyPreferences_privacyId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."PrivacyPreferences_privacyId_seq";
       public          jpm_art    false    245    4            &           0    0     PrivacyPreferences_privacyId_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."PrivacyPreferences_privacyId_seq" OWNED BY public."PrivacyPreferences"."privacyId";
          public          jpm_art    false    244            �            1259    41673    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    jpm_art    false    4            �            1259    25120    Series    TABLE     a  CREATE TABLE public."Series" (
    "seriesCode" character varying(255) NOT NULL,
    "seriesName" character varying(255) NOT NULL,
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Series";
       public         heap    jpm_art    false    4            �            1259    25189    SizeCategories    TABLE        CREATE TABLE public."SizeCategories" (
    id integer NOT NULL,
    "sizeLabel" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sizeName" character varying(255)
);
 $   DROP TABLE public."SizeCategories";
       public         heap    jpm_art    false    4            �            1259    25188    SizeCategories_id_seq    SEQUENCE     �   CREATE SEQUENCE public."SizeCategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."SizeCategories_id_seq";
       public          jpm_art    false    213    4            '           0    0    SizeCategories_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."SizeCategories_id_seq" OWNED BY public."SizeCategories".id;
          public          jpm_art    false    212            �            1259    41900    Users    TABLE     X  CREATE TABLE public."Users" (
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
    DROP TABLE public."Users";
       public         heap    jpm_art    false    926    4    926            �            1259    41899    Users_userId_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Users_userId_seq";
       public          jpm_art    false    4    231            (           0    0    Users_userId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";
          public          jpm_art    false    230            "           2604    41999    Artists artistId    DEFAULT     z   ALTER TABLE ONLY public."Artists" ALTER COLUMN "artistId" SET DEFAULT nextval('public."Artists_artistId_seq"'::regclass);
 C   ALTER TABLE public."Artists" ALTER COLUMN "artistId" DROP DEFAULT;
       public          jpm_art    false    240    241    241            #           2604    42013 %   ArtistsAdditionalPhotos artistImageId    DEFAULT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" SET DEFAULT nextval('public."ArtistsAdditionalPhotos_artistImageId_seq"'::regclass);
 X   ALTER TABLE public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" DROP DEFAULT;
       public          jpm_art    false    242    243    243                       2604    25828    Artworks id    DEFAULT     n   ALTER TABLE ONLY public."Artworks" ALTER COLUMN id SET DEFAULT nextval('public."Artworks_id_seq"'::regclass);
 <   ALTER TABLE public."Artworks" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    223    224    224            %           2604    42047    AuditTrails AuditID    DEFAULT     �   ALTER TABLE ONLY public."AuditTrails" ALTER COLUMN "AuditID" SET DEFAULT nextval('public."AuditTrails_AuditID_seq"'::regclass);
 F   ALTER TABLE public."AuditTrails" ALTER COLUMN "AuditID" DROP DEFAULT;
       public          jpm_art    false    247    246    247                       2604    33532    DiptychSVGs id    DEFAULT     t   ALTER TABLE ONLY public."DiptychSVGs" ALTER COLUMN id SET DEFAULT nextval('public."DiptychSVGs_id_seq"'::regclass);
 ?   ALTER TABLE public."DiptychSVGs" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    228    227    228                       2604    25423    Diptychs id    DEFAULT     n   ALTER TABLE ONLY public."Diptychs" ALTER COLUMN id SET DEFAULT nextval('public."Diptychs_id_seq"'::regclass);
 <   ALTER TABLE public."Diptychs" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    216    217    217                       2604    41925    EntityTypes entityId    DEFAULT     �   ALTER TABLE ONLY public."EntityTypes" ALTER COLUMN "entityId" SET DEFAULT nextval('public."EntityTypes_entityId_seq"'::regclass);
 G   ALTER TABLE public."EntityTypes" ALTER COLUMN "entityId" DROP DEFAULT;
       public          jpm_art    false    233    232    233                       2604    25871 	   Frames id    DEFAULT     j   ALTER TABLE ONLY public."Frames" ALTER COLUMN id SET DEFAULT nextval('public."Frames_id_seq"'::regclass);
 :   ALTER TABLE public."Frames" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    226    225    226            )           2604    42152    HiddenPhotos hiddenPhotoId    DEFAULT     �   ALTER TABLE ONLY public."HiddenPhotos" ALTER COLUMN "hiddenPhotoId" SET DEFAULT nextval('public."HiddenPhotos_hiddenPhotoId_seq"'::regclass);
 M   ALTER TABLE public."HiddenPhotos" ALTER COLUMN "hiddenPhotoId" DROP DEFAULT;
       public          jpm_art    false    252    253    253            '           2604    42093    Likes likeId    DEFAULT     r   ALTER TABLE ONLY public."Likes" ALTER COLUMN "likeId" SET DEFAULT nextval('public."Likes_likeId_seq"'::regclass);
 ?   ALTER TABLE public."Likes" ALTER COLUMN "likeId" DROP DEFAULT;
       public          jpm_art    false    251    250    251                       2604    41945    Locations LocationID    DEFAULT     �   ALTER TABLE ONLY public."Locations" ALTER COLUMN "LocationID" SET DEFAULT nextval('public."Locations_LocationID_seq"'::regclass);
 G   ALTER TABLE public."Locations" ALTER COLUMN "LocationID" DROP DEFAULT;
       public          jpm_art    false    234    235    235            !           2604    41980 .   OrganizationContactInfos organizationContactId    DEFAULT     �   ALTER TABLE ONLY public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" SET DEFAULT nextval('public."OrganizationContactInfos_organizationContactId_seq"'::regclass);
 a   ALTER TABLE public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" DROP DEFAULT;
       public          jpm_art    false    238    239    239            &           2604    42061    PasswordResetTokens id    DEFAULT     �   ALTER TABLE ONLY public."PasswordResetTokens" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetTokens_id_seq"'::regclass);
 G   ALTER TABLE public."PasswordResetTokens" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    248    249    249                        2604    41961 "   PersonContactInfos personContactId    DEFAULT     �   ALTER TABLE ONLY public."PersonContactInfos" ALTER COLUMN "personContactId" SET DEFAULT nextval('public."PersonContactInfos_personContactId_seq"'::regclass);
 U   ALTER TABLE public."PersonContactInfos" ALTER COLUMN "personContactId" DROP DEFAULT;
       public          jpm_art    false    236    237    237                       2604    25797 	   Photos id    DEFAULT     j   ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."Photos_id_seq"'::regclass);
 :   ALTER TABLE public."Photos" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    222    221    222                       2604    25640    Pricings id    DEFAULT     n   ALTER TABLE ONLY public."Pricings" ALTER COLUMN id SET DEFAULT nextval('public."Pricings_id_seq"'::regclass);
 <   ALTER TABLE public."Pricings" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    219    218    219                       2604    25241    PrintSizes id    DEFAULT     r   ALTER TABLE ONLY public."PrintSizes" ALTER COLUMN id SET DEFAULT nextval('public."PrintSizes_id_seq"'::regclass);
 >   ALTER TABLE public."PrintSizes" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    215    214    215            $           2604    42035    PrivacyPreferences privacyId    DEFAULT     �   ALTER TABLE ONLY public."PrivacyPreferences" ALTER COLUMN "privacyId" SET DEFAULT nextval('public."PrivacyPreferences_privacyId_seq"'::regclass);
 O   ALTER TABLE public."PrivacyPreferences" ALTER COLUMN "privacyId" DROP DEFAULT;
       public          jpm_art    false    245    244    245                       2604    25192    SizeCategories id    DEFAULT     z   ALTER TABLE ONLY public."SizeCategories" ALTER COLUMN id SET DEFAULT nextval('public."SizeCategories_id_seq"'::regclass);
 B   ALTER TABLE public."SizeCategories" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    213    212    213                       2604    41903    Users userId    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);
 ?   ALTER TABLE public."Users" ALTER COLUMN "userId" DROP DEFAULT;
       public          jpm_art    false    230    231    231            ]           2606    42017 4   ArtistsAdditionalPhotos ArtistsAdditionalPhotos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_pkey" PRIMARY KEY ("artistImageId");
 b   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" DROP CONSTRAINT "ArtistsAdditionalPhotos_pkey";
       public            jpm_art    false    243            [           2606    42003    Artists Artists_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_pkey" PRIMARY KEY ("artistId");
 B   ALTER TABLE ONLY public."Artists" DROP CONSTRAINT "Artists_pkey";
       public            jpm_art    false    241            C           2606    25834    Artworks Artworks_artworkID_key 
   CONSTRAINT     e   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key" UNIQUE ("artworkID");
 M   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_artworkID_key";
       public            jpm_art    false    224            E           2606    25832    Artworks Artworks_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_pkey";
       public            jpm_art    false    224            a           2606    42051    AuditTrails AuditTrails_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_pkey" PRIMARY KEY ("AuditID");
 J   ALTER TABLE ONLY public."AuditTrails" DROP CONSTRAINT "AuditTrails_pkey";
       public            jpm_art    false    247            +           2606    25119    CameraModels CameraModels_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."CameraModels"
    ADD CONSTRAINT "CameraModels_pkey" PRIMARY KEY ("Model");
 L   ALTER TABLE ONLY public."CameraModels" DROP CONSTRAINT "CameraModels_pkey";
       public            jpm_art    false    209            =           2606    25698    Dates Dates_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Dates"
    ADD CONSTRAINT "Dates_pkey" PRIMARY KEY (date);
 >   ALTER TABLE ONLY public."Dates" DROP CONSTRAINT "Dates_pkey";
       public            jpm_art    false    220            I           2606    33536    DiptychSVGs DiptychSVGs_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_pkey";
       public            jpm_art    false    228            7           2606    25427 !   Diptychs Diptychs_diptychName_key 
   CONSTRAINT     i   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key" UNIQUE ("diptychName");
 O   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_diptychName_key";
       public            jpm_art    false    217            9           2606    25425    Diptychs Diptychs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_pkey";
       public            jpm_art    false    217            S           2606    41927    EntityTypes EntityTypes_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."EntityTypes"
    ADD CONSTRAINT "EntityTypes_pkey" PRIMARY KEY ("entityId");
 J   ALTER TABLE ONLY public."EntityTypes" DROP CONSTRAINT "EntityTypes_pkey";
       public            jpm_art    false    233            G           2606    25873    Frames Frames_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Frames"
    ADD CONSTRAINT "Frames_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Frames" DROP CONSTRAINT "Frames_pkey";
       public            jpm_art    false    226            g           2606    42154    HiddenPhotos HiddenPhotos_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_pkey" PRIMARY KEY ("hiddenPhotoId");
 L   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_pkey";
       public            jpm_art    false    253            /           2606    25140    ImageNumbers ImageNumbers_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."ImageNumbers"
    ADD CONSTRAINT "ImageNumbers_pkey" PRIMARY KEY (number);
 L   ALTER TABLE ONLY public."ImageNumbers" DROP CONSTRAINT "ImageNumbers_pkey";
       public            jpm_art    false    211            e           2606    42096    Likes Likes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("likeId");
 >   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_pkey";
       public            jpm_art    false    251            U           2606    41949    Locations Locations_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("LocationID");
 F   ALTER TABLE ONLY public."Locations" DROP CONSTRAINT "Locations_pkey";
       public            jpm_art    false    235            Y           2606    41984 6   OrganizationContactInfos OrganizationContactInfos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_pkey" PRIMARY KEY ("organizationContactId");
 d   ALTER TABLE ONLY public."OrganizationContactInfos" DROP CONSTRAINT "OrganizationContactInfos_pkey";
       public            jpm_art    false    239            c           2606    42065 ,   PasswordResetTokens PasswordResetTokens_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."PasswordResetTokens"
    ADD CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."PasswordResetTokens" DROP CONSTRAINT "PasswordResetTokens_pkey";
       public            jpm_art    false    249            W           2606    41965 *   PersonContactInfos PersonContactInfos_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_pkey" PRIMARY KEY ("personContactId");
 X   ALTER TABLE ONLY public."PersonContactInfos" DROP CONSTRAINT "PersonContactInfos_pkey";
       public            jpm_art    false    237            ?           2606    25801    Photos Photos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_pkey";
       public            jpm_art    false    222            A           2606    25803    Photos Photos_uniqueKey_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key" UNIQUE ("uniqueKey");
 I   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_uniqueKey_key";
       public            jpm_art    false    222            ;           2606    25642    Pricings Pricings_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Pricings" DROP CONSTRAINT "Pricings_pkey";
       public            jpm_art    false    219            5           2606    25245    PrintSizes PrintSizes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."PrintSizes" DROP CONSTRAINT "PrintSizes_pkey";
       public            jpm_art    false    215            _           2606    42037 *   PrivacyPreferences PrivacyPreferences_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_pkey" PRIMARY KEY ("privacyId");
 X   ALTER TABLE ONLY public."PrivacyPreferences" DROP CONSTRAINT "PrivacyPreferences_pkey";
       public            jpm_art    false    245            K           2606    41677     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            jpm_art    false    229            -           2606    25126    Series Series_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("seriesCode");
 @   ALTER TABLE ONLY public."Series" DROP CONSTRAINT "Series_pkey";
       public            jpm_art    false    210            1           2606    25194 "   SizeCategories SizeCategories_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_pkey";
       public            jpm_art    false    213            3           2606    25196 +   SizeCategories SizeCategories_sizeLabel_key 
   CONSTRAINT     q   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key" UNIQUE ("sizeLabel");
 Y   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_sizeLabel_key";
       public            jpm_art    false    213            M           2606    41911    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            jpm_art    false    231            O           2606    41909    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            jpm_art    false    231            Q           2606    41913    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            jpm_art    false    231            {           2606    42018 =   ArtistsAdditionalPhotos ArtistsAdditionalPhotos_artistId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES public."Artists"("artistId") ON UPDATE CASCADE;
 k   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" DROP CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey";
       public          jpm_art    false    241    3675    243            z           2606    42004    Artists Artists_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 I   ALTER TABLE ONLY public."Artists" DROP CONSTRAINT "Artists_userId_fkey";
       public          jpm_art    false    3663    241    231            n           2606    25845     Artworks Artworks_diptychId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_diptychId_fkey" FOREIGN KEY ("diptychId") REFERENCES public."Diptychs"(id) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_diptychId_fkey";
       public          jpm_art    false    224    217    3641            o           2606    25840 !   Artworks Artworks_photoRefId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES public."Photos"(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_photoRefId_fkey";
       public          jpm_art    false    224    3647    222            p           2606    25850     Artworks Artworks_pricingId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES public."Pricings"(id) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_pricingId_fkey";
       public          jpm_art    false    3643    224    219            q           2606    25855 "   Artworks Artworks_printSizeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_printSizeId_fkey" FOREIGN KEY ("printSizeId") REFERENCES public."PrintSizes"(id) ON UPDATE CASCADE;
 P   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_printSizeId_fkey";
       public          jpm_art    false    3637    224    215            r           2606    25835 %   Artworks Artworks_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id) ON UPDATE CASCADE;
 S   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_sizeCategoryId_fkey";
       public          jpm_art    false    213    224    3633            }           2606    42052 #   AuditTrails AuditTrails_UserID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 Q   ALTER TABLE ONLY public."AuditTrails" DROP CONSTRAINT "AuditTrails_UserID_fkey";
       public          jpm_art    false    247    231    3663            s           2606    33537 &   DiptychSVGs DiptychSVGs_DiptychId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_DiptychId_fkey" FOREIGN KEY ("DiptychId") REFERENCES public."Diptychs"(id);
 T   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_DiptychId_fkey";
       public          jpm_art    false    217    228    3641            t           2606    33542 $   DiptychSVGs DiptychSVGs_FrameId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_FrameId_fkey" FOREIGN KEY ("FrameId") REFERENCES public."Frames"(id);
 R   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_FrameId_fkey";
       public          jpm_art    false    228    226    3655            u           2606    41928 #   EntityTypes EntityTypes_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EntityTypes"
    ADD CONSTRAINT "EntityTypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 Q   ALTER TABLE ONLY public."EntityTypes" DROP CONSTRAINT "EntityTypes_userId_fkey";
       public          jpm_art    false    3663    233    231            �           2606    42155 )   HiddenPhotos HiddenPhotos_photoRefId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES public."Photos"(id);
 W   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_photoRefId_fkey";
       public          jpm_art    false    253    222    3647            �           2606    42160 %   HiddenPhotos HiddenPhotos_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");
 S   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_userId_fkey";
       public          jpm_art    false    231    3663    253            ~           2606    42107    Likes Likes_diptychIdCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_diptychIdCode_fkey" FOREIGN KEY ("diptychIdCode") REFERENCES public."DiptychSVGs"(id);
 L   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_diptychIdCode_fkey";
       public          jpm_art    false    251    228    3657                       2606    42102    Likes Likes_photoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photos"(id);
 F   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_photoId_fkey";
       public          jpm_art    false    251    222    3647            �           2606    42097    Likes Likes_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");
 E   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_userId_fkey";
       public          jpm_art    false    231    251    3663            x           2606    41985 ?   OrganizationContactInfos OrganizationContactInfos_entityId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."EntityTypes"("entityId") ON UPDATE CASCADE;
 m   ALTER TABLE ONLY public."OrganizationContactInfos" DROP CONSTRAINT "OrganizationContactInfos_entityId_fkey";
       public          jpm_art    false    239    3667    233            y           2606    41990 A   OrganizationContactInfos OrganizationContactInfos_locationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("LocationID") ON UPDATE CASCADE ON DELETE SET NULL;
 o   ALTER TABLE ONLY public."OrganizationContactInfos" DROP CONSTRAINT "OrganizationContactInfos_locationId_fkey";
       public          jpm_art    false    3669    235    239            v           2606    41966 3   PersonContactInfos PersonContactInfos_entityId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."EntityTypes"("entityId") ON UPDATE CASCADE;
 a   ALTER TABLE ONLY public."PersonContactInfos" DROP CONSTRAINT "PersonContactInfos_entityId_fkey";
       public          jpm_art    false    237    233    3667            w           2606    41971 5   PersonContactInfos PersonContactInfos_locationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("LocationID") ON UPDATE CASCADE ON DELETE SET NULL;
 c   ALTER TABLE ONLY public."PersonContactInfos" DROP CONSTRAINT "PersonContactInfos_locationId_fkey";
       public          jpm_art    false    237    3669    235            j           2606    25809    Photos Photos_date_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_date_fkey" FOREIGN KEY (date) REFERENCES public."Dates"(date);
 E   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_date_fkey";
       public          jpm_art    false    222    3645    220            k           2606    25819    Photos Photos_model_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_model_fkey" FOREIGN KEY (model) REFERENCES public."CameraModels"("Model");
 F   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_model_fkey";
       public          jpm_art    false    209    222    3627            l           2606    25814    Photos Photos_number_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_number_fkey" FOREIGN KEY (number) REFERENCES public."ImageNumbers"(number);
 G   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_number_fkey";
       public          jpm_art    false    222    211    3631            m           2606    25804    Photos Photos_seriesCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_seriesCode_fkey" FOREIGN KEY ("seriesCode") REFERENCES public."Series"("seriesCode");
 K   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_seriesCode_fkey";
       public          jpm_art    false    222    3629    210            i           2606    25643 %   Pricings Pricings_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);
 S   ALTER TABLE ONLY public."Pricings" DROP CONSTRAINT "Pricings_sizeCategoryId_fkey";
       public          jpm_art    false    3633    213    219            h           2606    25246 )   PrintSizes PrintSizes_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);
 W   ALTER TABLE ONLY public."PrintSizes" DROP CONSTRAINT "PrintSizes_sizeCategoryId_fkey";
       public          jpm_art    false    215    3633    213            |           2606    42038 1   PrivacyPreferences PrivacyPreferences_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 _   ALTER TABLE ONLY public."PrivacyPreferences" DROP CONSTRAINT "PrivacyPreferences_userId_fkey";
       public          jpm_art    false    231    245    3663           