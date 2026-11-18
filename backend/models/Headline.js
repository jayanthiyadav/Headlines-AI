const supabase = require('../config/supabase');

const Headline = {
  async create(headlineData) {
    const { data, error } = await supabase
      .from('headlines')
      .insert([{
        prompt: headlineData.prompt,
        headline: headlineData.headline
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('headlines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};

module.exports = Headline;