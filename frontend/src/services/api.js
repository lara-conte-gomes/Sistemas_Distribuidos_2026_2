export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

//Requisições HTTP
export async function request(url, options, errorMessage) {
	const response = await fetch(url, options);

	if (!response.ok) {
		const error = await response.json().catch(() => null);

		throw new Error(
			typeof error?.detail === "string" ? error.detail : errorMessage,
		);
	}

	if (response.status === 204) {
		return null;
	}

	const text = await response.text();

	return text ? JSON.parse(text) : null;
}
