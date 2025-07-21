import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project info:
const SUPABASE_URL: string = 'https://sybxxgekojskmecdsufe.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Ynh4Z2Vrb2pza21lY2RzdWZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzAxNzQ0MCwiZXhwIjoyMDY4NTkzNDQwfQ.2kHc5QbdOa-Hu7HGCj1D_Kgcmqe7OmdPI8f71l9H-LI'
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Ynh4Z2Vrb2pza21lY2RzdWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTc0NDAsImV4cCI6MjA2ODU5MzQ0MH0.yClx-jQrXY5LYGNgEfdI_ObYJ5Dsr4yTSfhJlKZ31s4'; // ⚠️ Keep this secret on the server only

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default supabase;
