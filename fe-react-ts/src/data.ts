import { Article, Category, HistoryEntry, SavedEntry, TrendingArticle } from "./types";

export const INITIAL_CATEGORIES: Category[] = [
  { id: "ai-ml", name: "AI & ML", slug: "ai-ml" },
  { id: "web-dev", name: "Web Dev", slug: "web-dev" },
  { id: "hardware", name: "Hardware", slug: "hardware" },
  { id: "cybersecurity", name: "Cybersecurity", slug: "cybersecurity" },
  { id: "data-science", name: "Data Science", slug: "data-science" },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "blockchain-zk",
    title: "Zero-Knowledge Proofs in Enterprise Systems",
    excerpt: "Implementing privacy-preserving protocols without compromising regulatory compliance in banking infrastructure.",
    content: "Enterprise systems are increasingly requiring auditability alongside strict privacy. Zero-Knowledge Proofs (ZKPs) allow parties to verify transactions without exposing underlying sensitive variables, marking a major evolution in corporate ledger consensus protocols.",
    categoryId: "cybersecurity",
    readTime: "8 MIN READ",
    date: "OCT 24, 2024",
    author: {
      name: "Dr. Helena Vance",
      role: "CRYPTOGRAPHY LEAD",
      avatar: "HV"
    },
    coverImage: "blockchain",
    tags: ["#CRYPTOGRAPHY", "#ZK_PROOFS", "#COMPLIANCE", "#FINTECH"],
    stats: { views: "14.2K", shares: 42, comments: 24 }
  },
  {
    id: "hardware-arm",
    title: "ARM vs x86: The ISA Transition in 2024",
    excerpt: "Analyzing the energy efficiency gains and performance bottlenecks in the latest silicon architectures.",
    content: "The battle between Instruction Set Architectures (ISAs) has entered a crucial density threshold. We analyze microarchitecture changes, branch predictors, cache access latency, and energy scaling limits under raw benchmarking loads.",
    categoryId: "hardware",
    readTime: "12 MIN READ",
    date: "OCT 22, 2024",
    author: {
      name: "Markus Thon",
      role: "HARDWARE SYSTEMS ENGINEER",
      avatar: "MT"
    },
    coverImage: "motherboard",
    tags: ["#ARM", "#X86", "#ARCHITECTURE", "#SILICON"],
    stats: { views: "18.5K", shares: 62, comments: 45 }
  },
  {
    id: "llm-quant",
    title: "LLM Optimization: Quantization Techniques Explained",
    excerpt: "How 4-bit and 8-bit quantization is democratizing access to large-scale generative models on consumer hardware.",
    content: "Large language models typically demand substantial GPU memory. By compressing high-precision FP32 parameters down to INT8 or INT4 configurations, we can run trillion-parameter scale networks with minimal impact on semantic benchmarks.",
    categoryId: "ai-ml",
    readTime: "15 MIN READ",
    date: "OCT 20, 2024",
    author: {
      name: "Sarah J. Miller",
      role: "SENIOR ML ENGINEER",
      avatar: "SM"
    },
    coverImage: "neural-network",
    tags: ["#ML_OPTIMIZATION", "#QUANTIZATION", "#EDGE_AI", "#LLM"],
    stats: { views: "24.9K", shares: 142, comments: 234 }
  },
  {
    id: "latency-optimization",
    title: "Optimizing Latency in High-Density Neural Architectures",
    excerpt: "Selective sparsity masks during quantization phase reduces inference latency by up to 42% on transformer architectures.",
    content: `The current landscape of deep learning is shifting from model complexity toward execution efficiency. As we deploy trillion-parameter models into edge environments, the "bottleneck" is no longer just compute power, but the latency inherent in the data-shuttling between cache layers.

In our recent experiments at TECH_LABS, we discovered that by applying a selective sparsity mask during the quantization phase, we could reduce inference latency by up to 42% without a statistically significant drop in F1 scores. This approach relies on what we term "Neural Pruning of Redundant Pathing."

## Execution Logic Implementation

The implementation requires a custom kernel to handle the sparse matrix multiplication efficiently. Below is a simplified snippet of how the logic gates are calculated within our internal framework:`,
    categoryId: "ai-ml",
    readTime: "14 MIN",
    date: "OCT 24, 2024",
    author: {
      name: "Dr. Aris Thorne",
      role: "Senior ML Architect @ TECH_LABS",
      avatar: "AT"
    },
    coverImage: "headshot",
    tags: ["#PYTORCH", "#NEURAL_NETS", "#LATENCY", "#OPTIMIZATION"],
    stats: { views: "12.4K", shares: 142, comments: 89 }
  },
  {
    id: "edge-deployment",
    title: "Architecting Large Language Models for Edge Deployment",
    excerpt: "Analysis of quantization techniques and pruned architectures for running transformer models on low-power hardware.",
    content: "Deploying deep models requires stripping out redundant parameter pathing and using highly specialized kernels designed to operate layout-sparsely.",
    categoryId: "ai-ml",
    readTime: "10 MIN READ",
    date: "OCT 24, 2024",
    author: {
      name: "Dr. Aris Thorne",
      role: "Senior ML Architect",
      avatar: "AT"
    },
    tags: ["#LLM", "#EDGE_AI", "#HARDWARE"],
    stats: { views: "14.3K" }
  },
  {
    id: "zero-trust",
    title: "Zero-Trust Protocol Implementation in Cloud-Native Environments",
    excerpt: "A deep dive into identity-based perimeter security and automated policy enforcement across distributed microservices.",
    content: "Peripheral firewall defenses are no longer sufficient. Authenticating every service packet internally with dynamic crypto certificates prevents cross-lateral pivoting.",
    categoryId: "cybersecurity",
    readTime: "11 MIN READ",
    date: "OCT 24, 2024",
    author: {
      name: "Dr. Helena Vance",
      role: "Cryptography Lead",
      avatar: "HV"
    },
    tags: ["#ZERO_TRUST", "#SECURITY", "#CLOUD_NATIVE"],
    stats: { views: "9.5K" }
  },
  {
    id: "web-assembly",
    title: "The Evolution of WebAssembly in Browser Runtimes",
    excerpt: "Exploring performance benchmarks of C++ and Rust compiled modules versus traditional JavaScript engines.",
    content: "WebAssembly brings compile-time performance characteristics securely to the web sandbox, delivering dense fluid computational physics canvas capability.",
    categoryId: "web-dev",
    readTime: "9 MIN READ",
    date: "OCT 23, 2024",
    author: {
      name: "Sarah J. Miller",
      role: "Senior Systems Dev",
      avatar: "SM"
    },
    tags: ["#WASM", "#RUST", "#PERFORMANCE"],
    stats: { views: "12.2K" }
  },
  {
    id: "semiconductor-fab",
    title: "Next-Gen Semiconductor Fabrication: 2nm and Beyond",
    excerpt: "A technical review of Extreme Ultraviolet (EUV) lithography advancements.",
    content: "Transitioning to smaller node dimensions requires double-patterning EUV configurations alongside nanosheet configurations to bypass quantum tunneling issues.",
    categoryId: "hardware",
    readTime: "16 MIN READ",
    date: "OCT 22, 2024",
    author: {
      name: "Markus Thon",
      role: "Hardware Architect",
      avatar: "MT"
    },
    tags: ["#SEMICONDUCTOR", "#NANO", "#EUV"],
    stats: { views: "15.0K" }
  },
  // Saved View Specific Articles
  {
    id: "v8-engine",
    title: "Optimizing V8 Engine Performance for Large-Scale Concurrent Processing",
    excerpt: "An in-depth analysis of memory allocation patterns and garbage collection cycles in high-throughput Node.js environments. This research explores the boundaries of the event loop under extreme pressure.",
    content: "V8 memory mechanics rely on dynamic generation sweeps. Minimizing early allocation footprints and avoiding closure traps maintains smooth event loop cycles under continuous networking pressure.",
    categoryId: "web-dev",
    readTime: "9 MIN READ",
    date: "APR 12, 2024",
    author: {
      name: "DR. ELARA VANCE",
      role: "Senior Systems Architect",
      avatar: "EV"
    },
    tags: ["#V8", "#ENGINEERING", "#CONCURRENCY"],
    stats: { views: "1.2K" }
  },
  {
    id: "hybrid-cloud-zt",
    title: "Zero-Trust Architecture: Implementation in Hybrid Cloud",
    excerpt: "Strategies for maintaining identity-driven security across distributed clusters. Essential reading for infrastructure architects managing multi-region deployments.",
    content: "Implementing cross-cluster mTLS secures internal REST hooks, validating credentials on demand at all edge nodes.",
    categoryId: "cybersecurity",
    readTime: "14 MIN",
    date: "APR 10, 2024",
    author: {
      name: "Alex Rivera",
      role: "SecOps Principal",
      avatar: "AR"
    },
    tags: ["#HYBRID_CLOUD", "#ZERO_TRUST", "#REST_API"],
    stats: { views: "1.2K", shares: 42, comments: 22 }
  },
  {
    id: "pinecone-milvus",
    title: "Pinecone vs Milvus: Scale Benchmarks",
    excerpt: "Comparing performance ratios across distributed vector indexes with billions of records.",
    content: "Large language models require high-speed similarity search systems. We load-test Pinecone and Milvus to measure dynamic recall metrics under pressure.",
    categoryId: "data-science",
    readTime: "8 MIN READ",
    date: "APR 08, 2024",
    author: {
      name: "Sarah J. Miller",
      role: "Data Scientist",
      avatar: "SM"
    },
    tags: ["#VECTOR_DB", "#PINECONE", "#MILVUS"],
    stats: { views: "8.4K" }
  },
  {
    id: "rust-clap-cli",
    title: "The Anatomy of a Modern CLI: Building with Rust and Clap",
    excerpt: "How to create type-safe, lightning-fast command line interfaces that follow GNU standards.",
    content: "Rust's strict type safety combined with the declarative patterns of Clap v4 yields beautiful binary interface layers.",
    categoryId: "web-dev",
    readTime: "10 MIN READ",
    date: "JUL 24, 2024",
    author: {
      name: "SYS_ADMIN",
      role: "Admin Root",
      avatar: "SA"
    },
    tags: ["#RUST", "#CLI", "#SYSTEMS"],
    stats: { views: "25.9K", shares: 342, comments: 24 }
  }
];

