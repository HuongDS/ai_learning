export interface WeekCurriculum {
  week: number;
  month: number;
  monthTitle: string;
  title: string;
  theory: string[];
  readingSources: {
    title: string;
    chapter?: string;
    link?: string;
  }[];
  handsOnTasks: string[];
  deliverable: string;
}

export const CURRICULUM_PHASES = [
  {
    month: 1,
    title: "PYTHON VÀ DỮ LIỆU",
    description: "Xây nền tảng lập trình Python hiện đại, OOP, I/O, Unit testing, NumPy & Pandas.",
    weeks: [1, 2, 3, 4],
  },
  {
    month: 2,
    title: "MACHINE LEARNING VÀ DEEP LEARNING",
    description: "Hiểu bản chất hàm mất mát, Gradient Descent, Backpropagation và PyTorch training pipeline.",
    weeks: [5, 6, 7, 8],
  },
  {
    month: 3,
    title: "LLM VÀ TRANSFORMER",
    description: "Bóc tách Tokenization, Embeddings, Self-Attention (Q/K/V), Text Generation & Sampling.",
    weeks: [9, 10, 11, 12],
  },
  {
    month: 4,
    title: "AI APPLICATION ENGINEERING VÀ RAG",
    description: "FastAPI Backend, Structured Outputs, Tool calling, PostgreSQL + pgvector, Citations & Abstention.",
    weeks: [13, 14, 15, 16, 17, 18, 19, 20],
  },
  {
    month: 5,
    title: "AGENTS VÀ WORKFLOWS",
    description: "ReAct loop, LangGraph StateGraph, Human-in-the-loop Interrupt, MCP và Observability.",
    weeks: [21, 22, 23, 24],
  },
  {
    month: 6,
    title: "INFERENCE, DEPLOYMENT VÀ CAPSTONE",
    description: "Tối ưu hóa suy luận (vLLM/KV Cache), đóng gói Docker Compose và hoàn thiện Capstone Platform.",
    weeks: [25, 26],
  },
];

export const WEEKS_DATA: WeekCurriculum[] = [
  // THÁNG 1
  {
    week: 1,
    month: 1,
    monthTitle: "PYTHON VÀ DỮ LIỆU",
    title: "Python căn bản và môi trường",
    theory: [
      "Python interpreter, script, module, package",
      "Cài đặt VS Code, venv, pip, requirements.txt",
      "Biến, kiểu dữ liệu, toán tử, ép kiểu, f-string",
      "Cấu trúc điều khiển: if/elif/else, for, while, range",
      "Phân tích traceback và sửa lỗi cơ bản"
    ],
    readingSources: [
      { title: "The Python Tutorial", chapter: "Using the Python Interpreter & Informal Introduction" },
      { title: "Python Packaging Guide", chapter: "Installing Packages & Virtual Environments" }
    ],
    handsOnTasks: [
      "Khởi tạo repo python-foundations và virtual environment",
      "Viết Todo CLI v1 hỗ trợ thêm, xem, hoàn thành, xóa task",
      "Bắt ngoại lệ đầu vào rỗng và lựa chọn menu sai"
    ],
    deliverable: "Todo CLI v1 + README hướng dẫn chạy + repository chuẩn cấu trúc"
  },
  {
    week: 2,
    month: 1,
    monthTitle: "PYTHON VÀ DỮ LIỆU",
    title: "Cấu trúc dữ liệu, hàm, file và exception",
    theory: [
      "list, tuple, dict, set, slicing và comprehension",
      "Hàm, tham số mặc định, *args, **kwargs, return",
      "Module, scope, exception handling",
      "Đọc/ghi file, JSON, CSV",
      "Type hints cơ bản (typing module)"
    ],
    readingSources: [
      { title: "The Python Tutorial", chapter: "Data Structures, Modules, Input and Output, Errors" },
      { title: "Python Docs", chapter: "Typing module" }
    ],
    handsOnTasks: [
      "Refactor Todo CLI thành các module hàm tách biệt",
      "Lưu trữ dữ liệu bền vững bằng JSON, hỗ trợ import/export CSV",
      "Bắt lỗi file không tồn tại và JSON lỗi cú pháp",
      "Viết 5 test cases cho các tình huống biên"
    ],
    deliverable: "Todo CLI v2 có JSON persistence, CSV import/export, type hints"
  },
  {
    week: 3,
    month: 1,
    monthTitle: "PYTHON VÀ DỮ LIỆU",
    title: "OOP, logging và testing",
    theory: [
      "Class, object, attributes, methods, constructor",
      "Encapsulation, composition over inheritance",
      "dataclass và context manager",
      "Tách biệt Business Logic khỏi CLI presentation",
      "Logging levels (DEBUG, INFO, ERROR), unittest assertion"
    ],
    readingSources: [
      { title: "The Python Tutorial", chapter: "Classes" },
      { title: "Python Documentation", chapter: "dataclasses & unittest" }
    ],
    handsOnTasks: [
      "Thiết kế Task, TaskRepository, TodoService",
      "Tách rời tầng lưu trữ dữ liệu khỏi tầng nghiệp vụ",
      "Viết unit tests cho TodoService",
      "Tích hợp logging và vẽ sơ đồ quan hệ class"
    ],
    deliverable: "Todo CLI v3 chuẩn OOP, logging levels, unit tests và tài liệu class"
  },
  {
    week: 4,
    month: 1,
    monthTitle: "PYTHON VÀ DỮ LIỆU",
    title: "NumPy, Pandas và làm sạch dữ liệu",
    theory: [
      "NumPy ndarray, shape, dtype, vectorization và broadcasting",
      "Pandas Series, DataFrame, đọc CSV, lọc, group, aggregation",
      "Xử lý missing values, duplicate rows, sai kiểu dữ liệu",
      "Thống kê mô tả (mean, median, std) và biểu đồ cơ bản"
    ],
    readingSources: [
      { title: "NumPy Quickstart Tutorial", chapter: "The Basics" },
      { title: "Pandas Getting Started", chapter: "Intro to data structures" },
      { title: "Fabio Nelli - Python Data Analytics", chapter: "NumPy & Pandas Libraries" }
    ],
    handsOnTasks: [
      "Chọn một file CSV công khai sạch",
      "Kiểm tra missing values, duplicates và outliers",
      "Làm sạch dữ liệu, xuất CSV mới và tạo 3-5 biểu đồ thống kê"
    ],
    deliverable: "data-cleaning.ipynb + CSV đã làm sạch + Báo cáo mô tả dữ liệu"
  },

  // THÁNG 2
  {
    week: 5,
    month: 2,
    monthTitle: "MACHINE LEARNING VÀ DEEP LEARNING",
    title: "Bản đồ AI/ML và quy trình ML",
    theory: [
      "Phân biệt AI, ML, DL, Generative AI; Supervised vs Unsupervised",
      "Dataset, sample, feature, label, model, parameter",
      "Train / Validation / Test split; Training vs Inference",
      "Hiện tượng Overfitting, Underfitting và Data Leakage",
      "ML lifecycle toàn trình: Bài toán -> Dữ liệu -> Baseline -> Train -> Evaluate"
    ],
    readingSources: [
      { title: "Google Machine Learning Crash Course", chapter: "Introduction to ML, Datasets, Splits" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 1 - Introduction to Building AI Applications" }
    ],
    handsOnTasks: [
      "Chọn dataset nhỏ và xác định bài toán classification/regression",
      "Xác định features, label, phương án chia split tránh leakage",
      "Vẽ sơ đồ ML pipeline và ghi chú các cạm bẫy rò rỉ dữ liệu"
    ],
    deliverable: "Notebook mô tả dataset + Sơ đồ ML pipeline + ml-notes.md"
  },
  {
    week: 6,
    month: 2,
    monthTitle: "MACHINE LEARNING VÀ DEEP LEARNING",
    title: "Regression, classification và metrics",
    theory: [
      "Linear regression, logistic regression ở mức trực giác",
      "Classification threshold, confusion matrix (TP/FP/TN/FN)",
      "Accuracy, Precision, Recall, F1-Score; MAE, MSE, RMSE",
      "Baseline comparison, class imbalance và error analysis"
    ],
    readingSources: [
      { title: "Google ML Crash Course", chapter: "Linear/Logistic Regression, Classification" },
      { title: "scikit-learn User Guide", chapter: "Supervised Learning & Model Evaluation" }
    ],
    handsOnTasks: [
      "Huấn luyện classifier phân loại bằng scikit-learn",
      "Tính confusion matrix, precision, recall, F1",
      "Thử thay đổi ngưỡng threshold và phân tích các ca dự đoán sai"
    ],
    deliverable: "classification-baseline.ipynb + Bảng metrics + Báo cáo phân tích lỗi"
  },
  {
    week: 7,
    month: 2,
    monthTitle: "MACHINE LEARNING VÀ DEEP LEARNING",
    title: "Neural network, loss và gradient descent",
    theory: [
      "Neuron, weight, bias, hidden layers, forward pass",
      "Hàm kích hoạt: ReLU, Sigmoid, Softmax",
      "Loss function, gradient, chain rule, backpropagation trực giác",
      "Gradient descent, learning rate, epoch, batch size, optimizer",
      "Regularization và chống Overfitting"
    ],
    readingSources: [
      { title: "Google ML Crash Course", chapter: "Neural Networks" },
      { title: "PyTorch Tutorials", chapter: "Tensors, Build Neural Net, Autograd" },
      { title: "Simon Prince - Understanding Deep Learning", chapter: "Ch. 1–5 - Neural Networks & Optimization" }
    ],
    handsOnTasks: [
      "Tạo tensor và neural network nhỏ bằng PyTorch",
      "Chạy forward pass, tính loss và gọi backward() autograd",
      "Huấn luyện vài epoch và vẽ biểu đồ loss curve giảm dần"
    ],
    deliverable: "first-neural-network.ipynb + Biểu đồ loss + Ghi chú forward/loss/backward"
  },
  {
    week: 8,
    month: 2,
    monthTitle: "MACHINE LEARNING VÀ DEEP LEARNING",
    title: "PyTorch training workflow",
    theory: [
      "Tensor shape, dtype, device (CPU vs CUDA)",
      "Dataset, DataLoader, nn.Module",
      "Vòng lặp Training và Evaluation loops",
      "model.train(), model.eval(), state_dict",
      "Tách bạch data/model/training/evaluation"
    ],
    readingSources: [
      { title: "PyTorch Learn the Basics", chapter: "Datasets & DataLoaders, Optimization, Save & Load" },
      { title: "Luca Antiga - Deep Learning with PyTorch (2nd Ed)", chapter: "Ch. 1–6 - PyTorch Mechanics" }
    ],
    handsOnTasks: [
      "Viết pipeline train/evaluate chuẩn chỉnh cho dataset nhỏ",
      "Lưu checkpoint state_dict, nạp lại và chạy inference",
      "Ghi log metrics và thời gian chạy"
    ],
    deliverable: "Repository ml-foundations + Pipeline chạy lại được + README"
  },

  // THÁNG 3
  {
    week: 9,
    month: 3,
    monthTitle: "LLM VÀ TRANSFORMER",
    title: "LLM, tokenization và next-token prediction",
    theory: [
      "Phân biệt LLM thuần túy và Hệ thống Ứng dụng LLM",
      "Token, token ID, vocabulary, tokenizer, BPE/subwords",
      "Context window, prompt, completion",
      "Autoregressive generation và next-token prediction",
      "Sự khác biệt token hóa giữa tiếng Anh và tiếng Việt"
    ],
    readingSources: [
      { title: "Hugging Face LLM Course", chapter: "Ch. 1 - Introduction to Transformers & Tokenizers" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 2 - Understanding Foundation Models" },
      { title: "Hugging Face Tokenizers", chapter: "Quick Tour" }
    ],
    handsOnTasks: [
      "Tokenize 10 câu tiếng Việt và tiếng Anh",
      "So sánh số từ, ký tự và token thực tế",
      "Thử nghiệm thay đổi dấu câu; tự viết tokenizer tách từ đơn giản"
    ],
    deliverable: "tokenization-experiments.ipynb + Bảng so sánh + Ghi chú token budget"
  },
  {
    week: 10,
    month: 3,
    monthTitle: "LLM VÀ TRANSFORMER",
    title: "Embeddings và semantic search",
    theory: [
      "Embedding vector; sự khác nhau giữa embedding model và generative LLM",
      "Semantic vs lexical similarity",
      "Cosine similarity, dot product, Euclidean distance",
      "Vector dimension, semantic search và các giới hạn ngữ nghĩa"
    ],
    readingSources: [
      { title: "Google ML Crash Course", chapter: "Embeddings" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 2 - Embeddings & Representations" },
      { title: "Sentence Transformers", chapter: "Semantic Search Guide" }
    ],
    handsOnTasks: [
      "Tạo embedding cho 15-20 câu bằng API hoặc local model",
      "Tính toán ma trận Cosine similarity",
      "Nhập query, xếp hạng top câu tương đồng ngữ nghĩa",
      "Tạo các câu bẫy dễ nhầm để phân tích lỗi"
    ],
    deliverable: "embedding-search.ipynb + Demo semantic search + Ghi chú keyword vs vector"
  },
  {
    week: 11,
    month: 3,
    monthTitle: "LLM VÀ TRANSFORMER",
    title: "Transformer và self-attention",
    theory: [
      "Token embedding và positional information",
      "Query, Key, Value; scaled dot-product attention",
      "Causal attention mask, multi-head attention",
      "Residual connections, Layer Normalization",
      "Kiến trúc Decoder-only Transformer hiện đại"
    ],
    readingSources: [
      { title: "Vaswani et al. (2017)", chapter: "Attention Is All You Need §3.1, §3.2, §3.5" },
      { title: "Sebastian Raschka - Build an LLM from Scratch", chapter: "Ch. 3 - Coding Attention Mechanisms" },
      { title: "Simon Prince - Understanding Deep Learning", chapter: "Ch. 12 - Transformers" }
    ],
    handsOnTasks: [
      "Tạo tensor Q, K, V nhân tạo nhỏ bằng PyTorch",
      "Tính toán ma trận attention scores và softmax",
      "Tạo causal mask và đối chiếu kết quả có/không có mask",
      "Vẽ sơ đồ luồng dữ liệu self-attention"
    ],
    deliverable: "self-attention.ipynb + Sơ đồ Transformer + Bản giải thích toán học Q/K/V"
  },
  {
    week: 12,
    month: 3,
    monthTitle: "LLM VÀ TRANSFORMER",
    title: "Text generation và sampling",
    theory: [
      "Logits, softmax, greedy decoding",
      "Temperature, top-k, top-p (nucleus sampling)",
      "Autoregressive generation; deterministic vs stochastic",
      "Lý do cùng prompt cho output khác nhau; giới hạn đánh giá cảm tính"
    ],
    readingSources: [
      { title: "Sebastian Raschka - Build an LLM from Scratch", chapter: "Ch. 4 - Generating Text and Sampling" },
      { title: "Hugging Face LLM Course", chapter: "Generation Strategies" }
    ],
    handsOnTasks: [
      "Gọi LLM API sinh văn bản với nhiều cấu hình tham số",
      "Thử nghiệm thay đổi nhiệt độ temperature (0, 0.7, 1.5)",
      "Lưu log prompt, tham số, token counts để so sánh"
    ],
    deliverable: "generation-playground + Bảng so sánh cấu hình sinh text + Ghi chú tính tất định"
  },

  // THÁNG 4
  {
    week: 13,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "Tích hợp LLM API với backend",
    theory: [
      "HTTP request/response, JSON, REST API",
      "API key, environment variables, secrets management",
      "Model, input/output tokens, request ID, streaming SSE",
      "Timeout, retry, rate limit, error handling",
      "Provider adapter pattern; tách route, service và data access"
    ],
    readingSources: [
      { title: "OpenAI API Docs", chapter: "Text Generation & Guides" },
      { title: "FastAPI Tutorial", chapter: "Path, Query, Request Body" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 1 - Application Architecture" }
    ],
    handsOnTasks: [
      "Khởi tạo project FastAPI với /health và /chat",
      "Đọc secret từ biến môi trường .env an toàn",
      "Tạo LLMService provider adapter",
      "Mock LLM provider trong unit test suite"
    ],
    deliverable: "Repo llm-api-service + Backend FastAPI chạy ổn định + Mock test suite"
  },
  {
    week: 14,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "Prompt engineering và structured output",
    theory: [
      "System, developer, user instructions theo API",
      "Zero-shot, few-shot, constraints, examples",
      "Prompt template và versioning",
      "Structured output, JSON Schema, Pydantic validation",
      "Backend validation; không mặc định tin tưởng output của model",
      "Khái niệm mở đầu về Prompt Injection"
    ],
    readingSources: [
      { title: "OpenAI API Docs", chapter: "Structured Outputs Guide" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 5 - Prompt Engineering" }
    ],
    handsOnTasks: [
      "Xây dựng endpoint trích xuất thông tin thực thể sang JSON",
      "Định nghĩa schema chặt chẽ bằng Pydantic",
      "Validate trường thiếu, sai kiểu dữ liệu",
      "Tạo 15-20 test inputs bình thường và bẫy lỗi"
    ],
    deliverable: "Endpoint Structured Extraction + Pydantic schema + Báo cáo test lỗi"
  },
  {
    week: 15,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "Tool calling và giới hạn quyền",
    theory: [
      "Function/tool calling; model đề xuất gọi, backend thực thi",
      "Tool schema: tên, mô tả, tham số, kiểu dữ liệu",
      "Input validation, authorization, nguyên tắc Least Privilege",
      "Read-only vs write tools; idempotency; audit logging",
      "Hành động ảnh hưởng dữ liệu cần sự phê duyệt (Approval)"
    ],
    readingSources: [
      { title: "OpenAI API Docs", chapter: "Function Calling Guide" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 6 - RAG and Agents" },
      { title: "OWASP Top 10 for LLMs", chapter: "Excessive Agency & Improper Output Handling" }
    ],
    handsOnTasks: [
      "Tạo tool chỉ đọc search_documents và get_profile",
      "Tạo write action giả lập ở trạng thái pending",
      "Chỉ chuyển pending sang approved sau xác nhận người dùng",
      "Ghi audit log đầy đủ mọi lời gọi tool"
    ],
    deliverable: "Demo Tool-calling an toàn + Bảng audit log + Sequence diagram"
  },
  {
    week: 16,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "Đánh giá ứng dụng LLM",
    theory: [
      "Lý do không thể test LLM chỉ bằng 1 output mẫu",
      "Golden dataset; correctness, relevance, groundedness",
      "Human eval, deterministic checks vs model-based eval",
      "Hạn chế và cạm bẫy của LLM-as-a-judge",
      "Regression test khi đổi prompt hoặc nâng cấp model",
      "Đo lường độ trễ (latency), token usage và chi phí"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 3 - Evaluation Methodology & Ch. 4 - Evaluate AI Systems" }
    ],
    handsOnTasks: [
      "Tạo bộ 20-30 câu hỏi và output kỳ vọng (ground truth)",
      "Viết script tự động chạy qua toàn bộ test suite",
      "Tự động hóa các tiêu chí kiểm tra tất định; gắn cờ ca cần người duyệt",
      "Xuất báo cáo pass/fail, độ trễ và chi phí token"
    ],
    deliverable: "evaluation_dataset.jsonl + Script evaluation tự động + Baseline report"
  },
  {
    week: 17,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "RAG ingestion và chunking",
    theory: [
      "Kiến trúc RAG toàn trình: upload -> parse -> normalize -> chunk -> embed -> store",
      "Trích xuất văn bản PDF và các giới hạn",
      "Chunk size, overlap và tác động trực tiếp đến retrieval",
      "Document metadata: doc_id, page, chunk_id, user_id",
      "Áp dụng quyền truy cập ngay tại bước retrieval"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 6 - RAG and Agents" },
      { title: "LangChain Documentation", chapter: "Retrieval & Chunking Tutorials" }
    ],
    handsOnTasks: [
      "Chuẩn bị 5-10 file PDF/TXT tài liệu mẫu",
      "Viết parser và chunker có tham số điều chỉnh",
      "Lưu trữ chunk kèm metadata đầy đủ",
      "Kiểm tra thủ công 20 chunks để tối ưu overlap"
    ],
    deliverable: "Ingestion pipeline script + chunks.jsonl + Ghi chú chunk size/overlap"
  },
  {
    week: 18,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "PostgreSQL và pgvector",
    theory: [
      "Vector dimensions; PostgreSQL tables, primary/foreign keys, indexes",
      "pgvector vector data type và các distance operators (Cosine, L2)",
      "Exact search vs approximate nearest neighbor (HNSW, IVFFlat)",
      "Top-k retrieval, metadata filtering",
      "Bảo mật quyền sở hữu tài liệu và lọc dữ liệu đa người dùng"
    ],
    readingSources: [
      { title: "pgvector GitHub README", chapter: "Getting Started, Indexing, Filtering" },
      { title: "PostgreSQL Documentation", chapter: "Data Definition, Indexes, Queries" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 6 - Vector Databases" }
    ],
    handsOnTasks: [
      "Tạo database PostgreSQL có extension pgvector",
      "Lưu trữ embeddings và metadata vào bảng documents/chunks",
      "Viết hàm retrieve(query, top_k, user_id)",
      "Viết test case chứng minh user A không thể xem tài liệu user B"
    ],
    deliverable: "DB schema DDL + Semantic retrieval service + Test suite multi-tenant"
  },
  {
    week: 19,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "RAG answer, citations và abstention",
    theory: [
      "Quy trình Retrieval -> Context assembly -> Generation",
      "Prompting dựa trên ngữ cảnh; ánh xạ chunk về source ID",
      "Citation bắt buộc trỏ về nguồn thật, cấm model bịa nguồn",
      "Groundedness, faithfulness và cơ chế từ chối (Abstention)",
      "Nhận diện prompt injection tiềm ẩn bên trong tài liệu"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 6 - Context Assembly & Groundedness" },
      { title: "OWASP Top 10 for LLMs", chapter: "Prompt Injection & Insecure Output" }
    ],
    handsOnTasks: [
      "Xây dựng API /ask, truy xuất top-k chunks liên quan",
      "Đưa context và Source IDs vào prompt",
      "Backend xác minh citation trả về thuộc context đã gửi",
      "Test câu hỏi có bằng chứng và câu hỏi không có bằng chứng"
    ],
    deliverable: "RAG API v1 + Citations truy ngược được + Test case Abstention"
  },
  {
    week: 20,
    month: 4,
    monthTitle: "AI APPLICATION ENGINEERING VÀ RAG",
    title: "Đánh giá và tối ưu RAG",
    theory: [
      "Phân biệt Retrieval quality vs Answer quality",
      "Recall@k, Precision@k, Mean Reciprocal Rank (MRR)",
      "Correctness, relevance, faithfulness (RAG Triad)",
      "Điều chỉnh chunk size, overlap, top-k, metadata filter",
      "Khái niệm Hybrid search (BM25 + Vector) và Reranking"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 3–4 (Eval) & Ch. 6 (RAG Optimization)" },
      { title: "Sentence Transformers", chapter: "Reranking & Cross-Encoders" }
    ],
    handsOnTasks: [
      "Tạo 25-40 câu hỏi có đáp án và chunks nguồn tham chiếu",
      "Đánh giá riêng retrieval quality và answer quality",
      "So sánh ít nhất 2 cấu hình chunking / top-k",
      "Phân tích retrieval sai và chốt cấu hình tối ưu theo số liệu"
    ],
    deliverable: "RAG v1 hoàn chỉnh + Evaluation dataset + Báo cáo so sánh tối ưu"
  },

  // THÁNG 5
  {
    week: 21,
    month: 5,
    monthTitle: "AGENTS VÀ WORKFLOWS",
    title: "Agent fundamentals",
    theory: [
      "Phân biệt LLM call, deterministic workflow và autonomous agent",
      "Tool use, planning, state, stop condition",
      "Mô hình ReAct (Reason + Act) ở mức trực giác",
      "Failure modes: gọi sai tool, lặp vô tận, thiếu dữ liệu",
      "Khi nào không nên dùng agent; tại sao workflow cố định thường an toàn hơn"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 6 - Agents and Tools" },
      { title: "Hugging Face AI Agents Course", chapter: "Unit 1 - Introduction to Agents" },
      { title: "Jacob Orshalick et al. - The Developer’s Guide to AI", chapter: "Ch. 12 - From Workflows to Autonomous Agents" }
    ],
    handsOnTasks: [
      "Thiết kế luồng classify -> retrieve -> answer",
      "Xây dựng deterministic workflow trước",
      "Thêm bước LLM tự chọn giữa các tool chỉ đọc",
      "Giới hạn số bước tối đa (max_steps) và điều kiện dừng"
    ],
    deliverable: "Agent design document + Workflow graph + Demo có giới hạn bước chạy"
  },
  {
    week: 22,
    month: 5,
    monthTitle: "AGENTS VÀ WORKFLOWS",
    title: "LangGraph, state và checkpoint",
    theory: [
      "Graph, node, edge, conditional edge trong LangGraph",
      "State schema và Reducers",
      "Checkpoint, thread/session, persistence",
      "Khôi phục workflow bị gián đoạn và tách biệt logic khỏi framework"
    ],
    readingSources: [
      { title: "LangGraph Documentation", chapter: "Overview, Graph API, Persistence" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 10 - Architecture & Feedback" }
    ],
    handsOnTasks: [
      "Chuyển đổi workflow tuần 21 sang LangGraph StateGraph",
      "Khai báo State gồm: question, retrieved_docs, tool_results, final_answer",
      "Tích hợp SqliteSaver checkpoint và resume phiên",
      "Viết test cases cho các nhánh điều kiện"
    ],
    deliverable: "agent-workflow repo + Graph có state/checkpoint + Unit test suite"
  },
  {
    week: 23,
    month: 5,
    monthTitle: "AGENTS VÀ WORKFLOWS",
    title: "Human-in-the-loop và MCP",
    theory: [
      "Cơ chế interrupt, approve, reject, resume trong agent",
      "Tool contract và validation",
      "Model Context Protocol (MCP): Host, Client, Server, Tools, Resources, Prompts",
      "MCP là giao thức kết nối, không phải framework điều phối agent",
      "Nguyên tắc Least privilege, authentication và audit logging"
    ],
    readingSources: [
      { title: "LangGraph Documentation", chapter: "Human-in-the-loop & Interrupts" },
      { title: "Model Context Protocol Docs", chapter: "Introduction & Architecture" },
      { title: "The Developer’s Guide to AI", chapter: "Ch. 14 - Extending Agents with Tools (MCP)" }
    ],
    handsOnTasks: [
      "Tạo tool đọc dữ liệu giả lập",
      "Tạo write action ở trạng thái pending chờ duyệt",
      "Thêm điểm interrupt để người dùng approve/reject trên terminal/API",
      "Chỉ thực thi ghi khi có xác nhận hợp lệ",
      "Xây dựng MCP server nhỏ cung cấp tool đọc dữ liệu"
    ],
    deliverable: "Agent có Human Approval + Audit log + Demo MCP Server độc lập"
  },
  {
    week: 24,
    month: 5,
    monthTitle: "AGENTS VÀ WORKFLOWS",
    title: "Agent evaluation, reliability và observability",
    theory: [
      "Task success rate, tool-call accuracy",
      "Đánh giá toàn bộ task thay vì chỉ câu trả lời văn bản",
      "Trace, span, log (OpenTelemetry & Langfuse)",
      "Xử lý lỗi: retry, timeout, idempotency, fallback",
      "Giới hạn vòng lặp/tool calls; phát hiện tool failure",
      "Kiểm thử độ bền trước Prompt Injection bên trong agent"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 4, 6, 10 - Reliability and Feedback" },
      { title: "OpenTelemetry Docs", chapter: "Observability Primer" },
      { title: "OWASP Top 10 for LLMs", chapter: "Agent Security" }
    ],
    handsOnTasks: [
      "Tạo bộ 15-20 task đại diện đánh giá agent",
      "Đo task success rate, số lần gọi tool, latency và lỗi",
      "Thêm trace/log cho từng node và từng tool",
      "Test timeout, tool error, max steps",
      "Viết báo cáo reliability"
    ],
    deliverable: "Agent evaluation dataset/script + Reliability report + Tracing logs"
  },

  // THÁNG 6
  {
    week: 25,
    month: 6,
    monthTitle: "INFERENCE, DEPLOYMENT VÀ CAPSTONE",
    title: "Inference, hiệu năng và chi phí",
    theory: [
      "Training vs Inference; Prefill phase vs Decode phase",
      "Bản chất KV Cache và áp lực context length lên VRAM",
      "FP32, FP16, BF16, INT8, INT4; đánh đổi độ chính xác và tốc độ",
      "TTFT (Time to First Token), inter-token latency, throughput (tokens/s)",
      "Continuous batching, prompt caching, streaming",
      "API thương mại vs Self-hosted model; vai trò của serving engines như vLLM"
    ],
    readingSources: [
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 9 - Inference Optimization" },
      { title: "vLLM Documentation", chapter: "Getting Started & Serving Overview" }
    ],
    handsOnTasks: [
      "Gửi request benchmark với prompt có độ dài khác nhau",
      "Đo lường TTFT, throughput và token usage",
      "Thử nghiệm SSE streaming trả kết quả thời gian thực",
      "Viết tài liệu Architectural Decision Record (ADR): API vs Self-hosted"
    ],
    deliverable: "inference-benchmark + Bảng đo lường latency/chi phí + Tài liệu kiến trúc ADR"
  },
  {
    week: 26,
    month: 6,
    monthTitle: "INFERENCE, DEPLOYMENT VÀ CAPSTONE",
    title: "Deployment, security và hoàn thiện capstone",
    theory: [
      "Docker image, container, volume, network; Docker Compose",
      "Environment configuration, secrets, database migrations",
      "Authentication và Authorization",
      "Input validation, rate limit, upload limits",
      "Logging, health check endpoint, error handling toàn cục",
      "Unit / Integration tests và evaluation regression",
      "README, architecture diagram, demo video chuẩn portfolio"
    ],
    readingSources: [
      { title: "FastAPI Tutorial", chapter: "Bigger Applications & Testing" },
      { title: "Docker Documentation", chapter: "Get Started & Docker Compose Guide" },
      { title: "PostgreSQL Docs", chapter: "Backup & Restore" },
      { title: "Chip Huyen - AI Engineering", chapter: "Ch. 10 - AI Engineering Architecture" }
    ],
    handsOnTasks: [
      "Hoàn thiện React + TypeScript Frontend",
      "Hoàn thiện FastAPI Backend, RAG và LangGraph Agent",
      "Đóng gói toàn bộ backend, DB bằng Docker Compose",
      "Viết unit tests và integration tests",
      "Chạy toàn bộ evaluation dataset và lưu báo cáo",
      "Viết README, vẽ architecture diagram và quay demo",
      "Audit bảo mật: không commit API key hoặc data cá nhân"
    ],
    deliverable: "Capstone hoàn chỉnh chạy 1 lệnh Docker Compose + Repo sạch + Demo Video"
  }
];
