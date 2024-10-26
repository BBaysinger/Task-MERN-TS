import { Request } from "express";
import { IUser } from "models/userModel";
import { IncomingHttpHeaders } from "http"; // Import IncomingHttpHeaders

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// Mock headers
export class MockHeaders implements IncomingHttpHeaders {
  'content-type'?: string;
  'set-cookie'?: string[];
  // Index signature to satisfy the IncomingHttpHeaders interface
  [key: string]: string | string[] | undefined;

  // Constructor to initialize properties
  constructor(initialHeaders?: { [key: string]: string | string[] }) {
    // Initialize default properties
    this['content-type'] = typeof initialHeaders?.['content-type'] === 'string'
      ? initialHeaders['content-type']
      : 'application/json';

    this['set-cookie'] = Array.isArray(initialHeaders?.['set-cookie'])
      ? initialHeaders['set-cookie']
      : [];

    // Initialize other headers from initialHeaders if provided
    if (initialHeaders) {
      for (const key in initialHeaders) {
        if (initialHeaders.hasOwnProperty(key)) {
          this[key] = initialHeaders[key];
        }
      }
    }
  }

  append = [];
  delete = [];
  get = [];
  has = [];
  set = [];
  getSetCookie = [];
  setCookie = [];
  values = [];
};

// Mock body
export class MockRequestBody {
  locked: boolean;
  cancel: boolean;

  constructor() {
    this.locked = false;
    this.cancel = false;
  }

  getReader = jest.fn();
  pipeThrough = jest.fn();
  pipeTo = jest.fn();
  tee = jest.fn();
  bodyUsed = false;
  arrayBuffer = jest.fn();
  blob = jest.fn();
  formData = jest.fn();
  json = jest.fn();
  text = jest.fn();
};

// Helper function to create a mock request
const createMockRequest = (user?: IUser): AuthenticatedRequest => {
  const req: Partial<Request> = {
    user,
    params: {},
    query: {},
    body: new MockRequestBody(),
    headers: new MockHeaders(),
    method: "GET",
    originalUrl: "/tasks",
  };

  return req as AuthenticatedRequest;
};

export default createMockRequest;