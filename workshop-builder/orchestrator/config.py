import os
import logging
from dotenv import load_dotenv

class AppConfig:
    """
    OpenAI Codex Framework Configuration Manager
    
    Manages configuration for the Workshop Builder system with comprehensive
    support for OpenAI Codex CLI integration, AGENTS.MD guidance, and
    professional error handling.
    """
    
    def __init__(self):
        # Load .env file from the workshop-builder directory (one level up from orchestrator)
        dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
        if not load_dotenv(dotenv_path):
            # Fallback to trying to load .env from the current working directory if cli.py is run from elsewhere
            # This might happen if workshop-builder is installed as a package later
            if not load_dotenv():
                 print("Warning: .env file not found. Please ensure it exists in the 'workshop-builder' directory or current working directory.")

        # Core Configuration
        self.log_level = os.getenv("LOG_LEVEL", "INFO").upper()
        
        # API Keys for AI Services
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.github_token = os.getenv("GITHUB_TOKEN")
        
        # OpenAI Codex Framework Configuration
        self.codex_cli_enabled = os.getenv("CODEX_CLI_ENABLED", "true").lower() == "true"
        self.codex_cli_path = os.getenv("CODEX_CLI_PATH", "codex")  # Default to 'codex' in PATH
        self.codex_model = os.getenv("CODEX_MODEL", "code-davinci-002")
        self.codex_max_tokens = int(os.getenv("CODEX_MAX_TOKENS", "4000"))
        self.codex_temperature = float(os.getenv("CODEX_TEMPERATURE", "0.1"))
        
        # AGENTS.MD Support Configuration
        self.agents_md_enabled = os.getenv("AGENTS_MD_ENABLED", "true").lower() == "true"
        self.agents_md_path = os.getenv("AGENTS_MD_PATH", "AGENTS.MD")
        
        # Professional Error Handling Configuration
        self.error_recovery_enabled = os.getenv("ERROR_RECOVERY_ENABLED", "true").lower() == "true"
        self.max_retry_attempts = int(os.getenv("MAX_RETRY_ATTEMPTS", "3"))
        self.fallback_generation_enabled = os.getenv("FALLBACK_GENERATION_ENABLED", "true").lower() == "true"
        
        # Workshop Infrastructure Configuration
        self.workshops_base_dir = os.getenv("WORKSHOPS_BASE_DIR", "../public/data/workshops")
        self.github_repo_owner = os.getenv("GITHUB_REPO_OWNER")
        self.github_repo_name = os.getenv("GITHUB_REPO_NAME")

        # Prompt and Template Configuration
        self.compiler_agent_prompt_path = os.getenv("COMPILER_AGENT_PROMPT_PATH", "workshop_compiler_agent_prompt.md")
        self.temp_data_dir = os.getenv("TEMP_DATA_DIR", "temp_research_data")
        
        # Professional Output Configuration
        self.professional_formatting = os.getenv("PROFESSIONAL_FORMATTING", "true").lower() == "true"
        self.comprehensive_validation = os.getenv("COMPREHENSIVE_VALIDATION", "true").lower() == "true"
        self.metadata_tracking = os.getenv("METADATA_TRACKING", "true").lower() == "true"


        # Validate Required Configuration
        self._validate_configuration()

    def _validate_configuration(self):
        """Validate required configuration for OpenAI Codex Framework integration."""
        missing_vars = []
        
        # Core API Keys
        if not self.gemini_api_key:
            missing_vars.append("GEMINI_API_KEY")
        if not self.openai_api_key:
            missing_vars.append("OPENAI_API_KEY")
        if not self.github_token:
            missing_vars.append("GITHUB_TOKEN")
        if not self.github_repo_owner:
            missing_vars.append("GITHUB_REPO_OWNER")
        if not self.github_repo_name:
            missing_vars.append("GITHUB_REPO_NAME")

        if missing_vars:
            error_message = "Error: Missing required environment variables for OpenAI Codex Framework:\n"
            for var in missing_vars:
                error_message += f"- {var}\n"
            error_message += "\nPlease create or update the .env file in the 'workshop-builder' directory."
            error_message += "\nRequired for OpenAI Codex CLI integration and professional agent orchestration."
            logging.critical(error_message)
            raise ValueError(error_message)

        # Validate Codex CLI Configuration
        if self.codex_cli_enabled:
            try:
                import subprocess
                result = subprocess.run([self.codex_cli_path, "--version"],
                                      capture_output=True, text=True, timeout=10)
                if result.returncode != 0:
                    logging.warning(f"Codex CLI not found at '{self.codex_cli_path}'. Fallback generation will be used.")
                    self.codex_cli_enabled = False
            except (subprocess.TimeoutExpired, FileNotFoundError, subprocess.SubprocessError):
                logging.warning(f"Codex CLI validation failed. Fallback generation will be used.")
                self.codex_cli_enabled = False

    def get_logger(self, name: str) -> logging.Logger:
        """Get a configured logger for the specified component."""
        logger = logging.getLogger(name)
        # Enhanced logging configuration for Codex Framework
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            logger.setLevel(getattr(logging, self.log_level))
        return logger

    def get_codex_config(self) -> dict:
        """Get OpenAI Codex CLI configuration parameters."""
        return {
            "enabled": self.codex_cli_enabled,
            "cli_path": self.codex_cli_path,
            "model": self.codex_model,
            "max_tokens": self.codex_max_tokens,
            "temperature": self.codex_temperature,
            "api_key": self.openai_api_key
        }

    def get_agents_md_config(self) -> dict:
        """Get AGENTS.MD configuration parameters."""
        return {
            "enabled": self.agents_md_enabled,
            "path": self.agents_md_path
        }

    def get_error_handling_config(self) -> dict:
        """Get error handling configuration parameters."""
        return {
            "recovery_enabled": self.error_recovery_enabled,
            "max_retry_attempts": self.max_retry_attempts,
            "fallback_generation_enabled": self.fallback_generation_enabled
        }

    def get_professional_config(self) -> dict:
        """Get professional output configuration parameters."""
        return {
            "formatting": self.professional_formatting,
            "validation": self.comprehensive_validation,
            "metadata_tracking": self.metadata_tracking
        }

if __name__ == '__main__':
    # For testing config loading
    try:
        config = AppConfig()
        print("AppConfig loaded successfully.")
        print(f"Log Level: {config.log_level}")
        print(f"Workshops Base Dir: {config.workshops_base_dir}")
        print(f"Compiler Prompt Path: {config.compiler_agent_prompt_path}")
        print(f"Temp Data Dir: {config.temp_data_dir}")
        # print(f"Gemini Key: {'Set' if config.gemini_api_key else 'Not Set'}")
        # print(f"OpenAI Key: {'Set' if config.openai_api_key else 'Not Set'}")
        # print(f"GitHub Token: {'Set' if config.github_token else 'Not Set'}")
        print(f"GitHub Owner: {config.github_repo_owner}")
        print(f"GitHub Repo: {config.github_repo_name}")
    except ValueError as e:
        print(e)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")