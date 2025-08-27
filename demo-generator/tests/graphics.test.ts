import { GraphicsService } from '../services/graphics';

describe('GraphicsService', () => {
  let service: GraphicsService;
  
  beforeEach(() => {
    service = new GraphicsService();
  });
  
  afterEach(async () => {
    if (service) {
      await service.close();
    }
  });
  
  it('should compile and instantiate', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(GraphicsService);
  });
  
  it('should have initBrowserPool method', () => {
    expect(service.initBrowserPool).toBeDefined();
    expect(typeof service.initBrowserPool).toBe('function');
  });
  
  it('should have close method', () => {
    expect(service.close).toBeDefined();
    expect(typeof service.close).toBe('function');
  });
});