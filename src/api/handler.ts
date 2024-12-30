import { http ,HttpResponse} from 'msw';

interface Document {
  type: string;
  title: string;
  position: number;
}

const initialData: Document[] = [
  { type: 'bank-draft', title: 'Bank Draft', position: 0 },
  { type: 'bill-of-lading', title: 'Bill of Lading', position: 1 },
  { type: 'invoice', title: 'Invoice', position: 2 },
  { type: 'bank-draft-2', title: 'Bank Draft 2', position: 3 },
  { type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4 },
];

const STORAGE_KEY = 'documents';

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
}

const getStoredDocuments = (): Document[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : initialData;
};

const saveStoredDocuments = (data: Document[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const handlers = [
  http.get('/api/documents',  (req: any, res: any, ctx: any) => {
    const documents =  getStoredDocuments();
    return HttpResponse.json(documents)
  }),

  http.post('/api/documents', async ({request}:{request:any}) => {
    const updatedData = await request.json()
    saveStoredDocuments(updatedData);
    return HttpResponse.json(updatedData)
  }),
];

export { handlers };
