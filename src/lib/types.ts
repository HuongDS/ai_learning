export interface GitHubRepoItem {
  name: string;
  fullName: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
  readmeSnippet?: string;
}

export interface DispatchData {
  id: string;
  issueNumber: string;
  date: string;
  timestamp: number;
  headline: string;
  tag: string;
  quote: string;
  keyTakeaway: string;
  hotRepo: {
    name: string;
    description: string;
    url: string;
    stars: string;
    forks: string;
    whyItMatters: string;
    howToTry: string[];
  };
  otherTopRepos?: Array<{
    name: string;
    url: string;
    stars: string;
    description: string;
    highlight: string;
  }>;
  microChallenge: {
    title: string;
    task: string;
    expectedOutcome: string;
  };
  generatedBy: "openai_gpt4o" | "curated_fallback";
}
