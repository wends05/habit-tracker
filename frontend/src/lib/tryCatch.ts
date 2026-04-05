export type TryCatchResult<TData, TError = unknown> =
	| {
		data: TData;
		error: null;
		success: true;
	}
	| {
		data: null;
		error: TError;
		success: false;
	};

type TryCatchErrorHandler<TError> = (error: unknown) => TError;

export async function tryCatch<TData, TError = unknown>(
	fn: () => TData | Promise<TData>,
	onError?: TryCatchErrorHandler<TError>,
): Promise<TryCatchResult<TData, TError>> {
	try {
		const data = await Promise.resolve(fn());
		console.log("Data", data);
		return { data, error: null, success: true };
	} catch (error) {
		return { data: null, error: onError ? onError(error) : (error as TError), success: false };
	}
}
