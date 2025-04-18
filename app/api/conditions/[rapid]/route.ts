import Airtable from 'airtable';
import { NextResponse } from 'next/server';

interface RouteContext {
  params: {
    rapid: string;
  };
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { rapid } = context.params;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      throw new Error('Missing Airtable configuration');
    }

    const base = new Airtable({ apiKey }).base(baseId);

    // Query conditions for this rapid, sorted by date descending
    const records = await base('conditions')
      .select({
        filterByFormula: `Rapid = '${rapid}'`,
        sort: [{ field: 'Date', direction: 'desc' }],
        maxRecords: 100
      })
      .firstPage();

    // Transform records to match our frontend format
    const updates = records.map(record => ({
      id: record.id,
      name: record.get('Email') as string,
      date: (record.get('Date') as string).split('T')[0],
      message: record.get('Notes') as string
    }));

    return NextResponse.json({ updates });
  } catch (error) {
    console.error('Error fetching conditions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conditions: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 