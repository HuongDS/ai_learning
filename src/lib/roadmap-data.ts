export interface WeekData {
  week: number;
  month: number;
  monthTitle: string;
  title: string;
  tag: string;
  theory: string[];
  resources: string[];
  handsOn: string;
  deliverable: string;
  isMilestone?: boolean;
  milestoneTitle?: string;
}

export interface MonthOverview {
  month: number;
  weeks: string;
  title: string;
  focus: string;
  color: string;
  highlight: string;
}

export const MONTHS_OVERVIEW: MonthOverview[] = [
  {
    month: 1,
    weeks: "Tuần 1–4",
    title: "PYTHON VÀ DỮ LIỆU",
    focus: "Python căn bản, cấu trúc dữ liệu, OOP, logging, testing, NumPy và Pandas làm sạch dữ liệu.",
    color: "#dc5000",
    highlight: "Milestone: Todo CLI v3 (OOP + Tests) & Data Cleaning Notebook",
  },
  {
    month: 2,
    weeks: "Tuần 5–8",
    title: "MACHINE LEARNING VÀ DEEP LEARNING",
    focus: "Quy trình ML, metrics (P/R/F1), Neural Networks, autograd, PyTorch training workflow.",
    color: "#e67e22",
    highlight: "Milestone: ml-foundations (PyTorch Training & Evaluation Pipeline)",
  },
  {
    month: 3,
    weeks: "Tuần 9–12",
    title: "LLM VÀ TRANSFORMER",
    focus: "Tokenization (BPE), Embeddings, Self-attention (Q/K/V), Text generation & Sampling.",
    color: "#f39c12",
    highlight: "Milestone: Self-attention Scratch & Generation Playground",
  },
  {
    month: 4,
    weeks: "Tuần 13–20",
    title: "AI APPLICATION ENGINEERING VÀ RAG",
    focus: "FastAPI Backend, Structured output, Tool calling, Evals, Ingestion, PostgreSQL + pgvector, Citations & Abstention.",
    color: "#10b981",
    highlight: "Milestone: RAG API v1 hoàn chỉnh với Verifiable Citations & Evaluation Suite",
  },
  {
    month: 5,
    weeks: "Tuần 21–24",
    title: "AGENTS VÀ WORKFLOWS",
    focus: "Agent fundamentals, ReAct, LangGraph StateGraph, Checkpoint SQLite, Human-in-the-loop, MCP & Observability.",
    color: "#3b82f6",
    highlight: "Milestone: Agent Workflow với Human Approval & Tracing (Langfuse)",
  },
  {
    month: 6,
    weeks: "Tuần 25–26",
    title: "INFERENCE, DEPLOYMENT VÀ CAPSTONE",
    focus: "Inference optimization (vLLM/KV cache), Docker Compose, Secrets, Security & Hoàn thiện Capstone Platform.",
    color: "#8b5cf6",
    highlight: "Final Milestone: Intelligent Knowledge & Agent Assistant Platform",
  },
];

export const CITED_CORPUS = [
  {
    code: "Book - Chip Huyen",
    title: "AI Engineering: Building Applications with Foundation Models (2025)",
    author: "Chip Huyen (O'Reilly Media)",
    role: "Sách trục chính Tháng 2–6: Prompting, Evaluation, RAG, Agents, Serving & Architecture",
  },
  {
    code: "Book - Raschka",
    title: "Build a Large Language Model (From Scratch) - 2024",
    author: "Sebastian Raschka (Manning Publications)",
    role: "Bóc tách Transformer: Tokenizer, Attention, GPT architecture, Generation & LoRA",
  },
  {
    code: "Book - Prince (UDL)",
    title: "Understanding Deep Learning - 2023",
    author: "Simon J.D. Prince (The MIT Press)",
    role: "Nền tảng toán học trực quan về Neural Networks, Loss Functions, Gradients & Attention",
  },
  {
    code: "Book - Orshalick",
    title: "The Developer's Guide to AI - 2026",
    author: "Jacob Orshalick, Jerry M. Reghunadh, Danny Thompson (No Starch Press)",
    role: "Cầu nối Software Engineering: Vector DB, RAG, Autonomous Agents, Tools & MCP",
  },
  {
    code: "Book - Fabio Nelli",
    title: "Python Data Analytics",
    author: "Fabio Nelli (Apress / Springer)",
    role: "Khai thác thực tế mảng NumPy ndarray, vectorization, Pandas DataFrame & làm sạch dữ liệu",
  },
  {
    code: "Book - Antiga (PyTorch)",
    title: "Deep Learning with PyTorch, Second Edition - 2026",
    author: "Luca Antiga, Eli Stevens, Howard Huang, Thomas Viehmann (Manning)",
    role: "Cơ chế PyTorch chuyên sâu: Tensors, Autograd, Dataset, DataLoader & Optimization Loop",
  },
  {
    code: "Official Free Docs",
    title: "Python, PyTorch, Hugging Face, FastAPI, OpenAI, pgvector, LangGraph, Docker, OWASP",
    author: "Tài liệu chính thức miễn phí từ các tổ chức công nghệ",
    role: "Hướng dẫn API chuẩn, tutorials thực chiến và tiêu chuẩn bảo mật OWASP Top 10 for LLMs",
  },
];

