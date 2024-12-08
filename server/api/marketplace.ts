import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default eventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('personalities')
        .select('*');

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Error fetching data', err);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch personalities'
      });
    }
  }
});