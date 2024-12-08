import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default eventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const {
      id,
      personality_name, 
      personality_description, 
      personality_image_url, 
      personality_prompt, 
      username 
    } = body;

    try {
      const { data, error } = await supabase
        .from('personalities')
        .insert({
          id,
          personality_name,
          personality_description,
          personality_image_url,
          personality_prompt,
          username
        })
        .select();

      if (error) throw error;

      return { 
        message: 'Personality uploaded successfully', 
        id: data[0]?.id 
      };
    } catch (err) {
      console.error('Error inserting data', err);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to upload personality'
      });
    }
  }
});