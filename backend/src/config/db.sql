-- user table
CREATE TYPE user_role AS ENUM ('HR', 'VENDOR', 'ADMIN');
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- opt table
CREATE TABLE events_opt (
    events_opt_id SERIAL PRIMARY KEY,
    events_opt_name VARCHAR(255) NOT NULL,
    hr_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- events table
CREATE TYPE user_status AS ENUM ('Pending', 'Approved', 'Rejected');
CREATE TABLE events (
    events_id BIGSERIAL PRIMARY KEY,
    hr_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    vendor_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    events_opt_id INTEGER REFERENCES events_opt(events_opt_id) ON DELETE CASCADE,
    proposed_dates DATE [],
    location TEXT,
    status user_status NOT NULL DEFAULT 'Pending',
    description TEXT,
    rejection_remarks TEXT,
    confirmed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- add pre account user
INSERT INTO users (username, password, company_name, role)
VALUES ('hr1', 'hrpass1', 'Company HR 1', 'HR'),
    ('hr2', 'hrpass2', 'Company HR 2', 'HR'),
    (
        'vendor1',
        'vendorpass1',
        'Company Vendor 1',
        'VENDOR'
    ),
    (
        'vendor2',
        'vendorpass2',
        'Company Vendor 2',
        'VENDOR'
    ),
    (
        'vendor3',
        'vendorpass3',
        'Company Vendor 3',
        'VENDOR'
    ),
    (
        'vendor4',
        'vendorpass4',
        'Company Vendor 4',
        'VENDOR'
    );