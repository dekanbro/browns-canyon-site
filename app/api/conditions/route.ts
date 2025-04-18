import Airtable from 'airtable';
import { NextResponse } from 'next/server';

interface ConditionPayload {
  email: string;
  notes: string;
  rapid: string;
  date: string;
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      throw new Error('Missing Airtable configuration');
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const payload: ConditionPayload = await req.json();

    if (!payload.email || !payload.notes || !payload.rapid) {
      return NextResponse.json(
        { error: 'Email, notes, and rapid are required' },
        { status: 400 }
      );
    }

    // Add debug logging
    console.log('Creating condition record with:', {
      baseId,
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      payload
    });

    const result = await base('conditions').create([
      {
        fields: {
          Email: payload.email,
          Notes: payload.notes,
          Rapid: payload.rapid,
          Date: new Date(payload.date || new Date()).toISOString().split('T')[0]
        }
      }
    ]);

    console.log('Airtable response:', result);

    return NextResponse.json(
      { message: 'Successfully added condition', record: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Condition submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit condition: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 