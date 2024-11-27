import axios from 'axios';

// Helper function to safely retrieve environment variables
function getEnvVariable(name: string): string {
  const value =
    'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzIxQVAxUDVDdDc6ZGV2dS8xIiwiZXhwIjoxODI3Mjk5ODkyLCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VpZCI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9zdXBlcjphdXRoMF91c2VyL29pZGN8cGFzc3dvcmRsZXNzfGVtYWlsfDY3M2YzOGRhODM5NDdmMGI3Y2NjNDAxOSIsImh0dHA6Ly9kZXZyZXYuYWkvYXV0aDBfdXNlcl9pZCI6Im9pZGN8cGFzc3dvcmRsZXNzfGVtYWlsfDY3M2YzOGRhODM5NDdmMGI3Y2NjNDAxOSIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b19kb24iOiJkb246aWRlbnRpdHk6ZHZydi1pbi0xOmRldm8vMjFBUDFQNUN0NyIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b2lkIjoiREVWLTIxQVAxUDVDdDciLCJodHRwOi8vZGV2cmV2LmFpL2RldnVpZCI6IkRFVlUtMSIsImh0dHA6Ly9kZXZyZXYuYWkvZGlzcGxheW5hbWUiOiJubm0yM2FkMDQyIiwiaHR0cDovL2RldnJldi5haS9lbWFpbCI6Im5ubTIzYWQwNDJAbm1hbWl0LmluIiwiaHR0cDovL2RldnJldi5haS9mdWxsbmFtZSI6Ik5ubTIzYWQwNDIiLCJodHRwOi8vZGV2cmV2LmFpL2lzX3ZlcmlmaWVkIjp0cnVlLCJodHRwOi8vZGV2cmV2LmFpL3Rva2VudHlwZSI6InVybjpkZXZyZXY6cGFyYW1zOm9hdXRoOnRva2VuLXR5cGU6cGF0IiwiaWF0IjoxNzMyNjkxODkyLCJpc3MiOiJodHRwczovL2F1dGgtdG9rZW4uZGV2cmV2LmFpLyIsImp0aSI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yMUFQMVA1Q3Q3OnRva2VuLzNTeHBhYmFCIiwib3JnX2lkIjoib3JnX0FBZmQ4YjBqY3NvbG1ocVkiLCJzdWIiOiJkb246aWRlbnRpdHk6ZHZydi1pbi0xOmRldm8vMjFBUDFQNUN0NzpkZXZ1LzEifQ.UxhQjcYqMZ9rRuwI9vxG9w73G60ngED09ysOve0f49zvav5x0PtQVo-_mkh36a-kutCTWXJmOhlTgMoLv2fgCC_Gon-CQieuyTBBksxIXqkG7AavZ_S1Ill4ay73j2ymrVzMyzdrBEDfsJEl9TkqGJosPBSmqBImOQkHJcAhIl2ZlONOexrojOLJx2P8KiAy2UP5lBjVXY9_34PKxkKNaduU_fW57ciMKNJuRNPD0-jKcoonoTti-VcXpNc076DazdmH9yyweTwyQGBrHZ6C8ViFybpVieJr1xpG-99I0U2wNM4bCMxe7Q8OKevrhcP5yc5JhIaPClFKAfnZCaDshQ';

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }
  return value;
}

// Fetch closed-won opportunities within a specific timeframe
// Function to fetch closed-won opportunities (mock data version)
async function fetchClosedWonOpportunities(timeframe: string): Promise<any[]> {
  // Mock data for testing (replace with actual mock data for your use case)
  const mockData = [
    {
      id: 1,
      value: 1000,
      account: { name: 'Account A' },
      status: 'closed_won',
      timeframe: timeframe,
    },
    {
      id: 2,
      value: 2000,
      account: { name: 'Account B' },
      status: 'closed_won',
      timeframe: timeframe,
    },
    {
      id: 3,
      value: 1500,
      account: { name: 'Account C' },
      status: 'closed_won',
      timeframe: timeframe,
    },
  ];

  try {
    // Simulate a delay similar to an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return the mock data instead of making an actual API request
    console.log('Fetched mock opportunities:', mockData);
    return mockData;
  } catch (error: any) {
    console.error('Error fetching opportunities:', error?.message);
    throw new Error('Failed to fetch opportunities');
  }
}

// Summarize the fetched opportunities
function summarizeOpportunities(opportunities: any[]): {
  totalRevenue: number;
  dealCount: number;
  topAccounts: string[];
} {
  const totalRevenue = opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0);
  const dealCount = opportunities.length;
  const topAccounts = opportunities
    .sort((a, b) => (b.value || 0) - (a.value || 0))
    .slice(0, 3)
    .map((opp) => opp.account?.name || 'Unknown Account');

  return { totalRevenue, dealCount, topAccounts };
}

// Main handler for the sales_summary function
export const handler = async (event: { inputs: { timeframe: string } }) => {
  const { timeframe } = event.inputs;

  try {
    console.log(`Fetching opportunities for timeframe: ${timeframe}`);

    // Fetch opportunities
    const opportunities = await fetchClosedWonOpportunities(timeframe);
    console.log('Fetched opportunities:', opportunities);

    if (!opportunities.length) {
      console.log('No opportunities found for the specified timeframe.');
      return;
    }

    // Summarize data
    const summary = summarizeOpportunities(opportunities);
    console.log('Generated summary:', summary);

    // No Slack posting, just log the summary
    console.log('Sales summary generated successfully!');
  } catch (error) {
    console.error('Handler error:', error);
  }
};
