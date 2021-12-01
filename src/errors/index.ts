export class ApplicationError extends Error {
    constructor(public message = 'Internal server error', public status = 500, public code = 'INTERNAL_SERVER_ERROR') {
      super();
    }
  }
  
  export class NotFoundError extends ApplicationError {
    constructor(
      public message = 'We are unable to locate requested resource',
      public status = 404,
      public code = 'NOT_FOUND',
    ) {
      super();
    }
  }
  
