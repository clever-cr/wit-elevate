import Response from '../utils/Response.js';

describe('Response Helper', () => {
  const resMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('should return a success response with object data', () => {
  
    Response.succesMessage(resMock, 'Success message', { data: 'Test' }, 200);
    

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({
      status: 200,
      result: 1,  
      total: 1,  
      message: 'Success message',
      data: { data: 'Test' },
    });
  });

  it('should return a success response with array data', () => {

    Response.succesMessage(resMock, 'Success message', [{ data: 'Test' }, { data: 'More Data' }], 200);
    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith({
      status: 200,
      result: 2,  
      total: 2,  
      message: 'Success message',
      data: [{ data: 'Test' }, { data: 'More Data' }],
    });
  });

  it('should return an error response', () => {
    Response.errorMessage(resMock, 'Error message', 500);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.json).toHaveBeenCalledWith({
      status: 500,
      error: 'Error message',
    });
  });
});

