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
    title: "PYTHON FOR AI & NỀN TẢNG DỮ LIỆU",
    focus: "Chuyển dịch tư duy lập trình sang hệ sinh thái Python, Pydantic V2, NumPy & Pandas.",
    color: "#dc5000",
    highlight: "Milestone: Linear Algebra & Data Benchmarking Suite",
  },
  {
    month: 2,
    weeks: "Tuần 5–8",
    title: "AI & MACHINE LEARNING FUNDAMENTALS",
    focus: "Bản chất toán học (Loss, Gradient, Backpropagation), PyTorch MLP & Phần cứng AI vừa đủ.",
    color: "#e67e22",
    highlight: "Milestone: PyTorch Classifier & GPU Hardware Inspector",
  },
  {
    month: 3,
    weeks: "Tuần 9–13",
    title: "LLMS & KIẾN TRÚC TRANSFORMER",
    focus: "Bóc tách Transformer từ số 0 (Tokenizer BPE, Attention, Embeddings) & Structured Outputs.",
    color: "#f39c12",
    highlight: "Milestone: Mini GPT from Scratch & Structured JSON API",
  },
  {
    month: 4,
    weeks: "Tuần 14–17",
    title: "PRODUCTION RAG SYSTEMS",
    focus: "Hệ thống RAG công nghiệp: pgvector, Hybrid Search (Vector + BM25), Re-ranking, Evaluation.",
    color: "#10b981",
    highlight: "Milestone: End-to-End Enterprise RAG with Citations & Evals",
  },
  {
    month: 5,
    weeks: "Tuần 18–22",
    title: "AI AGENTS, WORKFLOWS & MCP",
    focus: "Tác tử tự trị ReAct, LangGraph StateGraph, Human-in-the-Loop & Model Context Protocol (MCP).",
    color: "#3b82f6",
    highlight: "Milestone: Autonomous Multi-Agent Swarm & Custom MCP Server",
  },
  {
    month: 6,
    weeks: "Tuần 23–26",
    title: "SERVING, DEPLOYMENT & CAPSTONE PLATFORM",
    focus: "Tối ưu hóa vLLM, Langfuse Tracing, Docker Sandbox & Hoàn thành Nền tảng Capstone Platform.",
    color: "#8b5cf6",
    highlight: "Milestone: Full-Stack AI Knowledge & Agentic Platform",
  },
];

export const CITED_CORPUS = [
  {
    code: "UMich - PY4E",
    title: "Programming for Everybody (Getting Started with Python)",
    author: "Charles Severance (University of Michigan)",
    role: "Nền tảng cú pháp và cấu trúc dữ liệu Python",
  },
  {
    code: "DL-AI - AndrewNg",
    title: "Generative AI for Everyone & Machine Learning Specialization",
    author: "Andrew Ng (DeepLearning.AI + Stanford)",
    role: "Trực giác hình học toán học và nền tảng ML/DL",
  },
  {
    code: "MS - GenAI Beginners",
    title: "Generative AI for Beginners (21 Lessons)",
    author: "Microsoft GitHub Open Source",
    role: "Ứng dụng Generative AI & Embeddings thực chiến",
  },
  {
    code: "HF - Courses",
    title: "Hugging Face NLP & AI Agents Courses",
    author: "Hugging Face Team",
    role: "Hệ sinh thái Transformers, Tokenizers và ReAct Agents",
  },
  {
    code: "Book - Raschka",
    title: "Build a Large Language Model (From Scratch) - 2024",
    author: "Sebastian Raschka (Manning)",
    role: "Tự code kiến trúc Transformer, Tokenizer và Attention từ con số 0",
  },
  {
    code: "Book - Prince (UDL)",
    title: "Understanding Deep Learning - 2023",
    author: "Simon J.D. Prince (The MIT Press)",
    role: "Lý thuyết toán học sâu sắc về Attention và Deep Learning",
  },
  {
    code: "Book - Chip Huyen",
    title: "AI Engineering: Building Applications with Foundation Models - 2025",
    author: "Chip Huyen (O'Reilly Media)",
    role: "Kim chỉ nam kỹ thuật: RAG, Fine-tuning, Hardware, Serving & Evals",
  },
  {
    code: "Book - Kirk & Hwu",
    title: "Programming Massively Parallel Processors (PMPP) 4th Ed",
    author: "David Kirk & Wen-mei Hwu",
    role: "Hiểu phần cứng GPU, VRAM và kiến trúc tính toán song song",
  },
  {
    code: "UCB - Agents",
    title: "CS 294: Large Language Model Agents",
    author: "Dawn Song, Ion Stoica (UC Berkeley RDI)",
    role: "Kiến trúc Multi-Agent Swarms, Tool Use và quy trình tự trị",
  },
];