export const CHECKLIST_ITEMS = [
  { area: "Cuối Tháng 1", skill: "Tự viết Python project có cấu trúc, file I/O, exception, tests; dùng NumPy/Pandas cơ bản", ready: true },
  { area: "Cuối Tháng 2", skill: "Giải thích train/val/test, overfitting, leakage, metrics; tự train/evaluate neural network nhỏ", ready: true },
  { area: "Cuối Tháng 3", skill: "Giải thích tokenization, embeddings, context window, Q/K/V, self-attention, causal mask, sampling", ready: true },
  { area: "Cuối Tháng 4", skill: "Xây LLM API, structured output, tool calling có giới hạn quyền, RAG citations & evaluation", ready: true },
  { area: "Cuối Tháng 5", skill: "Phân biệt workflow/agent; xây graph có state/checkpoint, approval, audit log, tracing", ready: true },
  { area: "Cuối Tháng 6", skill: "Capstone chạy được; RAG citations/abstention; tests, evaluation, Docker Compose & portfolio", ready: true },
];

export const CAPSTONE_SPECS = {
  title: "Intelligent Knowledge & Agent Assistant",
  description: "Ứng dụng AI full-stack chuẩn portfolio: Frontend React + TypeScript, Backend Python + FastAPI, PostgreSQL + pgvector, RAG có citations và Agent có Human-in-the-loop approval.",
  features: [
    "Frontend React + TypeScript; backend Python + FastAPI",
    "Tải PDF/TXT, trích xuất nội dung, chunk, embedding và lưu PostgreSQL + pgvector",
    "Hỏi đáp RAG với citations truy ngược được; khi thiếu bằng chứng phải từ chối (Abstention)",
    "Có lịch sử hội thoại và phân quyền dữ liệu (Multi-tenant isolation) theo người dùng",
    "Có agent workflow dùng ít nhất một tool chỉ đọc (tra cứu cơ sở tri thức)",
    "Hành động ghi / thay đổi dữ liệu bắt buộc cần Human Approval (Interrupt)",
    "Có evaluation dataset/report, unit/integration tests, logs, health check và Docker Compose"
  ]
};

