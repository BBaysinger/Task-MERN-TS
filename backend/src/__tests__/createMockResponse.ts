import { Response } from "express";
import { Application, ParamsDictionary, Request } from "express-serve-static-core";
import { Socket } from "net";
import { ParsedQs } from "qs";

// Mock response headers
class MockResponseHeaders {
  headers: { [key: string]: string | string[] | undefined } = {};

  getHeader(name: string): string | string[] | undefined {
    return this.headers[name.toLowerCase()];
  }

  setHeader(name: string, value: string | string[]): void {
    this.headers[name.toLowerCase()] = value;
  }

  removeHeader(name: string): void {
    delete this.headers[name.toLowerCase()];
  }
}

// Mock response body
class MockResponseBody {
  body: any;
  statusCode: number;

  constructor() {
    this.body = null;
    this.statusCode = 200;
  }

  send(data: any) {
    this.body = data;
    return this as unknown as Response;
  }

  json(data: any) {
    this.body = data;
    return this as unknown as Response;
  }

  status(code: number) {
    this.statusCode = code;
    return this as unknown as Response;
  }
}

// Mock response
export class MockResponse extends MockResponseBody implements Partial<Response> {
  headers: MockResponseHeaders;
  app: Application<Record<string, any>>;
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
  statusMessage: string;
  strictContentLength: boolean;
  chunkedEncoding: boolean;

  constructor() {
    super();
    this.headers = new MockResponseHeaders();
    this.app = {} as Application<Record<string, any>>;
    this.req = {} as Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
    this.statusMessage = ""; // Set default value to an empty string
    this.strictContentLength = false; // Set default value to false
    this.chunkedEncoding = false; // Set default value to false
  }

  // Implementing commonly used Response methods
  getHeader = (name: string) => this.headers.getHeader(name);

  setHeader = (name: string, value: string | number | readonly string[]) => {
    this.headers.setHeader(name, value as string | string[]);
    return this as unknown as Response;
  };

  removeHeader = (name: string) => {
    this.headers.removeHeader(name);
    return this as unknown as Response;
  };

  // Additional methods from Response that might be used in tests
  sendStatus = (code: number) => {
    this.statusCode = code;
    return this as unknown as Response;
  };

  links = jest.fn();
  jsonp = jest.fn();
  sendFile = jest.fn();
  redirect = jest.fn();
  render = jest.fn();
  locals = {};
  sendfile = jest.fn();
  download = jest.fn();
  contentType = jest.fn();
  type = jest.fn();
  format = jest.fn();
  attachment = jest.fn();
  set = jest.fn();
  header = jest.fn();
  get = jest.fn();
  headersSent = false;
  clearCookie = jest.fn();
  cookie = jest.fn();
  location = jest.fn();
  charset = "";
  vary = jest.fn();
  init = jest.fn();
  append = jest.fn();
  assignSocket = jest.fn();
  detachSocket = jest.fn();
  writeContinue = jest.fn();
  writeEarlyHints = jest.fn();
  writeHead = jest.fn();
  writeProcessing = jest.fn();
  shouldKeepAlive: boolean = false;
  sendDate: boolean = false;
  useChunkedEncodingByDefault: boolean = false;
  finished: boolean = false;
  connection: Socket | null = null;
  socket: Socket | null = null;
  setTimeout = jest.fn();
  setHeaders = jest.fn();
  appendHeader = jest.fn();
  getHeaders = jest.fn();
  getHeaderNames = jest.fn();
  hasHeader = jest.fn();
  addTrailers = jest.fn();
  flushHeaders = jest.fn();
  writable = false;
  writableEnded = false;
  writeableFinished = false;
  writeableLength = 0;
  writeableCorked = 0;
  writeableUncorked = false;
  writeableEncoding = "";
  writeableHighWaterMark = 0;
  writableFinished = false;
  writableCorked: number = 0;
  writableHighWaterMark: number = 0;
  writableLength: number = 0;
  writableObjectMode: boolean = false;
  destroyed: boolean = false;
  closed: boolean = false;
  errored: Error | null = null;
  writableNeedDrain: boolean = false;
  _write = jest.fn();
  _destroy = jest.fn();
  _final = jest.fn();
  write = jest.fn();
  setDefaultEncoding = jest.fn();
  end = jest.fn();
  cork = jest.fn();
  uncork = jest.fn();
  destroy = jest.fn();
  addListener = jest.fn();
  emit = jest.fn();
  on = jest.fn();
  once = jest.fn();
  prependListener = jest.fn();
  prependOnceListener = jest.fn();
  removeListener = jest.fn();
  pipe = jest.fn();
  compose = jest.fn();
  off = jest.fn();
  removeAllListeners = jest.fn();
  setMaxListeners = jest.fn();
  getMaxListeners = jest.fn();
  listeners = jest.fn();
  rawListeners = jest.fn();
  listenerCount = jest.fn();
  eventNames = jest.fn();
}

// Helper function to create a mock response
const createMockResponse = (): MockResponse => {
  return new MockResponse();
};

export default createMockResponse;