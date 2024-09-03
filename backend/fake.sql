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