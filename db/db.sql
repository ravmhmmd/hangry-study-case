PGDMP         4                {            db-hangry-study-case    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    49173    db-hangry-study-case    DATABASE     �   CREATE DATABASE "db-hangry-study-case" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 &   DROP DATABASE "db-hangry-study-case";
                postgres    false            �            1259    49186    cart    TABLE     U   CREATE TABLE public.cart (
    menu_id integer NOT NULL,
    qty integer NOT NULL
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    49185    cart_menu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_menu_id_seq;
       public          postgres    false    217                       0    0    cart_menu_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_menu_id_seq OWNED BY public.cart.menu_id;
          public          postgres    false    216            �            1259    49175    menus    TABLE     �   CREATE TABLE public.menus (
    id integer NOT NULL,
    name character varying NOT NULL,
    image character varying NOT NULL,
    description character varying NOT NULL,
    availability integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.menus;
       public         heap    postgres    false            �            1259    49174    menus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.menus_id_seq;
       public          postgres    false    215            	           0    0    menus_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.menus_id_seq OWNED BY public.menus.id;
          public          postgres    false    214            l           2604    49190    cart menu_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN menu_id SET DEFAULT nextval('public.cart_menu_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN menu_id DROP DEFAULT;
       public          postgres    false    216    217    217            j           2604    49178    menus id    DEFAULT     d   ALTER TABLE ONLY public.menus ALTER COLUMN id SET DEFAULT nextval('public.menus_id_seq'::regclass);
 7   ALTER TABLE public.menus ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215                      0    49186    cart 
   TABLE DATA           ,   COPY public.cart (menu_id, qty) FROM stdin;
    public          postgres    false    217   -       �          0    49175    menus 
   TABLE DATA           K   COPY public.menus (id, name, image, description, availability) FROM stdin;
    public          postgres    false    215   J       
           0    0    cart_menu_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cart_menu_id_seq', 1, false);
          public          postgres    false    216                       0    0    menus_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.menus_id_seq', 8, true);
          public          postgres    false    214            n           2606    49183    menus menus_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.menus DROP CONSTRAINT menus_pkey;
       public            postgres    false    215            o           2606    49193    cart cart_menu_id_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_menu_id_fkey FOREIGN KEY (menu_id) REFERENCES public.menus(id);
 @   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_menu_id_fkey;
       public          postgres    false    215    217    3182                  x������ � �      �     x��нN�0���y
�@�6!!!�V�:�RuI����|v!oO��Tu�r����s�B��eg���0^��b�^��\4�Rk<��hȩV��f�q�Q���j��Im����9���fQ9�)�9�࿑�~\�C�^-lU���0�i8�'�ײ�ƄbH,�X��ew��U�0"��z\v��$��L\��/S���!��y@6`��p9�J�y
��t�q|�`�w�,9^��y��1Ԡ�H�.�X�#Ey�}Y��f���     