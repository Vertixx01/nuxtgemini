import { createClient } from '@supabase/supabase-js';
import { H3Event } from 'h3';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ALLOWED_ORIGIN = process.env.WEBSITE_URL || 'https://nuxtgemini.vercel.app/';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default eventHandler(async (event: H3Event) => {
  if (NODE_ENV === 'production') {
    const origin = getHeader(event, 'origin');
    if (!origin || !origin.includes(ALLOWED_ORIGIN)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access Denied'
      });
    }
  }

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
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }
});