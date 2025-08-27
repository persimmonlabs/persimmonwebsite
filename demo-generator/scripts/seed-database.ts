import { supabase } from '../lib/supabase';
import { industryInsights } from './seed-insights';

async function seedDatabase() {
  if (!supabase) {
    console.error('Supabase client not initialized. Check your environment variables.');
    return;
  }

  console.log('Starting database seed...');
  
  try {
    // Insert industry insights
    for (const insight of industryInsights) {
      const { error } = await supabase
        .from('industry_insights')
        .upsert(insight, { onConflict: 'industry,insight_type' });
      
      if (error) {
        console.error(`Error inserting insight for ${insight.industry}:`, error.message);
      } else {
        console.log(`✓ Inserted insight: ${insight.industry} - ${insight.insight_type}`);
      }
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };