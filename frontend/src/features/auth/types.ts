export type AuthUser = {
	id: string;
	name: string;
};

export type AuthResponse = {
	token: string;
	user: AuthUser;
};

export type AuthCredentials = {
	name: string;
	password: string;
};

export type AuthFormValues = AuthCredentials;
