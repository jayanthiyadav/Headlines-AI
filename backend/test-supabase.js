const supabase = require('./config/supabase');

async function testConnection() {
  console.log('Testing Supabase connection...');

  const { data, error } = await supabase
    .from('headlines')
    .select('id')
    .limit(1);

  if (error) {
    console.error('Connection test failed:', error.message);
    return;
  }

  console.log('SUCCESS! Supabase PostgreSQL is connected.');
  console.log('Database query successful.');
}

testConnection();