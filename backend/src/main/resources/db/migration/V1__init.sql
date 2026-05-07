CREATE TABLE policy_exception (
    id BIGSERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    priority VARCHAR(50) DEFAULT 'MEDIUM',

    created_by VARCHAR(100) NOT NULL,
    assigned_to VARCHAR(100),

    ai_description TEXT,
    ai_recommendation TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    is_deleted BOOLEAN DEFAULT FALSE
);

-- Indexes (important for performance)
CREATE INDEX idx_policy_status ON policy_exception(status);
CREATE INDEX idx_policy_created_by ON policy_exception(created_by);
CREATE INDEX idx_policy_created_at ON policy_exception(created_at);
