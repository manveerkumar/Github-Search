import { GithubUser } from "./user.model";

export interface SearchHistory {
    id: string; // UUID
    query: string;
    timestamp: number;
    successful: boolean;
    result?: GithubUser;
  }