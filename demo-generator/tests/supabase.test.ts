import { supabase } from '../lib/supabase';

describe('Supabase Client', () => {
  it('should export supabase client or null', () => {
    // The client can be null if credentials are not set
    expect(supabase === null || typeof supabase === 'object').toBe(true);
  });

  it('should be importable', () => {
    expect(() => require('../lib/supabase')).not.toThrow();
  });
});