export const CHECKLIST_ITEMS = [
  { area: "Python Core", skill: "Cú pháp, OOP, Type Hinting, Pydantic V2 validation", ready: true },
  { area: "Data & Math", skill: "Thao tác ma trận, vector, tích vô hướng, Loss & Gradient", ready: true },
  { area: "Deep Learning", skill: "Kiến trúc Neural Network, Backpropagation, Overfitting/Underfitting", ready: true },
  { area: "Transformer", skill: "Tokenization (BPE), Embeddings, Self-Attention, Decoding", ready: true },
  { area: "LLM Integration", skill: "Prompt Engineering, Structured Outputs, JSON enforcement", ready: true },
  { area: "RAG Systems", skill: "Ingestion, pgvector, Hybrid Search (Vector + BM25), Evals", ready: true },
  { area: "AI Agents", skill: "Vòng lặp ReAct, LangGraph StateGraph, Tool Calling an toàn", ready: true },
  { area: "Human-in-the-Loop", skill: "Điểm dừng phê duyệt interrupt() và SQLite Checkpointer", ready: true },
  { area: "Architecture", skill: "Phân định RAG vs Fine-tuning; API vs Self-hosted Model", ready: true },
  { area: "Production", skill: "Đóng gói Docker, Langfuse Tracing, phòng vệ Prompt Injection", ready: true },
];

