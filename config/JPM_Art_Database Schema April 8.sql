PGDMP     1    ;                |            jpm_art_database    14.11 (Homebrew)    15.2 �    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            :           1262    18145    jpm_art_database    DATABASE     r   CREATE DATABASE jpm_art_database WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
     DROP DATABASE jpm_art_database;
                jpm_art    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                jpmiles    false            ;           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   jpmiles    false    4            <           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
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
       public          jpm_art    false    4            �           1247    42956    enum_EntityTypes_entityType    TYPE     n   CREATE TYPE public."enum_EntityTypes_entityType" AS ENUM (
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
       public          jpm_art    false    4            �           1247    43355    enum_Locations_locationType    TYPE     f   CREATE TYPE public."enum_Locations_locationType" AS ENUM (
    'Home',
    'Business',
    'Other'
);
 0   DROP TYPE public."enum_Locations_locationType";
       public          jpm_art    false    4            �           1247    42809 ,   enum_PersonContactInfos_purchasePrivacyLevel    TYPE     |   CREATE TYPE public."enum_PersonContactInfos_purchasePrivacyLevel" AS ENUM (
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
       public          jpm_art    false    4            �           1247    43222 &   enum_PrivacyPreferences_preferenceType    TYPE     v   CREATE TYPE public."enum_PrivacyPreferences_preferenceType" AS ENUM (
    'Public',
    'Private',
    'Anonymous'
);
 ;   DROP TYPE public."enum_PrivacyPreferences_preferenceType";
       public          jpm_art    false    4            �           1247    43341 "   enum_ProvenanceLocations_eventType    TYPE     r   CREATE TYPE public."enum_ProvenanceLocations_eventType" AS ENUM (
    'Exhibition',
    'Storage',
    'Other'
);
 7   DROP TYPE public."enum_ProvenanceLocations_eventType";
       public          jpm_art    false    4            �           1247    43316    enum_UserLocations_locationType    TYPE     m   CREATE TYPE public."enum_UserLocations_locationType" AS ENUM (
    'Home',
    'Business',
    'Shipping'
);
 4   DROP TYPE public."enum_UserLocations_locationType";
       public          jpm_art    false    4            �           1247    43165    enum_Users_entityType    TYPE     Y   CREATE TYPE public."enum_Users_entityType" AS ENUM (
    'Person',
    'Organization'
);
 *   DROP TYPE public."enum_Users_entityType";
       public          jpm_art    false    4            �           1247    41679    enum_Users_role    TYPE     t   CREATE TYPE public."enum_Users_role" AS ENUM (
    'Admin',
    'Artist',
    'RegularUser',
    'AnonymousUser'
);
 $   DROP TYPE public."enum_Users_role";
       public          jpm_art    false    4            �            1259    43242    Artists    TABLE     !  CREATE TABLE public."Artists" (
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
       public         heap    jpm_art    false    4            �            1259    43257    ArtistsAdditionalPhotos    TABLE     �  CREATE TABLE public."ArtistsAdditionalPhotos" (
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
       public         heap    jpm_art    false    4            �            1259    43256 )   ArtistsAdditionalPhotos_artistImageId_seq    SEQUENCE     �   CREATE SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq";
       public          jpm_art    false    4    243            =           0    0 )   ArtistsAdditionalPhotos_artistImageId_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public."ArtistsAdditionalPhotos_artistImageId_seq" OWNED BY public."ArtistsAdditionalPhotos"."artistImageId";
          public          jpm_art    false    242            �            1259    43241    Artists_artistId_seq    SEQUENCE     �   CREATE SEQUENCE public."Artists_artistId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Artists_artistId_seq";
       public          jpm_art    false    4    241            >           0    0    Artists_artistId_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Artists_artistId_seq" OWNED BY public."Artists"."artistId";
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
       public         heap    jpm_art    false    896    4            �            1259    25824    Artworks_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Artworks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Artworks_id_seq";
       public          jpm_art    false    224    4            ?           0    0    Artworks_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Artworks_id_seq" OWNED BY public."Artworks".id;
          public          jpm_art    false    223            �            1259    43208    AuditTrails    TABLE     �   CREATE TABLE public."AuditTrails" (
    "AuditID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "ChangeType" text NOT NULL,
    "ChangeDetails" text NOT NULL,
    "ChangeDate" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."AuditTrails";
       public         heap    jpm_art    false    4            �            1259    43207    AuditTrails_AuditID_seq    SEQUENCE     �   CREATE SEQUENCE public."AuditTrails_AuditID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."AuditTrails_AuditID_seq";
       public          jpm_art    false    237    4            @           0    0    AuditTrails_AuditID_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."AuditTrails_AuditID_seq" OWNED BY public."AuditTrails"."AuditID";
          public          jpm_art    false    236            �            1259    25113    CameraModels    TABLE       CREATE TABLE public."CameraModels" (
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
       public          jpm_art    false    228    4            A           0    0    DiptychSVGs_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."DiptychSVGs_id_seq" OWNED BY public."DiptychSVGs".id;
          public          jpm_art    false    227            �            1259    25420    Diptychs    TABLE       CREATE TABLE public."Diptychs" (
    id integer NOT NULL,
    "diptychName" character varying(255) NOT NULL,
    "diptychType" public."enum_Diptychs_diptychType" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Diptychs";
       public         heap    jpm_art    false    4    899            �            1259    25419    Diptychs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Diptychs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Diptychs_id_seq";
       public          jpm_art    false    4    217            B           0    0    Diptychs_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Diptychs_id_seq" OWNED BY public."Diptychs".id;
          public          jpm_art    false    216            �            1259    25868    Frames    TABLE     �   CREATE TABLE public."Frames" (
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
       public          jpm_art    false    226    4            C           0    0    Frames_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Frames_id_seq" OWNED BY public."Frames".id;
          public          jpm_art    false    225            �            1259    43271    HiddenPhotos    TABLE     �   CREATE TABLE public."HiddenPhotos" (
    "hiddenPhotoId" integer NOT NULL,
    "photoId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."HiddenPhotos";
       public         heap    jpm_art    false    4            �            1259    43270    HiddenPhotos_hiddenPhotoId_seq    SEQUENCE     �   CREATE SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq";
       public          jpm_art    false    4    245            D           0    0    HiddenPhotos_hiddenPhotoId_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."HiddenPhotos_hiddenPhotoId_seq" OWNED BY public."HiddenPhotos"."hiddenPhotoId";
          public          jpm_art    false    244            �            1259    25134    ImageNumbers    TABLE     /  CREATE TABLE public."ImageNumbers" (
    number character varying(255) NOT NULL,
    "shortDescription" character varying(150),
    "extendedDescription" text,
    "imageUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."ImageNumbers";
       public         heap    jpm_art    false    4            �            1259    43185    Likes    TABLE     .  CREATE TABLE public."Likes" (
    "likeId" integer NOT NULL,
    "userId" integer NOT NULL,
    "photoId" integer NOT NULL,
    "diptychIdCode" integer,
    "isLiked" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Likes";
       public         heap    jpm_art    false    4            �            1259    43184    Likes_likeId_seq    SEQUENCE     �   CREATE SEQUENCE public."Likes_likeId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Likes_likeId_seq";
       public          jpm_art    false    4    235            E           0    0    Likes_likeId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Likes_likeId_seq" OWNED BY public."Likes"."likeId";
          public          jpm_art    false    234            �            1259    43429 	   Locations    TABLE     �  CREATE TABLE public."Locations" (
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
    DROP TABLE public."Locations";
       public         heap    jpm_art    false    4            �            1259    43428    Locations_locationId_seq    SEQUENCE     �   CREATE SEQUENCE public."Locations_locationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Locations_locationId_seq";
       public          jpm_art    false    251    4            F           0    0    Locations_locationId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Locations_locationId_seq" OWNED BY public."Locations"."locationId";
          public          jpm_art    false    250            �            1259    43415    OrganizationContactInfos    TABLE     w  CREATE TABLE public."OrganizationContactInfos" (
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
 .   DROP TABLE public."OrganizationContactInfos";
       public         heap    jpm_art    false    4            �            1259    43414 2   OrganizationContactInfos_organizationContactId_seq    SEQUENCE     �   CREATE SEQUENCE public."OrganizationContactInfos_organizationContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 K   DROP SEQUENCE public."OrganizationContactInfos_organizationContactId_seq";
       public          jpm_art    false    4    249            G           0    0 2   OrganizationContactInfos_organizationContactId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."OrganizationContactInfos_organizationContactId_seq" OWNED BY public."OrganizationContactInfos"."organizationContactId";
          public          jpm_art    false    248            �            1259    42058    PasswordResetTokens    TABLE     2  CREATE TABLE public."PasswordResetTokens" (
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
       public          jpm_art    false    4    231            H           0    0    PasswordResetTokens_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."PasswordResetTokens_id_seq" OWNED BY public."PasswordResetTokens".id;
          public          jpm_art    false    230            �            1259    43288    PersonContactInfos    TABLE        CREATE TABLE public."PersonContactInfos" (
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
    "relationshipToArtist" character varying(255),
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."PersonContactInfos";
       public         heap    jpm_art    false    4            �            1259    43287 &   PersonContactInfos_personContactId_seq    SEQUENCE     �   CREATE SEQUENCE public."PersonContactInfos_personContactId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public."PersonContactInfos_personContactId_seq";
       public          jpm_art    false    247    4            I           0    0 &   PersonContactInfos_personContactId_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public."PersonContactInfos_personContactId_seq" OWNED BY public."PersonContactInfos"."personContactId";
          public          jpm_art    false    246            �            1259    25794    Photos    TABLE     *  CREATE TABLE public."Photos" (
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
       public          jpm_art    false    4    222            J           0    0    Photos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Photos_id_seq" OWNED BY public."Photos".id;
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
       public         heap    jpm_art    false    884    4    881            �            1259    25636    Pricings_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Pricings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Pricings_id_seq";
       public          jpm_art    false    4    219            K           0    0    Pricings_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Pricings_id_seq" OWNED BY public."Pricings".id;
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
       public         heap    jpm_art    false    887    4    890            �            1259    25237    PrintSizes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."PrintSizes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."PrintSizes_id_seq";
       public          jpm_art    false    215    4            L           0    0    PrintSizes_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."PrintSizes_id_seq" OWNED BY public."PrintSizes".id;
          public          jpm_art    false    214            �            1259    43230    PrivacyPreferences    TABLE     E  CREATE TABLE public."PrivacyPreferences" (
    "privacyId" integer NOT NULL,
    "userId" integer NOT NULL,
    "transactionId" integer,
    "preferenceType" public."enum_PrivacyPreferences_preferenceType" NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."PrivacyPreferences";
       public         heap    jpm_art    false    950    4            �            1259    43229     PrivacyPreferences_privacyId_seq    SEQUENCE     �   CREATE SEQUENCE public."PrivacyPreferences_privacyId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."PrivacyPreferences_privacyId_seq";
       public          jpm_art    false    239    4            M           0    0     PrivacyPreferences_privacyId_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."PrivacyPreferences_privacyId_seq" OWNED BY public."PrivacyPreferences"."privacyId";
          public          jpm_art    false    238            �            1259    41673    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
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
       public          jpm_art    false    4    213            N           0    0    SizeCategories_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."SizeCategories_id_seq" OWNED BY public."SizeCategories".id;
          public          jpm_art    false    212            �            1259    43454    UserLocations    TABLE     �   CREATE TABLE public."UserLocations" (
    "userLocationId" integer NOT NULL,
    "userId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "creationDate" timestamp with time zone NOT NULL,
    "updatedDate" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."UserLocations";
       public         heap    jpm_art    false    4            �            1259    43453     UserLocations_userLocationId_seq    SEQUENCE     �   CREATE SEQUENCE public."UserLocations_userLocationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."UserLocations_userLocationId_seq";
       public          jpm_art    false    253    4            O           0    0     UserLocations_userLocationId_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."UserLocations_userLocationId_seq" OWNED BY public."UserLocations"."userLocationId";
          public          jpm_art    false    252            �            1259    43170    Users    TABLE     �  CREATE TABLE public."Users" (
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
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    jpm_art    false    926    4    926    935            �            1259    43169    Users_userId_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Users_userId_seq";
       public          jpm_art    false    233    4            P           0    0    Users_userId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";
          public          jpm_art    false    232            /           2604    43245    Artists artistId    DEFAULT     z   ALTER TABLE ONLY public."Artists" ALTER COLUMN "artistId" SET DEFAULT nextval('public."Artists_artistId_seq"'::regclass);
 C   ALTER TABLE public."Artists" ALTER COLUMN "artistId" DROP DEFAULT;
       public          jpm_art    false    241    240    241            0           2604    43260 %   ArtistsAdditionalPhotos artistImageId    DEFAULT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" SET DEFAULT nextval('public."ArtistsAdditionalPhotos_artistImageId_seq"'::regclass);
 X   ALTER TABLE public."ArtistsAdditionalPhotos" ALTER COLUMN "artistImageId" DROP DEFAULT;
       public          jpm_art    false    242    243    243            $           2604    25828    Artworks id    DEFAULT     n   ALTER TABLE ONLY public."Artworks" ALTER COLUMN id SET DEFAULT nextval('public."Artworks_id_seq"'::regclass);
 <   ALTER TABLE public."Artworks" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    224    223    224            -           2604    43211    AuditTrails AuditID    DEFAULT     �   ALTER TABLE ONLY public."AuditTrails" ALTER COLUMN "AuditID" SET DEFAULT nextval('public."AuditTrails_AuditID_seq"'::regclass);
 F   ALTER TABLE public."AuditTrails" ALTER COLUMN "AuditID" DROP DEFAULT;
       public          jpm_art    false    236    237    237            &           2604    33532    DiptychSVGs id    DEFAULT     t   ALTER TABLE ONLY public."DiptychSVGs" ALTER COLUMN id SET DEFAULT nextval('public."DiptychSVGs_id_seq"'::regclass);
 ?   ALTER TABLE public."DiptychSVGs" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    227    228    228            !           2604    25423    Diptychs id    DEFAULT     n   ALTER TABLE ONLY public."Diptychs" ALTER COLUMN id SET DEFAULT nextval('public."Diptychs_id_seq"'::regclass);
 <   ALTER TABLE public."Diptychs" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    217    216    217            %           2604    25871 	   Frames id    DEFAULT     j   ALTER TABLE ONLY public."Frames" ALTER COLUMN id SET DEFAULT nextval('public."Frames_id_seq"'::regclass);
 :   ALTER TABLE public."Frames" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    226    225    226            1           2604    43274    HiddenPhotos hiddenPhotoId    DEFAULT     �   ALTER TABLE ONLY public."HiddenPhotos" ALTER COLUMN "hiddenPhotoId" SET DEFAULT nextval('public."HiddenPhotos_hiddenPhotoId_seq"'::regclass);
 M   ALTER TABLE public."HiddenPhotos" ALTER COLUMN "hiddenPhotoId" DROP DEFAULT;
       public          jpm_art    false    244    245    245            +           2604    43188    Likes likeId    DEFAULT     r   ALTER TABLE ONLY public."Likes" ALTER COLUMN "likeId" SET DEFAULT nextval('public."Likes_likeId_seq"'::regclass);
 ?   ALTER TABLE public."Likes" ALTER COLUMN "likeId" DROP DEFAULT;
       public          jpm_art    false    234    235    235            4           2604    43432    Locations locationId    DEFAULT     �   ALTER TABLE ONLY public."Locations" ALTER COLUMN "locationId" SET DEFAULT nextval('public."Locations_locationId_seq"'::regclass);
 G   ALTER TABLE public."Locations" ALTER COLUMN "locationId" DROP DEFAULT;
       public          jpm_art    false    251    250    251            3           2604    43418 .   OrganizationContactInfos organizationContactId    DEFAULT     �   ALTER TABLE ONLY public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" SET DEFAULT nextval('public."OrganizationContactInfos_organizationContactId_seq"'::regclass);
 a   ALTER TABLE public."OrganizationContactInfos" ALTER COLUMN "organizationContactId" DROP DEFAULT;
       public          jpm_art    false    248    249    249            '           2604    42061    PasswordResetTokens id    DEFAULT     �   ALTER TABLE ONLY public."PasswordResetTokens" ALTER COLUMN id SET DEFAULT nextval('public."PasswordResetTokens_id_seq"'::regclass);
 G   ALTER TABLE public."PasswordResetTokens" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    231    230    231            2           2604    43291 "   PersonContactInfos personContactId    DEFAULT     �   ALTER TABLE ONLY public."PersonContactInfos" ALTER COLUMN "personContactId" SET DEFAULT nextval('public."PersonContactInfos_personContactId_seq"'::regclass);
 U   ALTER TABLE public."PersonContactInfos" ALTER COLUMN "personContactId" DROP DEFAULT;
       public          jpm_art    false    247    246    247            #           2604    25797 	   Photos id    DEFAULT     j   ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."Photos_id_seq"'::regclass);
 :   ALTER TABLE public."Photos" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    222    221    222            "           2604    25640    Pricings id    DEFAULT     n   ALTER TABLE ONLY public."Pricings" ALTER COLUMN id SET DEFAULT nextval('public."Pricings_id_seq"'::regclass);
 <   ALTER TABLE public."Pricings" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    219    218    219                        2604    25241    PrintSizes id    DEFAULT     r   ALTER TABLE ONLY public."PrintSizes" ALTER COLUMN id SET DEFAULT nextval('public."PrintSizes_id_seq"'::regclass);
 >   ALTER TABLE public."PrintSizes" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    214    215    215            .           2604    43233    PrivacyPreferences privacyId    DEFAULT     �   ALTER TABLE ONLY public."PrivacyPreferences" ALTER COLUMN "privacyId" SET DEFAULT nextval('public."PrivacyPreferences_privacyId_seq"'::regclass);
 O   ALTER TABLE public."PrivacyPreferences" ALTER COLUMN "privacyId" DROP DEFAULT;
       public          jpm_art    false    239    238    239                       2604    25192    SizeCategories id    DEFAULT     z   ALTER TABLE ONLY public."SizeCategories" ALTER COLUMN id SET DEFAULT nextval('public."SizeCategories_id_seq"'::regclass);
 B   ALTER TABLE public."SizeCategories" ALTER COLUMN id DROP DEFAULT;
       public          jpm_art    false    213    212    213            5           2604    43457    UserLocations userLocationId    DEFAULT     �   ALTER TABLE ONLY public."UserLocations" ALTER COLUMN "userLocationId" SET DEFAULT nextval('public."UserLocations_userLocationId_seq"'::regclass);
 O   ALTER TABLE public."UserLocations" ALTER COLUMN "userLocationId" DROP DEFAULT;
       public          jpm_art    false    252    253    253            (           2604    43173    Users userId    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);
 ?   ALTER TABLE public."Users" ALTER COLUMN "userId" DROP DEFAULT;
       public          jpm_art    false    233    232    233            �           2606    43264 4   ArtistsAdditionalPhotos ArtistsAdditionalPhotos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_pkey" PRIMARY KEY ("artistImageId");
 b   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" DROP CONSTRAINT "ArtistsAdditionalPhotos_pkey";
       public            jpm_art    false    243            �           2606    43249    Artists Artists_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_pkey" PRIMARY KEY ("artistId");
 B   ALTER TABLE ONLY public."Artists" DROP CONSTRAINT "Artists_pkey";
       public            jpm_art    false    241            a           2606    42650    Artworks Artworks_artworkID_key 
   CONSTRAINT     e   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key" UNIQUE ("artworkID");
 M   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_artworkID_key";
       public            jpm_art    false    224            c           2606    42648     Artworks Artworks_artworkID_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key1" UNIQUE ("artworkID");
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_artworkID_key1";
       public            jpm_art    false    224            e           2606    42652     Artworks Artworks_artworkID_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key2" UNIQUE ("artworkID");
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_artworkID_key2";
       public            jpm_art    false    224            g           2606    42646     Artworks Artworks_artworkID_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_artworkID_key3" UNIQUE ("artworkID");
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_artworkID_key3";
       public            jpm_art    false    224            i           2606    25832    Artworks Artworks_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_pkey";
       public            jpm_art    false    224                       2606    43215    AuditTrails AuditTrails_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_pkey" PRIMARY KEY ("AuditID");
 J   ALTER TABLE ONLY public."AuditTrails" DROP CONSTRAINT "AuditTrails_pkey";
       public            jpm_art    false    237            7           2606    25119    CameraModels CameraModels_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."CameraModels"
    ADD CONSTRAINT "CameraModels_pkey" PRIMARY KEY ("Model");
 L   ALTER TABLE ONLY public."CameraModels" DROP CONSTRAINT "CameraModels_pkey";
       public            jpm_art    false    209            U           2606    25698    Dates Dates_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Dates"
    ADD CONSTRAINT "Dates_pkey" PRIMARY KEY (date);
 >   ALTER TABLE ONLY public."Dates" DROP CONSTRAINT "Dates_pkey";
       public            jpm_art    false    220            m           2606    33536    DiptychSVGs DiptychSVGs_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_pkey";
       public            jpm_art    false    228            I           2606    42620 !   Diptychs Diptychs_diptychName_key 
   CONSTRAINT     i   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key" UNIQUE ("diptychName");
 O   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_diptychName_key";
       public            jpm_art    false    217            K           2606    42622 "   Diptychs Diptychs_diptychName_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key1" UNIQUE ("diptychName");
 P   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_diptychName_key1";
       public            jpm_art    false    217            M           2606    42618 "   Diptychs Diptychs_diptychName_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key2" UNIQUE ("diptychName");
 P   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_diptychName_key2";
       public            jpm_art    false    217            O           2606    42616 "   Diptychs Diptychs_diptychName_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_diptychName_key3" UNIQUE ("diptychName");
 P   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_diptychName_key3";
       public            jpm_art    false    217            Q           2606    25425    Diptychs Diptychs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Diptychs"
    ADD CONSTRAINT "Diptychs_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Diptychs" DROP CONSTRAINT "Diptychs_pkey";
       public            jpm_art    false    217            k           2606    25873    Frames Frames_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Frames"
    ADD CONSTRAINT "Frames_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Frames" DROP CONSTRAINT "Frames_pkey";
       public            jpm_art    false    226            �           2606    43276    HiddenPhotos HiddenPhotos_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_pkey" PRIMARY KEY ("hiddenPhotoId");
 L   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_pkey";
       public            jpm_art    false    245            ;           2606    25140    ImageNumbers ImageNumbers_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."ImageNumbers"
    ADD CONSTRAINT "ImageNumbers_pkey" PRIMARY KEY (number);
 L   ALTER TABLE ONLY public."ImageNumbers" DROP CONSTRAINT "ImageNumbers_pkey";
       public            jpm_art    false    211            }           2606    43191    Likes Likes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("likeId");
 >   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_pkey";
       public            jpm_art    false    235            �           2606    43436    Locations Locations_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("locationId");
 F   ALTER TABLE ONLY public."Locations" DROP CONSTRAINT "Locations_pkey";
       public            jpm_art    false    251            �           2606    43422 6   OrganizationContactInfos OrganizationContactInfos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_pkey" PRIMARY KEY ("organizationContactId");
 d   ALTER TABLE ONLY public."OrganizationContactInfos" DROP CONSTRAINT "OrganizationContactInfos_pkey";
       public            jpm_art    false    249            q           2606    42065 ,   PasswordResetTokens PasswordResetTokens_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."PasswordResetTokens"
    ADD CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public."PasswordResetTokens" DROP CONSTRAINT "PasswordResetTokens_pkey";
       public            jpm_art    false    231            �           2606    43295 *   PersonContactInfos PersonContactInfos_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_pkey" PRIMARY KEY ("personContactId");
 X   ALTER TABLE ONLY public."PersonContactInfos" DROP CONSTRAINT "PersonContactInfos_pkey";
       public            jpm_art    false    247            W           2606    25801    Photos Photos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_pkey";
       public            jpm_art    false    222            Y           2606    42576    Photos Photos_uniqueKey_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key" UNIQUE ("uniqueKey");
 I   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_uniqueKey_key";
       public            jpm_art    false    222            [           2606    42574    Photos Photos_uniqueKey_key1 
   CONSTRAINT     b   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key1" UNIQUE ("uniqueKey");
 J   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_uniqueKey_key1";
       public            jpm_art    false    222            ]           2606    42578    Photos Photos_uniqueKey_key2 
   CONSTRAINT     b   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key2" UNIQUE ("uniqueKey");
 J   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_uniqueKey_key2";
       public            jpm_art    false    222            _           2606    42572    Photos Photos_uniqueKey_key3 
   CONSTRAINT     b   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_uniqueKey_key3" UNIQUE ("uniqueKey");
 J   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_uniqueKey_key3";
       public            jpm_art    false    222            S           2606    25642    Pricings Pricings_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Pricings" DROP CONSTRAINT "Pricings_pkey";
       public            jpm_art    false    219            G           2606    25245    PrintSizes PrintSizes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."PrintSizes" DROP CONSTRAINT "PrintSizes_pkey";
       public            jpm_art    false    215            �           2606    43235 *   PrivacyPreferences PrivacyPreferences_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_pkey" PRIMARY KEY ("privacyId");
 X   ALTER TABLE ONLY public."PrivacyPreferences" DROP CONSTRAINT "PrivacyPreferences_pkey";
       public            jpm_art    false    239            o           2606    41677     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            jpm_art    false    229            9           2606    25126    Series Series_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY ("seriesCode");
 @   ALTER TABLE ONLY public."Series" DROP CONSTRAINT "Series_pkey";
       public            jpm_art    false    210            =           2606    25194 "   SizeCategories SizeCategories_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_pkey";
       public            jpm_art    false    213            ?           2606    42632 +   SizeCategories SizeCategories_sizeLabel_key 
   CONSTRAINT     q   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key" UNIQUE ("sizeLabel");
 Y   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_sizeLabel_key";
       public            jpm_art    false    213            A           2606    42630 ,   SizeCategories SizeCategories_sizeLabel_key1 
   CONSTRAINT     r   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key1" UNIQUE ("sizeLabel");
 Z   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_sizeLabel_key1";
       public            jpm_art    false    213            C           2606    42628 ,   SizeCategories SizeCategories_sizeLabel_key2 
   CONSTRAINT     r   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key2" UNIQUE ("sizeLabel");
 Z   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_sizeLabel_key2";
       public            jpm_art    false    213            E           2606    42626 ,   SizeCategories SizeCategories_sizeLabel_key3 
   CONSTRAINT     r   ALTER TABLE ONLY public."SizeCategories"
    ADD CONSTRAINT "SizeCategories_sizeLabel_key3" UNIQUE ("sizeLabel");
 Z   ALTER TABLE ONLY public."SizeCategories" DROP CONSTRAINT "SizeCategories_sizeLabel_key3";
       public            jpm_art    false    213            �           2606    43459     UserLocations UserLocations_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_pkey" PRIMARY KEY ("userLocationId");
 N   ALTER TABLE ONLY public."UserLocations" DROP CONSTRAINT "UserLocations_pkey";
       public            jpm_art    false    253            s           2606    43440    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            jpm_art    false    233            u           2606    43442    Users Users_email_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);
 D   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key1";
       public            jpm_art    false    233            w           2606    43179    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            jpm_art    false    233            y           2606    43446    Users Users_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
 F   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key";
       public            jpm_art    false    233            {           2606    43448    Users Users_username_key1 
   CONSTRAINT     \   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);
 G   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_username_key1";
       public            jpm_art    false    233            �           2606    43265 =   ArtistsAdditionalPhotos ArtistsAdditionalPhotos_artistId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ArtistsAdditionalPhotos"
    ADD CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES public."Artists"("artistId") ON UPDATE CASCADE;
 k   ALTER TABLE ONLY public."ArtistsAdditionalPhotos" DROP CONSTRAINT "ArtistsAdditionalPhotos_artistId_fkey";
       public          jpm_art    false    243    3715    241            �           2606    43250    Artists Artists_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artists"
    ADD CONSTRAINT "Artists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 I   ALTER TABLE ONLY public."Artists" DROP CONSTRAINT "Artists_userId_fkey";
       public          jpm_art    false    3703    241    233            �           2606    42663     Artworks Artworks_diptychId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_diptychId_fkey" FOREIGN KEY ("diptychId") REFERENCES public."Diptychs"(id) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_diptychId_fkey";
       public          jpm_art    false    3665    217    224            �           2606    42658 !   Artworks Artworks_photoRefId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_photoRefId_fkey" FOREIGN KEY ("photoRefId") REFERENCES public."Photos"(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_photoRefId_fkey";
       public          jpm_art    false    3671    222    224            �           2606    42668     Artworks Artworks_pricingId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES public."Pricings"(id) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_pricingId_fkey";
       public          jpm_art    false    219    3667    224            �           2606    42673 "   Artworks Artworks_printSizeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_printSizeId_fkey" FOREIGN KEY ("printSizeId") REFERENCES public."PrintSizes"(id) ON UPDATE CASCADE;
 P   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_printSizeId_fkey";
       public          jpm_art    false    224    215    3655            �           2606    42653 %   Artworks Artworks_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Artworks"
    ADD CONSTRAINT "Artworks_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id) ON UPDATE CASCADE;
 S   ALTER TABLE ONLY public."Artworks" DROP CONSTRAINT "Artworks_sizeCategoryId_fkey";
       public          jpm_art    false    213    3645    224            �           2606    43216 #   AuditTrails AuditTrails_UserID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AuditTrails"
    ADD CONSTRAINT "AuditTrails_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 Q   ALTER TABLE ONLY public."AuditTrails" DROP CONSTRAINT "AuditTrails_UserID_fkey";
       public          jpm_art    false    3703    233    237            �           2606    42678 &   DiptychSVGs DiptychSVGs_DiptychId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_DiptychId_fkey" FOREIGN KEY ("DiptychId") REFERENCES public."Diptychs"(id);
 T   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_DiptychId_fkey";
       public          jpm_art    false    217    3665    228            �           2606    42683 $   DiptychSVGs DiptychSVGs_FrameId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DiptychSVGs"
    ADD CONSTRAINT "DiptychSVGs_FrameId_fkey" FOREIGN KEY ("FrameId") REFERENCES public."Frames"(id);
 R   ALTER TABLE ONLY public."DiptychSVGs" DROP CONSTRAINT "DiptychSVGs_FrameId_fkey";
       public          jpm_art    false    226    3691    228            �           2606    43277 &   HiddenPhotos HiddenPhotos_photoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photos"(id);
 T   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_photoId_fkey";
       public          jpm_art    false    245    222    3671            �           2606    43282 %   HiddenPhotos HiddenPhotos_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HiddenPhotos"
    ADD CONSTRAINT "HiddenPhotos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");
 S   ALTER TABLE ONLY public."HiddenPhotos" DROP CONSTRAINT "HiddenPhotos_userId_fkey";
       public          jpm_art    false    3703    245    233            �           2606    43202    Likes Likes_diptychIdCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_diptychIdCode_fkey" FOREIGN KEY ("diptychIdCode") REFERENCES public."DiptychSVGs"(id);
 L   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_diptychIdCode_fkey";
       public          jpm_art    false    228    3693    235            �           2606    43197    Likes Likes_photoId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photos"(id);
 F   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_photoId_fkey";
       public          jpm_art    false    3671    235    222            �           2606    43192    Likes Likes_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId");
 E   ALTER TABLE ONLY public."Likes" DROP CONSTRAINT "Likes_userId_fkey";
       public          jpm_art    false    3703    235    233            �           2606    43423 =   OrganizationContactInfos OrganizationContactInfos_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrganizationContactInfos"
    ADD CONSTRAINT "OrganizationContactInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 k   ALTER TABLE ONLY public."OrganizationContactInfos" DROP CONSTRAINT "OrganizationContactInfos_userId_fkey";
       public          jpm_art    false    3703    233    249            �           2606    43296 1   PersonContactInfos PersonContactInfos_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PersonContactInfos"
    ADD CONSTRAINT "PersonContactInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 _   ALTER TABLE ONLY public."PersonContactInfos" DROP CONSTRAINT "PersonContactInfos_userId_fkey";
       public          jpm_art    false    233    247    3703            �           2606    42554    Photos Photos_date_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_date_fkey" FOREIGN KEY (date) REFERENCES public."Dates"(date);
 E   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_date_fkey";
       public          jpm_art    false    222    220    3669            �           2606    42564    Photos Photos_model_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_model_fkey" FOREIGN KEY (model) REFERENCES public."CameraModels"("Model");
 F   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_model_fkey";
       public          jpm_art    false    3639    222    209            �           2606    42559    Photos Photos_number_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_number_fkey" FOREIGN KEY (number) REFERENCES public."ImageNumbers"(number);
 G   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_number_fkey";
       public          jpm_art    false    3643    211    222            �           2606    42549    Photos Photos_seriesCode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "Photos_seriesCode_fkey" FOREIGN KEY ("seriesCode") REFERENCES public."Series"("seriesCode");
 K   ALTER TABLE ONLY public."Photos" DROP CONSTRAINT "Photos_seriesCode_fkey";
       public          jpm_art    false    210    222    3641            �           2606    42633 %   Pricings Pricings_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Pricings"
    ADD CONSTRAINT "Pricings_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);
 S   ALTER TABLE ONLY public."Pricings" DROP CONSTRAINT "Pricings_sizeCategoryId_fkey";
       public          jpm_art    false    213    3645    219            �           2606    42638 )   PrintSizes PrintSizes_sizeCategoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrintSizes"
    ADD CONSTRAINT "PrintSizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES public."SizeCategories"(id);
 W   ALTER TABLE ONLY public."PrintSizes" DROP CONSTRAINT "PrintSizes_sizeCategoryId_fkey";
       public          jpm_art    false    213    3645    215            �           2606    43236 1   PrivacyPreferences PrivacyPreferences_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PrivacyPreferences"
    ADD CONSTRAINT "PrivacyPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE;
 _   ALTER TABLE ONLY public."PrivacyPreferences" DROP CONSTRAINT "PrivacyPreferences_userId_fkey";
       public          jpm_art    false    3703    233    239            �           2606    43465 +   UserLocations UserLocations_locationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Locations"("locationId") ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."UserLocations" DROP CONSTRAINT "UserLocations_locationId_fkey";
       public          jpm_art    false    3725    251    253            �           2606    43460 '   UserLocations UserLocations_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserLocations"
    ADD CONSTRAINT "UserLocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"("userId") ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."UserLocations" DROP CONSTRAINT "UserLocations_userId_fkey";
       public          jpm_art    false    253    233    3703           