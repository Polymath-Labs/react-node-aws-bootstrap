// @flow
import { MongoClient } from 'mongodb';
import config from '@api/config';
import Logger from '@utils/logger';

/**
 * Base repository is responsible for database operations
 */

let cachedDb = null;

const logger = new Logger('DatabaseRepository');

class BaseRepository {
	async getMongoClient() {
		if (cachedDb) {
			return cachedDb;
		}

		logger.info('Creating database connection');
		const client = await MongoClient.connect(config.documentDB, { useUnifiedTopology: true });
		cachedDb = client.db('');
		logger.info('Connected');
		return cachedDb;
	}

	convertListFromDbNaming(items: any): any {
		return (items || []).map(item => {
			item.id = item._id;
			delete item._id;
			return item;
		});
	}

	convertObjectFromDbNaming(item) {
		if (!item) {
			return null;
		}
		const { _id, ...otherProps } = item;
		return { ...otherProps, id: _id };
	}
}

export default BaseRepository;