export const WEEKS_DATA: WeekData[] = [
  // =========================================================================
  // THÁNG 1 — PYTHON VÀ DỮ LIỆU (TUẦN 1 – 4)
  // =========================================================================
  {
    week: 1,
    month: 1,
    monthTitle: "Tháng 1: Python và Dữ liệu",
    title: "Python căn bản và môi trường",
    tag: "Python Core & venv",
    theory: [
      "Python interpreter, script, module, package",
      "Cài đặt VS Code/PyCharm, venv, pip, requirements.txt",
      "Biến, kiểu dữ liệu, toán tử, ép kiểu, f-string",
      "Cấu trúc điều khiển: if/elif/else, for, while, range",
      "Đọc traceback và tìm nguyên nhân lỗi chính xác",
    ],
    resources: [
      "The Python Tutorial: “Using the Python Interpreter”, “Informal Intro”, “Control Flow”",
      "Python Packaging Guide: “Installing Packages”, “Virtual Environments”",
    ],
    handsOn: "Tạo repo python-foundations và virtual environment. Viết Todo CLI v1 hỗ trợ thêm, xem, hoàn thành, xóa công việc. Bắt lỗi đầu vào rỗng và lựa chọn sai.",
    deliverable: "Todo CLI v1 + README hướng dẫn cài đặt/chạy + repository có cấu trúc sạch",
  },
  {
    week: 2,
    month: 1,
    monthTitle: "Tháng 1: Python và Dữ liệu",
    title: "Cấu trúc dữ liệu, hàm, file và exception",
    tag: "Data Structures & I/O",
    theory: [
      "list, tuple, dict, set; mutable/immutable; slicing và comprehension",
      "Hàm, tham số mặc định, *args, **kwargs, return",
      "Module, scope, exception handling (try/except/finally)",
      "Đọc/ghi file, JSON, CSV",
      "Type hints cơ bản (typing module)",
    ],
    resources: [
      "The Python Tutorial: “Data Structures”, “Modules”, “Input and Output”, “Errors and Exceptions”",
      "Python Documentation: “Typing”",
    ],
    handsOn: "Refactor Todo CLI thành các hàm/module. Lưu dữ liệu bằng JSON; thêm import/export CSV. Xử lý file không tồn tại, JSON lỗi, dữ liệu thiếu trường. Viết ít nhất 5 test cases cho tình huống biên.",
    deliverable: "Todo CLI v2 có JSON persistence, CSV import/export, module hóa và type hints",
  },
  {
    week: 3,
    month: 1,
    monthTitle: "Tháng 1: Python và Dữ liệu",
    title: "OOP, logging và testing",
    tag: "OOP & Unit Testing",
    isMilestone: true,
    milestoneTitle: "Milestone 1: Production-grade Todo CLI v3 (OOP + Tests)",
    theory: [
      "Class/object, attributes, methods, constructor",
      "Encapsulation, composition, inheritance; ưu tiên composition khi phù hợp",
      "dataclass, context manager (with open)",
      "Tách biệt Business Logic khỏi CLI presentation",
      "Logging levels (DEBUG, INFO, WARNING, ERROR), exception logging",
      "Unit test, assertion, test fixture với unittest",
    ],
    resources: [
      "The Python Tutorial: “Classes”",
      "Python Documentation: dataclasses — “Data Classes”; unittest — “Basic example”, “Organizing test code”",
    ],
    handsOn: "Thiết kế Task, TaskRepository, TodoService. Tách phần lưu dữ liệu khỏi nghiệp vụ. Viết unit tests cho TodoService. Thêm logging chuẩn và vẽ class diagram.",
    deliverable: "Todo CLI v3 có OOP, logging, unit tests bao phủ edge cases và README giải thích class",
  },
  {
    week: 4,
    month: 1,
    monthTitle: "Tháng 1: Python và Dữ liệu",
    title: "NumPy, Pandas và làm sạch dữ liệu",
    tag: "NumPy & Pandas",
    theory: [
      "NumPy ndarray, shape, dtype, axis, slicing",
      "Vectorization và broadcasting cơ bản",
      "Pandas Series, DataFrame, đọc CSV, lọc, group, aggregation",
      "Xử lý missing values, duplicate rows, kiểu dữ liệu sai",
      "Thống kê mô tả (mean, median, std) và biểu đồ đơn giản",
    ],
    resources: [
      "NumPy: “Quickstart tutorial”",
      "pandas: “Getting started tutorials”",
      "Fabio Nelli, Python Data Analytics: “The NumPy Library”, “The pandas Library”, “Reading & Writing Data”",
    ],
    handsOn: "Chọn một CSV công khai sạch. Kiểm tra kiểu dữ liệu, missing values, duplicates và outliers. Làm sạch, lưu CSV mới và tạo 3–5 thống kê/biểu đồ.",
    deliverable: "data-cleaning.ipynb + CSV đã làm sạch + Báo cáo mô tả dữ liệu",
  },

  // =========================================================================
  // THÁNG 2 — MACHINE LEARNING VÀ DEEP LEARNING (TUẦN 5 – 8)
  // =========================================================================
  {
    week: 5,
    month: 2,
    monthTitle: "Tháng 2: Machine Learning và Deep Learning",
    title: "Bản đồ AI/ML và quy trình ML",
    tag: "ML Lifecycle & Splits",
    theory: [
      "Phân biệt rành mạch: AI, ML, DL, Generative AI; Supervised vs Unsupervised vs RL",
      "Dataset, sample, feature, label, model, parameter",
      "Train/validation/test split; Training vs Inference",
      "Hiện tượng Overfitting, Underfitting và Data Leakage",
      "ML lifecycle: bài toán -> dữ liệu -> baseline -> train -> evaluate",
    ],
    resources: [
      "Google Machine Learning Crash Course: “Introduction to ML”, “Datasets”, “Training and Test Sets”",
      "Chip Huyen, AI Engineering, Ch. 1 — “Introduction to Building AI Applications with Foundation Models”",
    ],
    handsOn: "Chọn dataset nhỏ và xác định bài toán classification/regression. Xác định features, label, cách chia dữ liệu. Vẽ sơ đồ ML pipeline và giải thích data leakage.",
    deliverable: "Notebook mô tả dataset + Sơ đồ ML pipeline + ml-notes.md",
  },
  {
    week: 6,
    month: 2,
    monthTitle: "Tháng 2: Machine Learning và Deep Learning",
    title: "Regression, classification và metrics",
    tag: "Classification & Metrics",
    theory: [
      "Linear regression, logistic regression ở mức trực giác",
      "Classification threshold, confusion matrix (TP/FP/TN/FN)",
      "Accuracy, precision, recall, F1; MAE, MSE, RMSE",
      "Baseline, class imbalance và error analysis",
    ],
    resources: [
      "Google Machine Learning Crash Course: “Linear Regression”, “Logistic Regression”, “Classification”",
      "scikit-learn User Guide: “Supervised learning”, “Model evaluation”",
    ],
    handsOn: "Huấn luyện classifier bằng scikit-learn. Tính confusion matrix, precision, recall, F1. Thử thay đổi threshold, xem các dự đoán sai và phân tích nguyên nhân.",
    deliverable: "classification-baseline.ipynb + Bảng metrics chi tiết + Báo cáo phân tích lỗi",
  },
  {
    week: 7,
    month: 2,
    monthTitle: "Tháng 2: Machine Learning và Deep Learning",
    title: "Neural network, loss và gradient descent",
    tag: "Neural Nets & Autograd",
    theory: [
      "Neuron, weight, bias, layer; forward pass",
      "Hàm kích hoạt: ReLU, sigmoid, softmax",
      "Loss function, gradient, chain rule, backpropagation (trực giác)",
      "Gradient descent, learning rate, epoch, batch size, optimizer",
      "Regularization và chống Overfitting",
    ],
    resources: [
      "Google Machine Learning Crash Course: “Neural Networks”",
      "PyTorch Tutorials: “Tensors”, “Build the Neural Network”, “Autograd”",
      "Simon J. D. Prince, Understanding Deep Learning, Ch. 1–5 (neural networks và optimization)",
    ],
    handsOn: "Tạo tensor và neural network nhỏ bằng PyTorch. Chạy forward pass, tính loss, gọi autograd backward(). Huấn luyện vài epoch và vẽ loss curve.",
    deliverable: "first-neural-network.ipynb + Biểu đồ loss + Ghi chú forward/loss/backward/optimizer",
  },
  {
    week: 8,
    month: 2,
    monthTitle: "Tháng 2: Machine Learning và Deep Learning",
    title: "PyTorch training workflow",
    tag: "PyTorch Pipeline",
    isMilestone: true,
    milestoneTitle: "Milestone 2: Reproducible PyTorch ML Foundations Suite",
    theory: [
      "Tensor shape, dtype, device (CPU vs CUDA)",
      "Dataset, DataLoader, nn.Module",
      "Loss, optimizer, training/evaluation loop",
      "model.train(), model.eval(), state_dict",
      "Tách bạch data/model/training/evaluation chuẩn kỹ thuật",
    ],
    resources: [
      "PyTorch “Learn the Basics”: “Datasets & DataLoaders”, “Build Neural Net”, “Optimization Loop”, “Save and Load”",
      "Luca Antiga et al., Deep Learning with PyTorch, Second Edition, Ch. 1–6",
    ],
    handsOn: "Chọn dataset nhỏ. Viết pipeline train/evaluate chuẩn chỉnh. Lưu checkpoint, nạp lại và chạy inference. Ghi metrics và thời gian chạy (không cần tối ưu GPU).",
    deliverable: "Repository ml-foundations + Pipeline chạy lại được (reproducible) + README",
  },

  // =========================================================================
  // THÁNG 3 — LLM VÀ TRANSFORMER (TUẦN 9 – 12)
  // =========================================================================
  {
    week: 9,
    month: 3,
    monthTitle: "Tháng 3: LLM và Transformer",
    title: "LLM, tokenization và next-token prediction",
    tag: "Tokenizer & Next-Token",
    theory: [
      "LLM thuần túy và hệ thống ứng dụng LLM khác nhau",
      "Token, token ID, vocabulary, tokenizer, subword/BPE",
      "Context window, prompt, completion",
      "Autoregressive generation và next-token prediction",
      "Token không tương đương một từ; tiếng Việt/Anh token hóa khác nhau",
    ],
    resources: [
      "Hugging Face LLM Course: Ch. 1 — “Introduction to Transformers” & tokenizer docs",
      "Chip Huyen, AI Engineering, Ch. 2 — “Understanding Foundation Models”",
      "Hugging Face Tokenizers: “Quick tour”",
    ],
    handsOn: "Tokenize 10 câu tiếng Việt và tiếng Anh. So sánh số từ, ký tự và token. Thử thay dấu câu/khoảng trắng; tự viết tokenizer tách từ đơn giản.",
    deliverable: "tokenization-experiments.ipynb + Bảng so sánh + Ghi chú token budget",
  },
  {
    week: 10,
    month: 3,
    monthTitle: "Tháng 3: LLM và Transformer",
    title: "Embeddings và semantic search",
    tag: "Embeddings & Vectors",
    theory: [
      "Embedding vector; embedding model khác generative LLM",
      "Semantic vs lexical similarity",
      "Cosine similarity, dot product, Euclidean distance",
      "Vector dimension, semantic search và giới hạn của similarity",
    ],
    resources: [
      "Google Machine Learning Crash Course: “Embeddings”",
      "Chip Huyen, AI Engineering, Ch. 2 — “Understanding Foundation Models”",
      "Sentence Transformers: “Semantic Search”",
    ],
    handsOn: "Tạo embedding cho 10–20 câu. Tính cosine similarity. Nhập query, xếp hạng câu gần nghĩa. Tạo ví dụ câu bẫy dễ nhầm để phân tích lỗi.",
    deliverable: "embedding-search.ipynb + Demo semantic search + Ghi chú so sánh keyword vs vector",
  },
  {
    week: 11,
    month: 3,
    monthTitle: "Tháng 3: LLM và Transformer",
    title: "Transformer và self-attention",
    tag: "Self-Attention (Q/K/V)",
    theory: [
      "Token embedding, positional information",
      "Query/Key/Value; scaled dot-product attention",
      "Causal mask, multi-head attention",
      "Residual connection, LayerNorm",
      "Encoder, decoder, decoder-only Transformer",
    ],
    resources: [
      "Vaswani et al., “Attention Is All You Need” (2017): §3.1, §3.2, §3.5",
      "Sebastian Raschka, Build a Large Language Model (From Scratch): text data, attention, GPT",
      "Simon J. D. Prince, Understanding Deep Learning: phần attention/Transformers",
    ],
    handsOn: "Tạo Q/K/V từ tensor nhỏ. Tính attention scores và softmax bằng PyTorch. Tạo causal mask và so sánh kết quả có/không có mask. Vẽ sơ đồ self-attention.",
    deliverable: "self-attention.ipynb + Sơ đồ Transformer + Giải thích toán học Q/K/V",
  },
  {
    week: 12,
    month: 3,
    monthTitle: "Tháng 3: LLM và Transformer",
    title: "Text generation và sampling",
    tag: "Sampling & Generation",
    isMilestone: true,
    milestoneTitle: "Milestone 3: Text Generation Playground & Transformer Deconstruction",
    theory: [
      "Logits, softmax, greedy decoding",
      "Temperature, top-k, top-p",
      "Autoregressive generation; deterministic vs stochastic",
      "Vì sao cùng prompt có thể cho output khác; giới hạn đánh giá bằng cảm nhận",
    ],
    resources: [
      "Sebastian Raschka, Build a Large Language Model (From Scratch): generating text & sampling",
      "Hugging Face LLM Course: phần Transformer & generation",
      "Stanford CS336: Language Modeling from Scratch (tài liệu nâng cao, đọc chọn lọc)",
    ],
    handsOn: "Gọi model/API để sinh văn bản. Thử temperature (0 vs 0.7 vs 1.5) và giới hạn output. So sánh greedy vs sampling. Lưu prompt, tham số, output để phân tích.",
    deliverable: "generation-playground + Bảng so sánh cấu hình + Ghi chú tính tất định",
  },

  // =========================================================================
  // THÁNG 4 — AI APPLICATION ENGINEERING VÀ RAG (TUẦN 13 – 20)
  // =========================================================================
  {
    week: 13,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "Tích hợp LLM API với backend",
    tag: "FastAPI & LLM Adapter",
    theory: [
      "HTTP request/response, JSON, REST",
      "API key, environment variables, secrets management",
      "Model, input/output, token usage, request ID",
      "Timeout, retry, rate limit, error handling, streaming SSE",
      "Provider adapter; tách route/controller, service và data access",
    ],
    resources: [
      "OpenAI API Docs: “Text generation”",
      "FastAPI Tutorial: “First Steps”, “Path Parameters”, “Query Parameters”, “Request Body”",
      "Chip Huyen, AI Engineering, Ch. 1 — “Application Architecture”",
    ],
    handsOn: "Tạo FastAPI project với /health và /chat. Đọc API key từ environment variable. Tạo LLMService/provider adapter. Mock provider trong unit tests.",
    deliverable: "Repository llm-api-service + Backend FastAPI chạy được, xử lý lỗi + README",
  },
  {
    week: 14,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "Prompt engineering và structured output",
    tag: "Structured Outputs & Pydantic",
    theory: [
      "System/developer/user instructions theo API",
      "Zero-shot, few-shot, context, constraints, examples",
      "Prompt template/versioning",
      "Structured output, JSON Schema, Pydantic",
      "Backend validation; không mặc định tin output model",
      "Prompt injection ở mức khái niệm",
    ],
    resources: [
      "OpenAI API Docs: “Structured Outputs”, “Text generation”",
      "Chip Huyen, AI Engineering, Ch. 5 — “Prompt Engineering”; Ch. 3–4 về evaluation",
    ],
    handsOn: "Xây endpoint trích xuất thông tin thành JSON. Định nghĩa schema bằng Pydantic. Kiểm tra thiếu trường, sai kiểu, output không hợp lệ. Tạo 15–20 test inputs bình thường/mơ hồ. Quản lý prompt theo version.",
    deliverable: "Endpoint structured extraction + Pydantic schema + Tests và báo cáo lỗi",
  },
  {
    week: 15,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "Tool calling và giới hạn quyền",
    tag: "Tool Calling & Security",
    theory: [
      "Function/tool calling; model đề xuất gọi, backend xác thực và thực thi",
      "Tool schema: tên, mô tả, tham số, kiểu dữ liệu",
      "Input validation, authorization, least privilege",
      "Read-only vs write tools; idempotency; audit log",
      "Hành động ảnh hưởng dữ liệu cần phê duyệt thích hợp",
    ],
    resources: [
      "OpenAI API Docs: “Function calling”",
      "Chip Huyen, AI Engineering, Ch. 6 — “RAG and Agents”",
      "OWASP Top 10 for LLM Applications: prompt injection, excessive agency",
    ],
    handsOn: "Tạo tool search_documents và get_profile chỉ đọc. Tạo write action giả lập ở trạng thái pending. Chỉ chuyển pending sang approved sau xác nhận người dùng. Ghi log tool, input đã lọc, trạng thái và kết quả.",
    deliverable: "Tool-calling demo + Bảng audit log chi tiết + Sequence diagram",
  },
  {
    week: 16,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "Đánh giá ứng dụng LLM",
    tag: "LLM Evaluation Suite",
    theory: [
      "Vì sao không thể test LLM bằng một output mẫu",
      "Golden dataset; correctness, relevance, completeness, groundedness, instruction following",
      "Human evaluation, deterministic checks, model-based evaluation (LLM-as-a-judge) & hạn chế",
      "Regression test khi đổi prompt/model",
      "Latency, token usage và cost",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 3 — “Evaluation Methodology”; Ch. 4 — “Evaluate AI Systems”",
      "Google ML Crash Course: “Production ML Systems”",
    ],
    handsOn: "Tạo 20–30 câu hỏi và output kỳ vọng. Viết script chạy test tự động. Tự động hóa các tiêu chí kiểm tra tất định; đánh dấu phần cần người đánh giá. Xuất pass/fail và latency.",
    deliverable: "evaluation_dataset.jsonl + Evaluation script tự động + Baseline report",
  },
  {
    week: 17,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "RAG ingestion và chunking",
    tag: "RAG Ingestion & Chunking",
    theory: [
      "RAG pipeline: upload -> parse -> normalize -> chunk -> embed -> store",
      "PDF text extraction và giới hạn",
      "Chunk size, overlap và tác động retrieval",
      "Metadata: document ID, page, chunk ID, owner/user ID",
      "Quyền truy cập phải được áp dụng ngay lúc retrieval",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 6 — “RAG and Agents”",
      "LangChain docs: tutorials “Retrieval” và “RAG”",
      "PostgreSQL docs: tables, indexes, queries",
    ],
    handsOn: "Chuẩn bị 5–10 PDF/TXT không nhạy cảm. Viết parser và chunker có cấu hình. Lưu chunk cùng metadata. Kiểm tra thủ công 20 chunks để phát hiện cắt câu/mất ngữ cảnh.",
    deliverable: "Ingestion script + chunks.jsonl + Ghi chú so sánh chunk size/overlap",
  },
  {
    week: 18,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "PostgreSQL và pgvector",
    tag: "PostgreSQL & pgvector",
    theory: [
      "Embedding dimension; PostgreSQL table, PK/FK, index",
      "pgvector vector type và distance operators (Cosine <=>, L2)",
      "Exact search vs approximate nearest neighbor (HNSW/IVFFlat)",
      "Top-k, metadata filtering",
      "Quyền sở hữu tài liệu và lọc dữ liệu đa người dùng (Multi-tenant isolation)",
    ],
    resources: [
      "pgvector README: “Getting Started”, “Querying”, “Indexing”, “Filtering”",
      "PostgreSQL docs: “Data Definition”, “Indexes”, “Queries”",
      "Chip Huyen, AI Engineering, Ch. 6 — “Vector Databases”",
    ],
    handsOn: "Tạo bảng documents/chunks với extension pgvector. Tạo embedding và lưu vector. Viết retrieve(query, top_k, user_id). Test user A không thể truy xuất tài liệu user B.",
    deliverable: "DB schema DDL + Semantic retrieval service + Tests quyền truy cập multi-tenant",
  },
  {
    week: 19,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "RAG answer, citations và abstention",
    tag: "RAG Citations & Abstention",
    theory: [
      "Retrieval -> context assembly -> generation",
      "Prompt dựa trên nguồn; mapping chunk về document/page/source ID",
      "Citation phải trỏ nguồn thật, không để model tự tạo nguồn",
      "Groundedness, faithfulness, từ chối trả lời (abstention) khi thiếu bằng chứng",
      "Prompt injection bên trong tài liệu",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 6 — “Context Assembly & Groundedness”",
      "OpenAI API Docs: “Text generation”",
      "OWASP Top 10 for LLM Applications: prompt injection/output handling",
    ],
    handsOn: "Xây /ask, retrieve top-k chunks. Đưa context/source IDs vào prompt. Backend xác minh citation thuộc context. Test câu có bằng chứng và câu không có bằng chứng (buộc abstention).",
    deliverable: "RAG API v1 + Citations truy ngược được + Bộ test từ chối trả lời (Abstention)",
  },
  {
    week: 20,
    month: 4,
    monthTitle: "Tháng 4: AI Application Engineering và RAG",
    title: "Đánh giá và tối ưu RAG",
    tag: "RAG Optimization & Benchmark",
    isMilestone: true,
    milestoneTitle: "Milestone 4: Production Enterprise RAG Engine with Verifiable Citations",
    theory: [
      "Retrieval quality vs answer quality",
      "Recall@k, Precision@k, MRR",
      "Correctness, relevance, faithfulness (RAG Triad)",
      "Chunk size, overlap, top-k, metadata filter",
      "Keyword, vector, hybrid search và reranking",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 3–4 và Ch. 6",
      "Sentence Transformers: “Semantic Search & Cross-Encoders”",
      "pgvector README: indexing/query performance",
    ],
    handsOn: "Tạo 25–40 câu hỏi có đáp án và nguồn tham chiếu. Đánh giá retrieval riêng và answer riêng. So sánh ít nhất hai cấu hình chunking/top-k. Phân tích retrieval sai và chọn cấu hình theo số liệu.",
    deliverable: "RAG v1 hoàn chỉnh + Evaluation dataset + Báo cáo so sánh tối ưu hóa theo số liệu",
  },

  // =========================================================================
  // THÁNG 5 — AGENTS VÀ WORKFLOWS (TUẦN 21 – 24)
  // =========================================================================
  {
    week: 21,
    month: 5,
    monthTitle: "Tháng 5: Agents và Workflows",
    title: "Agent fundamentals",
    tag: "Agent Fundamentals & ReAct",
    theory: [
      "LLM call, deterministic workflow và agent khác nhau",
      "Tool use, planning, state, stop condition",
      "ReAct ở mức khái niệm (Thought -> Action -> Observation)",
      "Failure modes: tool sai, lặp vô hạn, thiếu dữ liệu",
      "Khi nào không nên dùng agent; workflow cố định thường dễ kiểm soát hơn",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 6 — “Agents and Tools”",
      "Hugging Face AI Agents Course: phần introduction & tools",
      "Jacob Orshalick et al., The Developer’s Guide to AI (2026), Ch. 12 — “From Workflows to Autonomous Agents”",
    ],
    handsOn: "Thiết kế classify -> retrieve -> answer. Xây deterministic workflow trước. Thêm bước LLM chọn giữa các tool chỉ đọc. Giới hạn số bước và điều kiện dừng.",
    deliverable: "Agent design document + Workflow graph + Demo có giới hạn bước chạy",
  },
  {
    week: 22,
    month: 5,
    monthTitle: "Tháng 5: Agents và Workflows",
    title: "LangGraph, state và checkpoint",
    tag: "LangGraph State & Checkpoint",
    theory: [
      "Graph, node, edge, conditional edge trong LangGraph",
      "State schema, reducer",
      "Checkpoint, thread/session, persistence SQLite",
      "Khôi phục workflow và tách business logic khỏi framework",
    ],
    resources: [
      "LangGraph docs: “Overview”, “Graph API”, “Persistence”",
      "Chip Huyen, AI Engineering, Ch. 10 — “AI Engineering Architecture and User Feedback”",
    ],
    handsOn: "Chuyển workflow tuần 21 thành LangGraph graph. State gồm question, retrieved documents, tool results, final answer. Thêm checkpoint và tiếp tục một thread. Test các nhánh điều kiện và lỗi.",
    deliverable: "agent-workflow repo + Graph có state/checkpoint SQLite + Unit tests",
  },
  {
    week: 23,
    month: 5,
    monthTitle: "Tháng 5: Agents và Workflows",
    title: "Human-in-the-loop và MCP",
    tag: "HITL Interrupt & MCP",
    theory: [
      "Interrupt, approve, reject, resume",
      "Tool contract và validation",
      "Model Context Protocol (MCP) host/client/server; tools, resources, prompts",
      "MCP là giao thức kết nối, không phải agent framework",
      "Least privilege, authentication, audit log",
    ],
    resources: [
      "LangGraph docs: “Interrupts” / human-in-the-loop",
      "Model Context Protocol: “Introduction”, “Architecture”",
      "The Developer’s Guide to AI, Ch. 14 — “Extending Agents with Tools” (MCP concepts/server)",
      "OWASP: excessive agency và prompt injection",
    ],
    handsOn: "Tạo tool đọc dữ liệu giả lập. Tạo write action pending. Thêm interrupt để người dùng approve/reject. Chỉ tiếp tục khi có quyết định hợp lệ. Xây MCP server nhỏ cung cấp tool đọc.",
    deliverable: "Agent có approval + Bảng audit log chi tiết + Demo MCP Server độc lập",
  },
  {
    week: 24,
    month: 5,
    monthTitle: "Tháng 5: Agents và Workflows",
    title: "Agent evaluation, reliability và observability",
    tag: "Agent Reliability & Tracing",
    isMilestone: true,
    milestoneTitle: "Milestone 5: Production Agentic Workflow with Human-in-the-Loop & Tracing",
    theory: [
      "Task success rate, tool-call accuracy",
      "Đánh giá toàn bộ task thay vì chỉ câu trả lời văn bản",
      "Trace, span, log (OpenTelemetry / Langfuse)",
      "Retry, timeout, idempotency, fallback, circuit breaker",
      "Giới hạn vòng lặp/tool calls; phát hiện tool failure",
      "Latency, token usage, cost; test prompt injection trong agent",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 4, 6, 10",
      "LangSmith / Langfuse docs: “Evaluation Concepts”",
      "OpenTelemetry docs: “Observability Primer”",
      "OWASP Top 10 for LLM Applications",
    ],
    handsOn: "Tạo 15–20 task đại diện. Đo task success, tool calls, latency, lỗi. Thêm trace/log cho node và tool. Test timeout, tool error, max steps. Viết báo cáo reliability.",
    deliverable: "Agent evaluation dataset/script + Reliability report + Trace/log hệ thống",
  },

  // =========================================================================
  // THÁNG 6 — INFERENCE, DEPLOYMENT VÀ CAPSTONE (TUẦN 25 – 26)
  // =========================================================================
  {
    week: 25,
    month: 6,
    monthTitle: "Tháng 6: Inference, Deployment và Capstone",
    title: "Inference, hiệu năng và chi phí",
    tag: "Inference & Serving (vLLM)",
    theory: [
      "Training vs inference; prefill/decode",
      "KV cache, context length và áp lực VRAM",
      "FP32, FP16, BF16, INT8, INT4; quantization trade-offs",
      "TTFT, inter-token latency, throughput (tokens/s)",
      "Batching, caching, streaming SSE",
      "API vs self-hosted; vai trò serving engine như vLLM",
    ],
    resources: [
      "Chip Huyen, AI Engineering, Ch. 9 — “Inference Optimization”",
      "vLLM docs: “Getting Started” và serving overview",
      "Stanford CS336 là tài liệu nâng cao, chỉ đọc chọn lọc",
    ],
    handsOn: "Gửi request với prompt có độ dài khác nhau. Đo latency và token usage. Thử streaming. So sánh prompt ngắn/dài. Viết ADR: vì sao capstone dùng API hay self-hosted.",
    deliverable: "inference-benchmark + Bảng latency/token usage + Tài liệu kiến trúc ADR",
  },
  {
    week: 26,
    month: 6,
    monthTitle: "Tháng 6: Inference, Deployment và Capstone",
    title: "Deployment, security và hoàn thiện capstone",
    tag: "Capstone Deployment & Portfolio",
    isMilestone: true,
    milestoneTitle: "Final Graduation: Intelligent Knowledge & Agent Assistant Platform",
    theory: [
      "Docker image/container/volume/network; Docker Compose",
      "Environment config, secrets, migrations",
      "Authentication/authorization",
      "Input validation, rate limit, upload limits",
      "Logging, health check, error handling toàn cục",
      "Unit/integration tests và evaluation regression",
      "README, architecture diagram, demo video chuẩn portfolio",
    ],
    resources: [
      "FastAPI Tutorial: “Bigger Applications”, “Testing” và deployment",
      "Docker docs: “Get Started” & Docker Compose Guide",
      "PostgreSQL docs: backup/restore và database basics",
      "Chip Huyen, AI Engineering, Ch. 10",
    ],
    handsOn: "Hoàn thiện React + TypeScript frontend. Hoàn thiện FastAPI, RAG và agent workflow. Đóng gói backend/database bằng Docker Compose. Viết unit/integration tests. Chạy evaluation dataset và lưu kết quả. Viết README, architecture diagram, demo. Kiểm tra không commit API key hoặc dữ liệu cá nhân.",
    deliverable: "Capstone chạy theo hướng dẫn: Docker Compose, .env.example, README, architecture diagram, test report và demo video ngắn",
  },
];
