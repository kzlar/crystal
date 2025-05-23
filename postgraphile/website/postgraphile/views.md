---
title: Views
---

Views are a great solution for abstraction. PostGraphile supports reading from
and writing to views; however PostgreSQL lacks the powerful introspection
capabilities on views that it has on tables, so we cannot easily automatically
infer the relations. However, you can
[use our "smart tags" functionality to add constraints to views](./smart-tags#virtual-constraints)
which will make them a lot more table-like (giving them a primary key so you can
get a `nodeId` and maybe CRUD mutations; adding foreign key references between views and other views or
tables; setting columns as non-null).

### Abstract Business Logic

We can prepare certain queries in advance and expose the results through
GraphQL. For example, say we want just the `Comedy` films from our `films`
table, we can create a view that contains this specific film type.

```sql
create table app_public.films (
  id serial primary key,
  name text,
  release_year int,
  kind text
);

create view comedies as
    select *
    from app_public.films
    where kind = 'Comedy';
```

And query this view as if it were a normal table:

```graphql
{
  comedies(first: 20) {
    name
    releaseYear
  }
}
```

### Flatten joined tables

Views enable you to expose a simple "flattened" object built from multiple
tables.

```sql
create table app_public.person (
  id serial primary key
);

create table app_public.address (
  person_id int primary key references app_public.person,
  country text,
  street text,
);

create view person_view as
  select person.id, address.country, address.street
  from app_public.person person
  inner join app_public.address
  on person.id = address.person_id;
```

The GraphQL query using this view is flatter than the query using the underlying
tables:

```graphql
query Before {
  person {
    id
    address {
      country
      street
    }
  }
}

query After {
  personView {
    id
    country
    street
  }
}
```

:::note

You can use [smart tags](./smart-tags#name) to change the GraphQL
field name.

:::

### Authorization

Authorization can be enforced using `views` as well, for example, exposing some
data only to authenticated users:

```sql
create table app_public.person (
  id serial primary key
);

create table app_public.personal_data (
  id serial primary key,
  secret1 text,
  secret2 int,
  person_id references app_public.person (id)
);

create view personal_data_view
  with (security_barrier, check_option = 'cascaded')
  as
    select personal_data.*
    from app_public.personal_data personal_data
    where person_id = current_user_id()
```

(`current_user_id()` here is a function that might return something like
`nullif(current_setting('jwt.claims.user_id', true), '')::int`)

### API Layer

Using views, one can create an access layer that will remain consistent even
while making changes to the underlying tables — for example when splitting
tables or combining them. Note that simple name changes can be solved using
smart tags without the need for views. Much of what can be achieved with views
can also be achieved with functions or plugins, so consider those options too.
