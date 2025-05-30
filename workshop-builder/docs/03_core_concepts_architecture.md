# 3. Core Concepts & System Architecture

Understanding the core concepts and architecture of Workshop Builder is key to using and extending it effectively. The system is built on the **OpenAI Codex Framework** principles for professional AI agent orchestration.

## Core Concepts

1.  **OpenAI Codex Framework Integration:** Workshop Builder is built from the ground up to leverage the OpenAI Codex Framework, providing advanced AI reasoning, professional output standards, and comprehensive error handling throughout the system.

2.  **Multi-Agent Orchestration:** Workshop Builder operates as a sophisticated system of specialized AI agents, each responsible for a distinct phase of the workshop creation pipeline. This modular design follows Codex framework best practices for agent coordination and communication.

3.  **Topic-Driven Generation with Deep Research:** The entire process is initiated by providing a single "topic" string. The system then conducts comprehensive research using Gemini Flash 2.5's deep research capabilities before generating structured workshop content.

4.  **Advanced AI-Powered Transformation:** A core principle is the transformation of extensive research data into highly structured, professional-grade educational content using OpenAI Codex CLI integration with sophisticated prompt engineering.

5.  **AGENTS.MD Guidance System:** The system implements comprehensive AGENTS.MD files throughout the codebase, providing project-specific AI guidance and review processes following Codex framework best practices.

6.  **Professional Template-Based Standardization:** All generated files follow enterprise-level standards using advanced Jinja2 templates with comprehensive metadata, validation, and professional formatting.

7.  **Automated Professional Git Workflow:** The system implements a sophisticated Git workflow with professional PR creation, comprehensive descriptions, proper labeling, and integration with existing workshop infrastructure.

8.  **Comprehensive Error Handling:** Robust error management with proper cascading, recovery mechanisms, and detailed logging throughout the entire pipeline.

## System Architecture Overview

The Workshop Builder follows a pipeline architecture where data flows sequentially through different agents.

```mermaid
graph LR
    A[User CLI Input: Topic] --> B(Orchestrator);
    B -- Manages Workflow & Config --> C{ResearchAgent};
    C -- Fetches Unstructured Data (Gemini) --> D[Raw Data Files];
    B --> E{CompilerAgent};
    D --> E;
    E -- Uses Codex via Prompt --> F[Structured Workshop Module Files];
    F -- Includes manifest.json & README.md (from Templates) --> F;
    B --> G{GitAgent};
    F --> G;
    G -- Creates Branch, Commits, Pushes (GitHub API) --> H[Pull Request on GitHub];
```

**Components:**

*   **CLI (`cli.py`):** The command-line interface that accepts user input and initializes the Codex framework-based orchestration system.

*   **Orchestrator (`orchestrator/orchestrator.py`):** The central Codex framework coordinator that manages the entire workflow with:
    - Professional logging and output formatting
    - Comprehensive error handling with cascading recovery
    - Agent coordination following Codex best practices
    - Integration with existing workshop infrastructure

*   **Configuration (`orchestrator/config.py`):** Advanced configuration management loading API keys, paths, and Codex framework settings from environment variables.

*   **Specialized AI Agents (`agents/`):**
    *   **`ResearchAgent`:** Advanced research engine with actual Gemini Flash 2.5 API integration:
        - Deep research capabilities with comprehensive data gathering
        - Professional error handling and API rate limiting
        - Structured data output with metadata tracking
        - Integration with Codex framework logging

    *   **`CompilerAgent`:** Professional content generation engine with OpenAI Codex CLI integration:
        - Actual OpenAI Codex CLI integration with fallback generation
        - AGENTS.MD support for project-specific guidance
        - Advanced workshop structure validation and error handling
        - Professional template rendering with comprehensive metadata
        - Sandboxed execution environment with proper cleanup

    *   **`GitAgent`:** Enterprise-level Git workflow automation:
        - Professional PR creation with comprehensive descriptions
        - Proper branch management and remote tracking
        - Integration with existing workshop structure validation
        - Comprehensive error handling for Git operations
        - Professional labeling and review guidance

