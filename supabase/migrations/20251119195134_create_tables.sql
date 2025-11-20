create type public.recurrence_rule as enum (
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'YEARLY'
);

create table public.profiles (
    id uuid not null references auth.users on delete cascade,
    username varchar(50) not null unique,

    primary key (id)
);

create table public.transaction_templates (
    profile_id uuid not null references public.profiles(id) on delete cascade,
    id integer not null,
    
    name varchar(50) not null,
    description varchar(255),
    amount decimal(10, 2) not null,
    
    recurrence_rule public.recurrence_rule not null,
    recurrence_interval integer not null,
    start_date date not null,
    end_date date,
    is_active boolean not null default true,

    primary key (profile_id, id)
);

create table public.transactions (
    profile_id uuid not null references public.profiles(id) on delete cascade,
    id integer not null,
    
    template_id integer,
    
    name varchar(50) not null,
    description varchar(255),
    amount decimal(10, 2) not null,
    date date not null,    

    primary key (profile_id, id),
    foreign key (profile_id, template_id) references public.transaction_templates(profile_id, id) on delete set null
);

create table public.budget_templates (
    id serial,
    
    author_profile_id uuid not null references public.profiles(id) on delete set null,
    
    name varchar(50) not null,
    description text,

    recurrence_rule public.recurrence_rule not null,
    recurrence_interval integer not null,

    primary key (id)
);

create table public.profile_budget_templates (
    profile_id uuid not null references public.profiles(id) on delete cascade,
    template_id integer not null references public.budget_templates(id) on delete cascade,
    
    is_active boolean not null default true,
    start_date date not null,

    primary key (profile_id, template_id)
);

create table public.budget_categories (
    template_id integer not null references public.budget_templates(id) on delete cascade,
    id integer not null,
    
    parent_id integer,
    
    name varchar(50) not null,
    description varchar(255),

    primary key (template_id, id),
    foreign key (template_id, parent_id) references public.budget_categories(template_id, id) on delete cascade
);

create table public.profile_budget_transactions(
    profile_id uuid not null,
    transaction_id integer not null,
    template_id integer not null,
    
    category_id integer,

    primary key (transaction_id, profile_id, template_id),
    foreign key (profile_id, transaction_id) references public.transactions(profile_id, id) on delete cascade,
    foreign key (profile_id, template_id) references public.profile_budget_templates(profile_id, template_id) on delete cascade,
    foreign key (template_id, category_id) references public.budget_categories(template_id, id) on delete cascade
);

create table public.budget_allocations (
    profile_id uuid not null,
    template_id integer not null,
    category_id integer not null,
    
    allocated_amount decimal(10, 2) not null,

    primary key (profile_id, template_id, category_id),
    foreign key (profile_id, template_id) references public.profile_budget_templates(profile_id, template_id) on delete cascade,
    foreign key (template_id, category_id) references public.budget_categories(template_id, id) on delete cascade
);

create table public.budget_template_rules (
    template_id integer not null references public.budget_templates(id) on delete cascade,
    category_id integer not null,
    
    name varchar(50),
    percentage_allocation decimal(5, 2),
    fixed_amount decimal(10, 2),

    primary key (template_id, category_id),
    foreign key (template_id, category_id) references public.budget_categories(template_id, id) on delete cascade
);

/* ADD in policies pre merge - THIS NEEDS TO BE UNCOMMENTED AND ROW LEVEL SECURITY FOR ALL TABLES (or comperable security)
alter table public.profiles enable row level security;
alter table public.transaction_templates enable row level security;
alter table public.transactions enable row level security;
alter table public.budget_templates enable row level security;
alter table public.profile_budget_templates enable row level security;
alter table public.budget_categories enable row level security;
alter table public.profile_budget_transactions enable row level security;
alter table public.budget_allocations enable row level security;
alter table public.budget_template_rules enable row level security;
*/