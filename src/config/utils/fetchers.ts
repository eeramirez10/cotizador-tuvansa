export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...(options?.headers || {})
    }
  });

  if (!response.ok) {

    const body = await response.json()
    const errorMessage = body['error']
 
    throw new Error(errorMessage);


  };

  const data = (await response.json()) as T;
  return data;
}


export const postFetcher = async <T>(
  url: string,
  data: unknown,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...(options?.headers || {})
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {

    const body = await response.json()
    const errorMessage = body['error']

    throw new Error(errorMessage);
  };

  const result = (await response.json()) as T;
  return result;
};

export const postFileFetcher = async <T>(
  url: string,
  file: File,
  fieldName = 'file',
  options?: RequestInit
): Promise<T> => {
  // 1) Construye el FormData
  const formData = new FormData();
  formData.append(fieldName, file);

  // 2) Prepara las cabeceras: solo auth y las que venga en options, SIN Content-Type
  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    ...(options?.headers as Record<string, string> || {}),
  };

  // 3) Lanza la petición
  const response = await fetch(url, {
    ...options,
    method: 'POST',
    headers,
    body: formData,
  });

  // 4) Manejo de errores
  if (!response.ok) {
    let errorMessage = `Error ${response.status}`;
    try {
      const body = await response.json();
      if (body.error) errorMessage = body.error;
    } catch {
      // si no viene JSON, dejamos el mensaje genérico
    }
    throw new Error(errorMessage);
  }

  // 5) Parseamos la respuesta JSON
  const result = (await response.json()) as T;
  return result;
};