*   **Codex Framework Integration:**
    *   **`workshop_compiler_agent_prompt.md`:** Comprehensive Codex framework prompt with professional standards, error handling guidance, and integration requirements
    *   **`AGENTS.MD` Support:** Project-specific AI guidance files throughout the system
    *   **Codex CLI Integration:** Direct integration with OpenAI Codex CLI for advanced reasoning

*   **Professional Templates (`templates/`):** Enterprise-level Jinja2 templates with comprehensive metadata, validation, and professional formatting standards.

## Detailed Workflow (Sequence Diagram)

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Orchestrator
    participant ResearchAgent
    participant CompilerAgent
    participant GitAgent
    participant GeminiAPI
    participant CodexAPI
    participant GitHubAPI

    User->>CLI: python cli.py --topic "My Topic"
    CLI->>Orchestrator: initialize(codex_framework_config)
    CLI->>Orchestrator: run_codex_workflow("My Topic")
    
    Note over Orchestrator: Codex Framework Initialization
    Orchestrator->>Orchestrator: Load AGENTS.MD guidance
    Orchestrator->>Orchestrator: Initialize professional logging
    
    Orchestrator->>ResearchAgent: initialize_with_codex_support(config)
    Orchestrator->>ResearchAgent: conduct_deep_research("My Topic")
    ResearchAgent->>GeminiFlash25API: Deep research query with advanced reasoning
    GeminiFlash25API-->>ResearchAgent: Comprehensive research corpus
    ResearchAgent->>ResearchAgent: Structure and validate research data
    ResearchAgent-->>Orchestrator: Professional research package with metadata
    
    Note over Orchestrator: Codex CLI Integration Phase
    Orchestrator->>CompilerAgent: initialize_with_codex_cli(config)
    Orchestrator->>CompilerAgent: compile_professional_workshop(topic, research_data)
    CompilerAgent->>CompilerAgent: Load AGENTS.MD guidance
    CompilerAgent->>CodexCLI: Execute with comprehensive prompt and research data
    CodexCLI-->>CompilerAgent: Professional workshop structure and content
    CompilerAgent->>CompilerAgent: Validate and render professional templates
    CompilerAgent->>CompilerAgent: Implement comprehensive error handling
    CompilerAgent-->>Orchestrator: Complete workshop module with validation report
    
    Note over Orchestrator: Professional Git Workflow
    Orchestrator->>GitAgent: initialize_professional_workflow(config)
    Orchestrator->>GitAgent: create_professional_pr(module_path, topic, metadata)
    GitAgent->>GitAgent: Validate integration with existing workshops
    GitAgent->>GitHubAPI: Create feature branch with proper naming
    GitAgent->>GitHubAPI: Commit with comprehensive descriptions
    GitAgent->>GitHubAPI: Push with proper tracking
    GitAgent->>GitHubAPI: Create professional PR with labels and review guidance
    GitHubAPI-->>GitAgent: Professional PR URL with metadata
    GitAgent-->>Orchestrator: Complete workflow report
    Orchestrator-->>CLI: Professional success report with PR details
    CLI-->>User: Display comprehensive results and PR information
```

## Agent Interaction Model

```mermaid
graph TD
    subgraph Orchestrator
        direction LR
        RA[ResearchAgent]
        CA[CompilerAgent]
        GA[GitAgent]
    end

    CLI_Input[CLI: Topic] --> Orchestrator
    Orchestrator --> RA
    RA -->|Unstructured Data Paths| CA
    CA -->|Generated Module Path| GA
    GA -->|PR URL| Orchestrator
    Orchestrator --> CLI_Output[CLI: Result]

    RA -.-> Gemini_Service[External: Gemini API]
    CA -.-> Codex_Service[External: Codex API/CLI]
    GA -.-> GitHub_Service[External: GitHub API]
```

This architecture is designed to be modular, allowing for future enhancements such as swapping AI models, adding new agents (e.g., a review agent), or supporting different output formats.

Next: [Usage Guide](./04_usage_guide.md)