export const WEEKS_DATA: WeekData[] = [
  // Tháng 1
  {
    week: 1,
    month: 1,
    monthTitle: "Tháng 1: Python for AI & Nền tảng Dữ liệu",
    title: "Cú pháp Python Nền tảng cho Software Engineer",
    tag: "Python Core",
    theory: [
      "Hiểu cơ chế thông dịch (bytecode & GIL), dynamic typing vs static typing",
      "Thiết lập môi trường: Python 3.11+, Virtual Environments (venv), pip",
      "Cú pháp cốt lõi: if/else, for/while, hàm (def, *args, **kwargs), lambda functions",
    ],
    resources: ["[UMich - PY4E] Chương 1 - 5", "Python Official Tutorial"],
    handsOn: "Viết script tự động chuẩn hóa chuỗi văn bản (lowercase, lọc ký tự đặc biệt, thống kê tần suất từ).",
    deliverable: "text_cleaner.py: CLI script chuẩn hóa văn bản và thống kê tần suất từ",
  },
  {
    week: 2,
    month: 1,
    monthTitle: "Tháng 1: Python for AI & Nền tảng Dữ liệu",
    title: "Cấu trúc Dữ liệu Nâng cao, OOP & Exception Handling",
    tag: "OOP & Error Handling",
    theory: [
      "Collections: list, dict, set, tuple, comprehensions viết code Pythonic",
      "Lập trình hướng đối tượng (OOP): class, __init__, self, kế thừa, magic methods",
      "Xử lý ngoại lệ chuẩn công nghiệp: try/except/finally, Custom Exceptions",
    ],
    resources: ["[UMich - PY4E] Chương 8 - 10", "Python Official: Classes and Error Handling"],
    handsOn: "Xây dựng lớp Document và DocumentCollection hỗ trợ tìm kiếm từ khóa, quản lý tags.",
    deliverable: "document_store.py: Module OOP quản lý tài liệu văn bản và xử lý ngoại lệ file I/O",
  },
  {
    week: 3,
    month: 1,
    monthTitle: "Tháng 1: Python for AI & Nền tảng Dữ liệu",
    title: "Xử lý File I/O, Type Hinting & Pydantic V2",
    tag: "Pydantic & Validation",
    theory: [
      "Context managers (with open() as f), đọc/ghi file .json, .csv",
      "Type Hinting hiện đại (typing: List, Dict, Optional, Union, Callable)",
      "Pydantic V2: Data parsing, type enforcement, BaseModel, serialization",
    ],
    resources: ["Pydantic Docs (docs.pydantic.dev)", "[Book-ChipHuyen-AI] Chương 3"],
    handsOn: "Định nghĩa Pydantic schema cho log hội thoại (UserMessage, AssistantMessage, TokenCount) và validate file JSON đầu vào.",
    deliverable: "chat_schema_validator.py: Script kiểm tra tính hợp lệ của log hội thoại JSON",
  },
  {
    week: 4,
    month: 1,
    monthTitle: "Tháng 1: Python for AI & Nền tảng Dữ liệu",
    title: "Toán Số học, Tensors & Xử lý Dữ liệu với NumPy/Pandas",
    tag: "NumPy & Tensors",
    isMilestone: true,
    milestoneTitle: "Milestone 1: Vectorization & Data Benchmarking Suite",
    theory: [
      "Mảng nhiều chiều (ndarray): 1D (Vector), 2D (Matrix), 3D+ (Tensor)",
      "Phép toán ma trận: Dot product, Matrix Multiplication (A x B), Transpose, Broadcasting",
      "Pandas: DataFrame, Series, đọc file CSV, lọc dữ liệu, xử lý missing values",
    ],
    resources: ["[Book-Prince-UDL] Chương 2", "NumPy Quickstart Guide"],
    handsOn: "Viết phép nhân ma trận bằng vòng lặp thuần so sánh tốc độ với np.dot() để thấy sức mạnh Vectorization.",
    deliverable: "numpy_linear_algebra_bench.py: Benchmark đo tốc độ ma trận và mini-tool phân tích dữ liệu CSV",
  },

  // Tháng 2
  {
    week: 5,
    month: 2,
    monthTitle: "Tháng 2: AI & Machine Learning Fundamentals",
    title: "Bức tranh AI/ML & Toán học Cơ bản cho Machine Learning",
    tag: "ML Overview & Gradient",
    theory: [
      "Phân biệt rành mạch: AI -> Machine Learning -> Deep Learning -> Generative AI",
      "Các bài toán ML cốt lõi: Supervised (Hồi quy, Phân loại), Unsupervised (Clustering)",
      "Đạo hàm & Gradient: Trực giác hình học về hướng dốc nhất để tối ưu hàm số",
    ],
    resources: ["[DL-AI - AndrewNg] Generative AI for Everyone", "[Book-Prince-UDL] Chương 2 - 3"],
    handsOn: "Vẽ đồ thị hàm số bậc hai f(x) = x^2 - 4x + 4 và dùng thuật toán Gradient Descent tìm điểm cực tiểu bằng Python.",
    deliverable: "gradient_descent_1d.py: Script trực quan hóa quá trình cập nhật tham số tìm điểm tối ưu",
  },
  {
    week: 6,
    month: 2,
    monthTitle: "Tháng 2: AI & Machine Learning Fundamentals",
    title: "Supervised Learning, Hàm Loss & Logistic Regression",
    tag: "Loss Functions & Sigmoid",
    theory: [
      "Hàm mất mát: Mean Squared Error (MSE), Binary Cross-Entropy (BCE), Categorical Cross-Entropy",
      "Hàm kích hoạt Sigmoid & Softmax: Chuyển đầu ra tuyến tính thành xác suất P in [0, 1]",
      "Overfitting vs Underfitting: Training Error vs Validation Error, L1/L2 Regularization",
    ],
    resources: ["[DL-AI - AndrewNg] ML Specialization C1", "[Book-Prince-UDL] Chương 5"],
    handsOn: "Cài đặt thuật toán Logistic Regression bằng NumPy thuần để phân loại email Spam/Ham.",
    deliverable: "logistic_regression_from_scratch.py: Module huấn luyện mô hình phân loại nhị phân không dùng thư viện ngoài",
  },
  {
    week: 7,
    month: 2,
    monthTitle: "Tháng 2: AI & Machine Learning Fundamentals",
    title: "Mạng Nơ-ron (MLP), Lan truyền ngược & PyTorch Cơ bản",
    tag: "Neural Networks & PyTorch",
    theory: [
      "Kiến trúc Multi-Layer Perceptron (MLP): Input, Hidden, Weights (W), Biases (b)",
      "Lan truyền ngược (Backpropagation): Quy tắc chuỗi (Chain Rule) tính đạo hàm riêng của Loss",
      "Làm quen PyTorch: torch.Tensor, requires_grad=True, backward(), nn.Module, optim.AdamW",
    ],
    resources: ["[Book-Prince-UDL] Chương 6 - 7", "PyTorch 60 Minute Blitz"],
    handsOn: "Xây dựng mạng MLP 3 tầng trong PyTorch để phân loại tập dữ liệu xoắn ốc phi tuyến tính.",
    deliverable: "pytorch_mlp_classifier.py: Script huấn luyện mạng nơ-ron với PyTorch và trực quan hóa ranh giới phân loại",
  },
  {
    week: 8,
    month: 2,
    monthTitle: "Tháng 2: AI & Machine Learning Fundamentals",
    title: "Đánh giá Mô hình & Phần cứng AI Vừa Đủ cho Engineer",
    tag: "Hardware & Metrics",
    isMilestone: true,
    milestoneTitle: "Milestone 2: Hardware Inspector & Classification Metrics Suite",
    theory: [
      "Độ đo đánh giá: Accuracy, Precision, Recall, F1-Score, Confusion Matrix",
      "Phần cứng AI vừa đủ: Tại sao GPU nhanh hơn CPU hàng trăm lần trong tính ma trận",
      "Bộ nhớ: Phân biệt RAM hệ thống vs VRAM GPU, Memory Bandwidth vs Compute Bound",
      "Định dạng số thực: FP32, FP16, BF16 và khái niệm lượng tử hóa (Quantization INT8, INT4)",
    ],
    resources: ["[Book-KirkHwu-PMPP] Chương 1 - 2", "[Book-ChipHuyen-AI] Chương 7"],
    handsOn: "Viết hàm đo Confusion Matrix, Precision, Recall và script kiểm tra tài nguyên GPU NVIDIA (torch.cuda.is_available(), VRAM trống).",
    deliverable: "hardware_and_metrics_suite.py: Tool kiểm tra tài nguyên GPU và bộ tính toán chỉ số F1-Score",
  },

  // Tháng 3
  {
    week: 9,
    month: 3,
    monthTitle: "Tháng 3: LLMs & Kiến trúc Transformer",
    title: "Cơ chế Tokenization & Thuật toán Byte-Pair Encoding (BPE)",
    tag: "Tokenizers & BPE",
    theory: [
      "Tại sao máy tính không hiểu trực tiếp từ ngữ: Ký tự vs Từ vs Subwords (Token)",
      "Thuật toán Byte-Pair Encoding (BPE): Hợp nhất các cặp byte xuất hiện nhiều nhất",
      "Các token đặc biệt (<|endoftext|>, <|im_start|>) và thư viện Tiktoken, HuggingFace",
    ],
    resources: ["[Book-Raschka] Chương 2", "[HF-Courses] NLP Course Ch.2"],
    handsOn: "Tự cài đặt một BPE Tokenizer đơn giản bằng Python để mã hóa và giải mã chuỗi văn bản.",
    deliverable: "simple_bpe_tokenizer.py: Lớp Tokenizer có train(corpus), encode(text) và decode(token_ids)",
  },
  {
    week: 10,
    month: 3,
    monthTitle: "Tháng 3: LLMs & Kiến trúc Transformer",
    title: "Vector Embeddings & Không gian Ngữ nghĩa (Semantic Space)",
    tag: "Vector Embeddings",
    theory: [
      "Khái niệm Embedding: Biểu diễn token thành vector dày đặc d-chiều (d=768 hoặc 1536)",
      "Đo lường độ tương đồng: Cosine Similarity, Dot Product, Euclidean Distance",
      "Ma trận nhúng trọng số (torch.nn.Embedding) và cơ chế tra cứu vector (Embedding lookup)",
    ],
    resources: ["[Book-Raschka] Chương 2", "[MS-GenAI-Beginners] Lesson 5"],
    handsOn: "Gọi OpenAI Embeddings API để chuyển đổi các câu văn thành vector và tính toán ma trận tương đồng Cosine.",
    deliverable: "semantic_similarity_calculator.py: Ứng dụng xếp hạng độ gần nghĩa giữa câu truy vấn và các văn bản mẫu",
  },
  {
    week: 11,
    month: 3,
    monthTitle: "Tháng 3: LLMs & Kiến trúc Transformer",
    title: "Cơ chế Chú ý (Self-Attention & Multi-Head Attention)",
    tag: "Attention Engine",
    theory: [
      "Tại sao cần Attention: Giải quyết bài toán ngữ cảnh đường dài (Long-range dependencies)",
      "Bóc tách toán học: Query (Q), Key (K), Value (V), công thức Attention = softmax(QK^T / sqrt(d_k))V",
      "Causal Attention Masking (che token tương lai) và Multi-Head Attention (MHA)",
    ],
    resources: ["[Book-Raschka] Chương 3", "[Book-Prince-UDL] Chương 12"],
    handsOn: "Viết class CausalSelfAttention thuần PyTorch với ma trận mặt nạ tam giác trên (tril).",
    deliverable: "attention_mechanism_scratch.py: Module PyTorch tính toán Self-Attention và xuất Attention weights heatmap",
  },
  {
    week: 12,
    month: 3,
    monthTitle: "Tháng 3: LLMs & Kiến trúc Transformer",
    title: "Lắp ráp Khối Transformer & Chiến lược Sinh Text (Sampling)",
    tag: "Transformer Architecture",
    theory: [
      "Kiến trúc Decoder-only Transformer: Residual connections, LayerNorm/RMSNorm, Feed-Forward Network",
      "Quy trình Autoregressive Generation: LM Head -> Logits -> Softmax -> chọn token tiếp theo",
      "Chiến lược giải mã: Greedy Search, Temperature, Top-K, Top-P (Nucleus Sampling)",
    ],
    resources: ["[Book-Raschka] Chương 4", "[Book-ChipHuyen-AI] Chương 3"],
    handsOn: "Lắp ráp hoàn chỉnh một MiniGPTModel bằng PyTorch và viết hàm sinh văn bản với điều chỉnh temperature.",
    deliverable: "mini_gpt_architecture.py: File mã nguồn chứa toàn bộ kiến trúc mô hình GPT thu nhỏ từ embedding đến output",
  },
  {
    week: 13,
    month: 3,
    monthTitle: "Tháng 3: LLMs & Kiến trúc Transformer",
    title: "Làm chủ LLM API: Prompt Engineering & Structured Outputs",
    tag: "Prompting & Structured API",
    isMilestone: true,
    milestoneTitle: "Milestone 3: Production LLM Client with Strict Schema Enforcement",
    theory: [
      "Tích hợp API thực chiến: OpenAI, Gemini, Anthropic",
      "Prompt Engineering cho kỹ sư: Role-based, Few-shot, Chain-of-Thought (CoT), System prompt governance",
      "Structured Outputs: Bắt buộc LLM trả về đúng định dạng JSON tuân thủ Pydantic Schema chuẩn 100%",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 3", "OpenAI Structured Outputs Guide"],
    handsOn: "Xây dựng công cụ phân tích email khách hàng: trích xuất tên, số điện thoại, độ khẩn cấp (1-5) và cảm xúc dạng JSON.",
    deliverable: "customer_ticket_extractor.py: CLI tool kết nối LLM API trả về đối tượng JSON chuẩn hóa không bao giờ lỗi format",
  },

  // Tháng 4
  {
    week: 14,
    month: 4,
    monthTitle: "Tháng 4: Production RAG Systems",
    title: "Kiến trúc RAG Tổng quan, Chunking & pgvector",
    tag: "RAG & Vector DB",
    theory: [
      "Tại sao cần RAG: Giới hạn context window, tri thức lỗi thời và hiện tượng ảo giác (Hallucination)",
      "Luồng RAG: Ingestion -> Chunking -> Embedding -> Vector DB -> Retrieval -> Augmentation -> Generation",
      "Chiến lược cắt khúc (Chunking): Fixed-size, Recursive Character Splitting, Chunk Overlap",
      "PostgreSQL với extension pgvector: vector data type, Cosine distance, chỉ mục HNSW vs IVFFlat",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 4", "pgvector GitHub Documentation"],
    handsOn: "Dựng Docker chứa PostgreSQL + pgvector, viết script nạp tài liệu vào bảng documents kèm vector 1536 chiều.",
    deliverable: "pgvector_ingestion_pipeline.py: Script cắt nhỏ file Markdown và nạp vector vào database PostgreSQL",
  },
  {
    week: 15,
    month: 4,
    monthTitle: "Tháng 4: Production RAG Systems",
    title: "Xây dựng Retrieval Pipeline & Hybrid Search (Vector + BM25)",
    tag: "Hybrid Search",
    theory: [
      "Semantic Search: Truy vấn theo ý nghĩa bằng vector embedding",
      "Hạn chế của thuần Vector Search: Dễ bỏ sót từ khóa chính xác (mã lỗi, mã sản phẩm, tên riêng)",
      "Hybrid Search: Kết hợp Full-Text Search (BM25 / PostgreSQL tsvector) và Vector Search qua thuật toán RRF",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 4", "PostgreSQL Full Text Search Docs"],
    handsOn: "Viết câu lệnh SQL kết hợp ts_rank của PostgreSQL và khoảng cách vector Cosine để tìm kiếm tài liệu chuẩn xác nhất.",
    deliverable: "hybrid_retriever.py: Lớp Search Engine hỗ trợ truy vấn đồng thời ngữ nghĩa và từ khóa chính xác",
  },
  {
    week: 16,
    month: 4,
    monthTitle: "Tháng 4: Production RAG Systems",
    title: "Tinh chỉnh Ngữ cảnh: Re-ranking, Context Compression & Citations",
    tag: "Re-ranking & Citations",
    theory: [
      "Hiện tượng Lost in the Middle: LLM thường bỏ sót thông tin nằm giữa đoạn context dài",
      "Cross-Encoder Re-ranking: Dùng mô hình re-ranker chấm điểm lại top 20 kết quả trước khi gửi top 3 cho LLM",
      "Kỹ thuật ép LLM trích dẫn nguồn (Citations): Trả về câu trả lời kèm [Source: File, Page/Chunk ID]",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 4", "Cohere Rerank API Best Practices"],
    handsOn: "Xây dựng prompt RAG chuyên nghiệp có hướng dẫn chống bịa đặt (hallucination) và trích dẫn nguồn tài liệu minh bạch.",
    deliverable: "rag_qa_engine.py: Module nhận câu hỏi, tự động truy xuất tài liệu, re-rank và sinh câu trả lời kèm trích dẫn nguồn",
  },
  {
    week: 17,
    month: 4,
    monthTitle: "Tháng 4: Production RAG Systems",
    title: "Đánh giá RAG (Evaluation), Phân biệt RAG vs Fine-Tuning (LoRA)",
    tag: "RAG Evals & LoRA",
    isMilestone: true,
    milestoneTitle: "Milestone 4: Automated RAG Benchmark & Evaluation Suite",
    theory: [
      "Đo lường chất lượng RAG bằng RAG Triad: Faithfulness, Answer Relevance, Context Precision",
      "Đánh giá tự động bằng phương pháp LLM-as-a-judge (dùng GPT-4o chấm điểm câu trả lời)",
      "So sánh chiến lược: Khi nào nên dùng RAG, khi nào cần Fine-Tuning (LoRA / QLoRA)?",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 5 - 6", "[Book-Raschka] Chương 6"],
    handsOn: "Viết script kiểm thử tự động: Đưa vào 10 câu hỏi test, dùng LLM chấm điểm xem câu trả lời RAG có khớp với tài liệu gốc không.",
    deliverable: "rag_evaluator.py: Bộ kiểm thử tự động đo lường độ chính xác và trung thực của hệ thống RAG",
  },

  // Tháng 5
  {
    week: 18,
    month: 5,
    monthTitle: "Tháng 5: AI Agents, Workflows & MCP",
    title: "Bản chất của AI Agent & Mô hình Tư duy ReAct",
    tag: "AI Agents & ReAct",
    theory: [
      "Khác biệt cốt lõi: Chatbot (chỉ nói) vs AI Agent (hành động để giải quyết vấn đề)",
      "Chu trình ReAct: Thought (Suy nghĩ) -> Action (Gọi công cụ) -> Observation (Nhận kết quả) -> Reflection",
      "Nguyên tắc an toàn then chốt: LLM không bao giờ truy cập trực tiếp OS; mã Python của bạn mới là bên thực thi",
    ],
    resources: ["[HF-Courses] AI Agents Course Unit 1", "[UCB-Agents] Lectures 1 - 2"],
    handsOn: "Tự viết vòng lặp ReAct bằng Python thuần: cung cấp cho LLM công cụ tra cứu thời tiết và máy tính toán học.",
    deliverable: "pure_python_react_agent.py: Agent tối giản tự động suy nghĩ và gọi công cụ ngoài để giải quyết bài toán",
  },
  {
    week: 19,
    month: 5,
    monthTitle: "Tháng 5: AI Agents, Workflows & MCP",
    title: "Quản lý Trạng thái Đồ thị với LangGraph",
    tag: "LangGraph StateGraph",
    theory: [
      "Tại sao chuỗi tuyến tính (Chains) thất bại: Cần vòng lặp, rẽ nhánh điều kiện và kiểm soát trạng thái",
      "Khái niệm cốt lõi LangGraph: State, Nodes, Edges, Conditional Edges và Reducers (operator.add)",
      "Cơ chế tự sửa lỗi (Self-Correction): Cho phép Agent tự kiểm tra kết quả và lặp lại nếu chưa đạt yêu cầu",
    ],
    resources: ["LangGraph Official Documentation", "team.py codebase"],
    handsOn: "Dựng StateGraph 3 node: draft_response -> review_quality -> nếu đạt thì kết thúc, nếu lỗi thì quay lại viết lại.",
    deliverable: "self_correcting_agent.py: Agent viết văn bản có khả năng tự chấm điểm và tự sửa bài viết đến khi đạt chuẩn",
  },
  {
    week: 20,
    month: 5,
    monthTitle: "Tháng 5: AI Agents, Workflows & MCP",
    title: "Tác tử có Con người Tham gia (HITL) & Checkpointing",
    tag: "Human-in-the-Loop",
    theory: [
      "Rủi ro của Runaway AI: Tại sao không được để Agent tự do xóa database hay chuyển tiền mà không kiểm duyệt",
      "Kỹ thuật interrupt() trong LangGraph: Tạm dừng đồ thị, trả quyền điều khiển cho người dùng",
      "Checkpointer bền bỉ: Lưu trạng thái vào SQLite / PostgreSQL để có thể tắt máy và resume phiên làm việc hôm sau",
    ],
    resources: ["LangGraph Docs: Human-in-the-loop & Persistence", "run_task.py codebase"],
    handsOn: "Xây dựng Agent chuyển tiền giả lập: Khi số tiền > $1000, Agent buộc phải tạm dừng hỏi xác nhận [Y/N] trên Terminal.",
    deliverable: "hitl_banking_agent.py: Ứng dụng Agent an toàn có điểm dừng phê duyệt của con người và lưu checkpoint SQLite",
  },
  {
    week: 21,
    month: 5,
    monthTitle: "Tháng 5: AI Agents, Workflows & MCP",
    title: "Hệ thống Đa Tác tử (Multi-Agent Swarms) & Tam quyền Phân lập",
    tag: "Multi-Agent Swarms",
    theory: [
      "Kiến trúc Multi-Agent: Phân chia vai trò chuyên biệt thay vì dùng 1 Agent làm tất cả",
      "Mô hình Fan-out & Fan-in: Kích hoạt đồng thời 2 Worker chạy song song trên 2 luồng độc lập rồi tổng hợp kết quả",
      "Tam quyền phân lập (Separation of Concerns): Phân định giữa Agent sinh nội dung và Agent kiểm thử độc lập",
      "Nguyên tắc đặc quyền tối thiểu (Least Privilege): Giới hạn thư mục và quyền ghi",
    ],
    resources: ["[UCB-Agents] Multi-Agent Collaboration", "build_team_description.md"],
    handsOn: "Xây dựng quy trình 2 Agent: CodeWriter (viết code Python) và CodeReviewer (soi lỗi cú pháp và bảo mật) tương tác với nhau.",
    deliverable: "dual_agent_code_pair.py: Hệ thống 2 Agent phối hợp tự động tạo ra hàm Python đạt chuẩn unit test",
  },
  {
    week: 22,
    month: 5,
    monthTitle: "Tháng 5: AI Agents, Workflows & MCP",
    title: "Chuẩn giao tiếp Model Context Protocol (MCP)",
    tag: "MCP Protocol",
    isMilestone: true,
    milestoneTitle: "Milestone 5: Production MCP Server for Autonomous Tool Calling",
    theory: [
      "Model Context Protocol (MCP): Chuẩn giao tiếp nguồn mở do Anthropic khởi xướng đang dẫn đầu toàn ngành",
      "Vấn đề MCP giải quyết: Cung cấp giao thức chung chuẩn hóa cho Resources, Prompts, và Tools",
      "Xây dựng MCP Server bằng Python và kết nối với MCP Client",
    ],
    resources: ["modelcontextprotocol.io Docs", "Anthropic Developer Guides: MCP with Python"],
    handsOn: "Viết một MCP Server bằng Python cung cấp công cụ đọc tài liệu nội bộ và cho phép LLM Client truy vấn dữ liệu.",
    deliverable: "custom_mcp_server.py: MCP Server chạy độc lập, export 2 tool chuẩn và phản hồi các request theo chuẩn MCP JSON-RPC",
  },

  // Tháng 6
  {
    week: 23,
    month: 6,
    monthTitle: "Tháng 6: Serving, Deployment & Capstone Platform",
    title: "Tối ưu Suy luận & Phục vụ Mô hình (vLLM & KV Cache)",
    tag: "Inference & Serving",
    theory: [
      "Chi phí suy luận thực tế: Prefill phase vs Decode phase trong quá trình sinh token",
      "Cơ chế lưu bộ nhớ tạm KV Cache và thuật toán PagedAttention của vLLM",
      "Continuous Batching: Gom nhiều request người dùng vào cùng một lượt chạy GPU",
      "Quyết định kiến trúc: Khi nào gọi API đám mây, khi nào tự host mô hình mã nguồn mở",
    ],
    resources: ["[Book-ChipHuyen-AI] Chương 7", "vLLM Paper: PagedAttention"],
    handsOn: "Cài đặt Ollama hoặc vLLM trên Google Colab / máy local, đo lường tốc độ sinh token (tokens/sec) và độ trễ (TTFT).",
    deliverable: "serving_benchmark.py: Script benchmark gửi đồng thời 5 request đến model server và đo độ trễ trung bình",
  },
  {
    week: 24,
    month: 6,
    monthTitle: "Tháng 6: Serving, Deployment & Capstone Platform",
    title: "Giám sát Hệ thống (Observability), Chi phí & Bảo mật LLM",
    tag: "Observability & Security",
    theory: [
      "Tracing sâu với Langfuse hoặc OpenTelemetry: Theo dõi cây gọi lệnh, độ trễ và số token tiêu thụ",
      "Quản trị chi phí (Cost Management): Tính toán tiền token theo từng user/tính năng, thiết lập ngân sách",
      "Bảo mật ứng dụng LLM: Phòng chống Prompt Injection, rò rỉ System Prompt, kiểm soát PII",
    ],
    resources: ["Langfuse Official Docs", "OWASP Top 10 for LLM Applications"],
    handsOn: "Tích hợp Langfuse SDK vào script FastAPI để tự động ghi log mọi lượt gọi LLM và theo dõi trực quan trên Dashboard.",
    deliverable: "secure_traced_backend.py: FastAPI endpoint có middleware kiểm tra Prompt Injection và tự động gửi trace về Langfuse",
  },
  {
    week: 25,
    month: 6,
    monthTitle: "Tháng 6: Serving, Deployment & Capstone Platform",
    title: "Đóng gói Docker, Ephemeral Sandboxing & Thiết kế Hệ thống",
    tag: "Docker & Sandboxing",
    theory: [
      "Đóng gói Backend Python + AI App bằng Docker (multi-stage builds, tối ưu layer cache)",
      "Docker Compose: Thiết lập mạng ảo nội bộ nối Backend, PostgreSQL (pgvector) và Redis",
      "Ephemeral Sandboxing: Chạy code AI sinh ra trong container tạm thời (docker run --rm) tự động dọn dẹp để bảo vệ host",
    ],
    resources: ["Docker Documentation", "tools.py codebase (run_docker_harness)"],
    handsOn: "Viết file docker-compose.yml khởi chạy đồng thời Backend FastAPI và database pgvector.",
    deliverable: "docker-compose.yml: File cấu hình triển khai cụm dịch vụ AI hoàn chỉnh chỉ bằng một lệnh docker compose up -d",
  },
  {
    week: 26,
    month: 6,
    monthTitle: "Tháng 6: Serving, Deployment & Capstone Platform",
    title: "Hoàn thiện Dự án Tốt nghiệp (Capstone Platform) & Đánh giá Năng lực",
    tag: "Capstone Project",
    isMilestone: true,
    milestoneTitle: "Final Milestone: Production AI Knowledge & Autonomous Agent Platform",
    theory: [
      "Ghép nối toàn bộ các thành phần đã tích lũy trong 6 tháng thành sản phẩm hoàn chỉnh: AI Knowledge & Autonomous Agent Platform",
      "Kiểm thử toàn trình (End-to-End Integration Test): Đảm bảo giao diện người dùng, backend API, RAG và Agent chạy trơn tru",
      "Tổng kết và tự đánh giá năng lực dựa trên bảng Checklist chuẩn công nghiệp",
    ],
    resources: ["Toàn bộ kho tài liệu 26 tuần", "Mã nguồn dự án Capstone"],
    handsOn: "Triển khai hoàn chỉnh toàn bộ hệ thống Capstone Platform kết nối Frontend Next.js, Backend FastAPI, pgvector và LangGraph.",
    deliverable: "Capstone Platform: Sản phẩm Portfolio đẳng cấp sẵn sàng phỏng vấn vị trí Senior AI Software Engineer",
  },
];
