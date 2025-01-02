import supabase from '../utils/supabaseClient'; 

export const getCourses = async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
 
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};
