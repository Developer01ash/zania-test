export const loadDocuments = async (): Promise<any[]> => {
  const response = await fetch('/api/documents');
  return response.json();
};
export const loadDocument = async (): Promise<any[]> => {
  const response = await fetch('/api/document');
  return response.json();
};

export const saveDocuments = async (documents: any[]): Promise<void> => {
  await fetch('/api/documents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(documents),
  });
};
