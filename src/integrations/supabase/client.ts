// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://duugvuzoewkptsazgfwh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1dWd2dXpvZXdrcHRzYXpnZndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzA1MzcsImV4cCI6MjA1Mzc0NjUzN30.4fdcsopPn--4yOyth2DBsyc_FCM2VjddP7aQvBNRsBM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);