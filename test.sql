PGDMP         /                y            test    13.4    13.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    test    DATABASE     h   CREATE DATABASE test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE test;
                postgres    false            �            1259    16464    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    mobile text,
    name text,
    gender text,
    role text,
    password text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16462    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16434    users_image    TABLE     X   CREATE TABLE public.users_image (
    id integer,
    data text,
    "mimeType" text
);
    DROP TABLE public.users_image;
       public         heap    postgres    false            �          0    16464    users 
   TABLE DATA           S   COPY public.users (id, username, mobile, name, gender, role, password) FROM stdin;
    public          postgres    false    202   �       �          0    16434    users_image 
   TABLE DATA           ;   COPY public.users_image (id, data, "mimeType") FROM stdin;
    public          postgres    false    200          �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    201            )           2606    16471    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    202            *           2606    16472    users_image id    FK CONSTRAINT     r   ALTER TABLE ONLY public.users_image
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public.users(id) NOT VALID;
 8   ALTER TABLE ONLY public.users_image DROP CONSTRAINT id;
       public          postgres    false    200    202    2857            �   p   x�3�LL�K����O��I��K�M�LO�KI-�,�
$���pqz �@���f��&�f憜�
P	�D�zǔ��<N���C#c.c�t���˔,]fd����� sW�      �      x������ � �     