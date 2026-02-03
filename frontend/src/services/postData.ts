interface ApiResponse<TResponse> {
  data: TResponse | null;
  error: string | null;
}

export const postData = async <TResponse, TPayload>(
  path: string,
  payload: TPayload,
): Promise<ApiResponse<TResponse>> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/${path}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error: ${response.status} ${response.statusText}`,
      );
    }

    const noContent = response.status === 204;
    const data = noContent ? {} : await response.json();

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
