import prompts, { Answers } from 'prompts';

function isValidNumber(phoneNumber: number): boolean {
  return phoneNumber > 1;
}

export async function promptNumber(): Promise<Answers<'phoneNumber'>> {
  const response = await prompts([
    {
      type: 'number',
      name: 'phoneNumber',
      message: 'Please enter a phone number',
      validate: isValidNumber,
    },
  ]);
  return response;
}
