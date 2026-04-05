import { BACKEND_URL } from "@/constants/env";
import { tryCatch } from "@/lib/tryCatch";

type QueryValue = string | number | boolean | null | undefined;

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
	authToken?: string | null;
	body?: BodyInit | Record<string, unknown> | undefined;
	headers?: HeadersInit;
	query?: Record<string, QueryValue>;
};

export class ApiError extends Error {
	status: number;
	code?: string;
	responseBody?: unknown;

	constructor(status: number, message: string, code?: string, responseBody?: unknown) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.code = code;
		this.responseBody = responseBody;
	}
}

function getApiBaseUrl() {

	if (!BACKEND_URL) {
		throw new Error("Missing EXPO_PUBLIC_API_URL");
	}

	return BACKEND_URL.replace(/\/$/, "");
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
	const apiBaseUrl = getApiBaseUrl();
	const url = new URL(path.startsWith("http") ? path : `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`);

	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value === null || value === undefined) {
				continue;
			}

			url.searchParams.set(key, String(value));
		}
	}

	return url.toString();
}

function getErrorMessage(errorBody: unknown, fallback: string) {
	if (typeof errorBody === "string" && errorBody.length > 0) {
		return errorBody;
	}

	if (typeof errorBody === "object" && errorBody !== null) {
		const message = (errorBody as { message?: unknown }).message;
		if (typeof message === "string" && message.length > 0) {
			return message;
		}
	}

	return fallback;
}

function isJsonBody(body: ApiRequestOptions["body"]) {
	if (!body) {
		return false;
	}

	return typeof body === "object" && !(body instanceof FormData) && !(body instanceof Blob) && !(body instanceof ArrayBuffer);
}

function normalizeHeaders(headers?: HeadersInit) {
	return new Headers(headers);
}

async function parseResponse(response: Response) {
	if (response.status === 204) {
		return null;
	}

	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
}

async function parseErrorResponse(response: Response) {
	const contentType = response.headers.get("content-type") ?? "";

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
	return tryCatch<T, ApiError>(
		async () => {
			const { authToken, body, headers, query, ...requestInit } = options;
			const requestHeaders = normalizeHeaders(headers);

			if (authToken) {
				requestHeaders.set("Authorization", `Bearer ${authToken}`);
			}

			if (isJsonBody(body) && !requestHeaders.has("Content-Type")) {
				requestHeaders.set("Content-Type", "application/json");
			}

			const response = await fetch(buildUrl(path, query), {
							...requestInit,
							headers: requestHeaders,
							body: isJsonBody(body) ? JSON.stringify(body) : (body as BodyInit | undefined),
						});

			if (!response.ok) {
				const errorBody = await parseErrorResponse(response);
				const message = getErrorMessage(errorBody, `Request failed with status ${response.status}`);
				const code =
					typeof errorBody === "object" && errorBody !== null && "code" in errorBody
						? String((errorBody as { code?: unknown }).code)
						: undefined;

				throw new ApiError(response.status, message, code, errorBody);
			}

			return (await parseResponse(response)) as T;
		},
		(error) =>
			error instanceof ApiError
				? error
				: new ApiError(0, error instanceof Error ? error.message : "Request failed", undefined, error),
	);
}
