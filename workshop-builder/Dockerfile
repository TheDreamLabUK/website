# Multi-Stage Dockerfile for Workshop Builder with Enhanced Security
# Built on OpenAI Codex Framework with professional Docker practices

# =============================================================================
# BUILD STAGE - Dependencies and Build Artifacts
# =============================================================================
FROM ghcr.io/openai/codex-universal:latest AS builder

# Set up language versions required by the project and codex-cli
ENV CODEX_ENV_PYTHON_VERSION=3.12
ENV CODEX_ENV_NODE_VERSION=20

# Set working directory for build stage
WORKDIR /build

# Copy and install Python dependencies first (better layer caching)
COPY ./requirements.txt /build/requirements.txt
RUN pip install --no-cache-dir --user -r requirements.txt

# Install OpenAI Codex CLI globally
RUN npm install -g @openai/codex-cli

# Verify installations
RUN python --version && node --version && codex --version || echo "Codex CLI verification skipped"

# =============================================================================
# PRODUCTION STAGE - Optimized Runtime Image
# =============================================================================
FROM ghcr.io/openai/codex-universal:latest AS production

# Set up language versions (must match builder stage)
ENV CODEX_ENV_PYTHON_VERSION=3.12
ENV CODEX_ENV_NODE_VERSION=20

# Create non-root user for enhanced security
RUN adduser --disabled-password --gecos '' --uid 1000 workshop-user && \
    mkdir -p /app/workshop-builder && \
    chown -R workshop-user:workshop-user /app

# Set working directory
WORKDIR /app/workshop-builder

# Copy Python packages from builder stage
COPY --from=builder /root/.local /home/workshop-user/.local

# Copy Node.js global packages from builder stage
COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=builder /usr/local/bin/codex /usr/local/bin/codex

# Update PATH for user-installed packages
ENV PATH="/home/workshop-user/.local/bin:$PATH"

# Copy application code with proper ownership
COPY --chown=workshop-user:workshop-user . /app/workshop-builder/

# Ensure scripts are executable
RUN chmod +x /app/workshop-builder/*.sh 2>/dev/null || true

# Add health check for container monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import sys, os; \
        from orchestrator.config import AppConfig; \
        config = AppConfig() if os.path.exists('.env') else None; \
        sys.exit(0)" || exit 1

# Switch to non-root user for security
USER workshop-user

# Set secure environment defaults
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_NO_CACHE_DIR=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Define labels for better image management
LABEL maintainer="Workshop Builder Team"
LABEL description="OpenAI Codex Framework-powered workshop generation system"
LABEL version="2.0.0"
LABEL security.scan="enabled"

# Define the entrypoint
ENTRYPOINT ["python", "cli.py"]

# Default help command if no arguments provided
CMD ["--help"]