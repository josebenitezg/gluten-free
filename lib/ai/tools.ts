import { tool as createTool } from 'ai';
import { z } from 'zod';
import { getLocations } from '@/data/locations';

export const locationTool = createTool({
  description: 'Display information about a gluten-free location',
  parameters: z.object({
    name: z.string().describe('The name of the location to display'),
  }),
  execute: async function ({ name }) {
    const locations = await getLocations();
    const location = locations.find(loc => 
      loc.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (!location) {
      throw new Error('Location not found');
    }

    return location;
  },
});

export const tools = {
  displayLocation: locationTool,
}; 