export const INITIAL_HISTORY: HistoryEntry[] = [
  {
    id: "hist-1",
    article: INITIAL_ARTICLES[4], // Edge Deployment
    viewedAt: "14:32:01 UTC",
    dateGroup: "Today"
  },
  {
    id: "hist-2",
    article: INITIAL_ARTICLES[5], // Zero Trust
    viewedAt: "09:15:44 UTC",
    dateGroup: "Today"
  },
  {
    id: "hist-3",
    article: INITIAL_ARTICLES[6], // WASM
    viewedAt: "22:04:19 UTC",
    dateGroup: "Yesterday"
  },
  {
    id: "hist-4",
    article: INITIAL_ARTICLES[7], // 2nm Fab
    viewedAt: "16:50:30 UTC",
    dateGroup: "Yesterday"
  }
];

export const INITIAL_SAVED: SavedEntry[] = [
  {
    id: "save-1",
    article: INITIAL_ARTICLES[8], // V8 Engine
    savedAt: "SAVED 12.04.2024"
  },
  {
    id: "save-2",
    article: INITIAL_ARTICLES[9], // ZT Hybrid Cloud
    savedAt: "SAVED 14M AGO"
  },
  {
    id: "save-3",
    article: INITIAL_ARTICLES[10], // Pinecone vs Milvus
    savedAt: "SAVED 2D AGO"
  },
  {
    id: "save-4",
    article: INITIAL_ARTICLES[1], // ARM vs x86
    savedAt: "SAVED 5D AGO"
  },
  {
    id: "save-5",
    article: INITIAL_ARTICLES[0], // ZK Proofs
    savedAt: "SAVED 1W AGO"
  },
  {
    id: "save-6",
    article: INITIAL_ARTICLES[11], // Rust Clap CLI
    savedAt: "SAVED 3W AGO"
  }
];

