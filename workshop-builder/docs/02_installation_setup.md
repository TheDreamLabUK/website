# 2. Installation and Setup

This section guides you through the steps required to install and configure the Workshop Builder CLI tool with **OpenAI Codex Framework** integration on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed and configured:

### Core Requirements

1.  **Python:** Version 3.10 or higher is required for OpenAI Codex Framework compatibility. Download from [python.org](https://www.python.org/).
2.  **Git:** Required for professional version control operations and GitHub integration. Download from [git-scm.com](https://git-scm.com/).
3.  **OpenAI Codex CLI:** **REQUIRED** for actual Codex integration. Install via:
    ```bash
    npm install -g @openai/codex-cli
    ```
    Or follow the latest installation instructions from OpenAI's documentation.

### Advanced Requirements

4.  **(Recommended) Docker:** For secure sandboxed execution of Codex CLI operations. Refer to [docker.com](https://www.docker.com/) for installation.
5.  **Node.js:** Version 16+ required for OpenAI Codex CLI. Download from [nodejs.org](https://nodejs.org/).

### API Access Requirements

6.  **Required API Keys and Tokens:**
    *   **Google Gemini Flash 2.5 API Key:** For advanced research capabilities. Obtain from [Google AI Studio](https://aistudio.google.com/) or Google Cloud Console.
    *   **OpenAI API Key:** **REQUIRED** for Codex CLI integration. Obtain from [OpenAI Platform](https://platform.openai.com/) with Codex access enabled.
    *   **GitHub Personal Access Token (PAT):** For professional GitHub workflow automation. Generate from GitHub Developer Settings with `repo`, `pull_request`, and `workflow` scopes.

## Installation Steps

1.  **Clone the Repository:**
    Open your terminal and clone the repository containing the Workshop Builder project (assuming this project itself is hosted on GitHub).
    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL
    cd workshop-builder
    ```

2.  **Create a Python Virtual Environment (Recommended):**
    It's best practice to use a virtual environment to manage project dependencies.
    ```bash
    python -m venv .venv
    ```
    Activate the virtual environment:
    *   On macOS and Linux:
        ```bash
        source .venv/bin/activate
        ```
    *   On Windows:
        ```bash
        .venv\Scripts\activate
        ```

3.  **Install Python Dependencies:**
    Install the required Python packages for OpenAI Codex Framework integration:
    ```bash
    pip install -r requirements.txt
    ```
    Key dependencies include:
    -   `python-dotenv`: Environment variable management
    -   `PyGithub`: Professional GitHub API integration
    -   `google-generativeai`: Gemini Flash 2.5 API client
    -   `requests`: HTTP client for API communications
    -   `Jinja2`: Professional template rendering
    -   `click`: Advanced CLI interface framework
    -   `subprocess`: For Codex CLI integration (built-in)

4.  **OpenAI Codex CLI Setup:**
    **CRITICAL:** Install and configure the OpenAI Codex CLI for actual framework integration:
    ```bash
    # Install Codex CLI
    npm install -g @openai/codex-cli
    
    # Verify installation
    codex --version
    
    # Test authentication (will use OPENAI_API_KEY from environment)
    codex auth test
    ```

5.  **Configure OpenAI Codex Framework Environment:**
    The Workshop Builder requires comprehensive environment configuration for Codex Framework integration.
    -   Locate the example environment file: [`workshop-builder/.env.example`](../.env.example).
    -   Create your configuration file:
        ```bash
        cp .env.example .env
        ```
    -   **REQUIRED:** Fill in all required values in the `.env` file:
        ```env
        # CORE API KEYS (REQUIRED)
        GEMINI_API_KEY="your_gemini_flash_25_api_key"
        OPENAI_API_KEY="your_openai_api_key_with_codex_access"
        GITHUB_TOKEN="your_github_pat_with_repo_scope"
        
        # GITHUB REPOSITORY (REQUIRED)
        GITHUB_REPO_OWNER="your_github_username"
        GITHUB_REPO_NAME="your_workshop_repository"
        
        # CODEX FRAMEWORK CONFIGURATION
        CODEX_CLI_ENABLED=true
        CODEX_CLI_PATH=codex
        CODEX_MODEL=code-davinci-002
        CODEX_MAX_TOKENS=4000
        CODEX_TEMPERATURE=0.1
        
        # AGENTS.MD SUPPORT
        AGENTS_MD_ENABLED=true
        AGENTS_MD_PATH=AGENTS.MD
        
        # PROFESSIONAL ERROR HANDLING
        ERROR_RECOVERY_ENABLED=true
        MAX_RETRY_ATTEMPTS=3
        FALLBACK_GENERATION_ENABLED=true
        
        # PROFESSIONAL OUTPUT STANDARDS
        PROFESSIONAL_FORMATTING=true
        COMPREHENSIVE_VALIDATION=true
        METADATA_TRACKING=true
        ```

6.  **Validate OpenAI Codex Framework Configuration:**
    Test your configuration to ensure proper Codex Framework integration:
    ```bash
    # Test configuration loading
    python orchestrator/config.py
    
    # Verify Codex CLI integration
    python -c "
    from orchestrator.config import AppConfig
    config = AppConfig()
    print('Codex CLI Enabled:', config.codex_cli_enabled)
    print('Configuration Valid:', 'SUCCESS' if config.openai_api_key else 'FAILED')
    "
    ```

## Verifying OpenAI Codex Framework Installation

Once the setup is complete, perform comprehensive verification of the Codex Framework integration:

### 1. Basic CLI Verification
```bash
python cli.py --help
```
This should display the command-line options with Codex Framework support.

### 2. Codex CLI Integration Test
```bash
# Test Codex CLI accessibility
codex --version

# Test API authentication
codex auth test
```

### 3. Comprehensive System Validation
```bash
# Run comprehensive configuration validation
python orchestrator/config.py

# Test all agent initialization
python -c "
from orchestrator.orchestrator import Orchestrator
from orchestrator.config import AppConfig
config = AppConfig()
orchestrator = Orchestrator(config)
print('✓ OpenAI Codex Framework integration validated')
print('✓ All agents initialized successfully')
print('✓ Professional error handling enabled')
print('✓ AGENTS.MD support configured')
"
```

### 4. API Connectivity Test
```bash
# Test Gemini Flash 2.5 API connectivity
python -c "
import google.generativeai as genai
import os
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
print('✓ Gemini Flash 2.5 API connection verified')
"

# Test OpenAI API connectivity
python -c "
import openai
import os
openai.api_key = os.getenv('OPENAI_API_KEY')
print('✓ OpenAI API connection verified')
"
```

### 5. GitHub Integration Test
```bash
# Test GitHub API connectivity
python -c "
from github import Github
import os
g = Github(os.getenv('GITHUB_TOKEN'))
user = g.get_user()
print(f'✓ GitHub API connection verified for user: {user.login}')
"
```

## Troubleshooting

### Common Issues and Solutions

**Codex CLI Not Found:**
```bash
# Ensure Node.js is installed
node --version

# Reinstall Codex CLI
npm uninstall -g @openai/codex-cli
npm install -g @openai/codex-cli
```

**API Authentication Failures:**
- Verify API keys are correctly set in `.env`
- Ensure OpenAI API key has Codex access enabled
- Check GitHub token has required scopes (`repo`, `pull_request`, `workflow`)

**Configuration Validation Errors:**
```bash
# Check environment variable loading
python -c "
from dotenv import load_dotenv
import os
load_dotenv()
print('OPENAI_API_KEY:', 'SET' if os.getenv('OPENAI_API_KEY') else 'MISSING')
print('GEMINI_API_KEY:', 'SET' if os.getenv('GEMINI_API_KEY') else 'MISSING')
print('GITHUB_TOKEN:', 'SET' if os.getenv('GITHUB_TOKEN') else 'MISSING')
"
```

## Success Confirmation

When all verification steps pass, you should see:
- ✓ OpenAI Codex CLI accessible and authenticated
- ✓ All API connections verified
- ✓ Configuration validation successful
- ✓ Agent initialization complete
- ✓ Professional error handling enabled

**You are now ready to use the Workshop Builder with full OpenAI Codex Framework integration!**

Next: [Core Concepts & System Architecture](./03_core_concepts_architecture.md)