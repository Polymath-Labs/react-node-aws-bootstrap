// @flow

export class DatabaseHelper {

	static SetModified = (model: any) => {
		if (!model.createdAt) {
			model.createdAt = new Date().getTime();
		}

		model.modifiedAt = new Date().getTime();

		if (!model.version) {
			model.version = 1;
		}
	};
}