export const TRENDING_ARTICLES: TrendingArticle[] = [
  {
    id: "trend-1",
    articleId: "rust-clap-cli",
    rank: "01",
    domain: "SYSTEMS",
    title: "Rust vs C++: Kernel Benchmarking Results",
    views: "12.4K",
    comments: "142"
  },
  {
    id: "trend-2",
    articleId: "v8-engine",
    rank: "02",
    domain: "FRONTEND",
    title: "Hydration vs Resumability in React 19",
    views: "8.9K",
    comments: "89"
  },
  {
    id: "trend-3",
    articleId: "zero-trust",
    rank: "03",
    domain: "OPS",
    title: "Kubernetes Anti-patterns for Scalable Apps",
    views: "7.2K",
    comments: "234"
  }
];

export const RELATED_RESEARCH = [
  {
    id: "rel-1",
    categoryId: "ai-ml",
    title: "Memory-Efficient Transformers: A New Approach",
    duration: "8 Min",
    date: "3 Days Ago"
  },
  {
    id: "rel-2",
    categoryId: "hardware",
    title: "FPGA Acceleration for Real-time Inference",
    duration: "12 Min",
    date: "1 Week Ago"
  },
  {
    id: "rel-3",
    categoryId: "web-dev",
    title: "Distributed Training Over Lossy Networks",
    duration: "20 Min",
    date: "2 Weeks Ago"
  }
];

export const DASHBOARD_ARTICLES = [
  {
    id: "#8A3F2C",
    title: "Quantum Circuit Optimization in Python",
    categoryId: "hardware",
    tags: ["HARDWARE", "QUANTUM"],
    status: "LIVE",
    views: "12.4k",
    shares: "84"
  },
  {
    id: "#4F1E9A",
    title: "Secure Protocol Implementation for IoT",
    categoryId: "cybersecurity",
    tags: ["CYBERSECURITY"],
    status: "REVIEW",
    views: "3.1k",
    shares: "12"
  },
  {
    id: "#2B7D14",
    title: "Vector Embeddings in LLM Fine-tuning",
    categoryId: "ai-ml",
    tags: ["AI & ML", "DATA"],
    status: "LIVE",
    views: "25.9k",
    shares: "342"
  }
];
