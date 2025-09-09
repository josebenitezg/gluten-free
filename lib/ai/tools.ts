import { tool } from 'ai';
import { z } from 'zod';
import { getLocations } from '@/data/locations';

export const locationTool = tool({
  description: 'Display information about a gluten-free location',
  inputSchema: z.object({
    name: z.string().describe('The name of the location to display'),
  }),
  execute: async function ({ name }: { name: string }) {
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