export interface DevError {
  message: string;
  stack?: string;
  route?: string;
  timestamp: Date;
  browser?: string;
}