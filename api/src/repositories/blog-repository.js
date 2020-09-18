// @flow
import { ObjectId } from 'mongodb';
import BaseRepository from '@repositories/base-repository';
import { BLOG_COLLECTION_NAME, BlogModel } from '@models/BlogModel';
import type { CreateBlogRequest, UpdateBlogRequest } from '@models/requests/Blog.requests';
import Logger from '@utils/logger';

const logger = new Logger('BlogRepository');

class BlogRepository extends BaseRepository {

	async fetch(): Promise<BlogModel[]> {
		const client = await this.getMongoClient();
		return client.collection(BLOG_COLLECTION_NAME).find({ isDeleted: { $ne: true } }).toArray();
	}

	async get(blogID: string): Promise<BlogModel> {
		const client = await this.getMongoClient();
		return client.collection(BLOG_COLLECTION_NAME).findOne({ _id: new ObjectId(blogID), isDeleted: { $ne: true } });
	}

	async create(payload: CreateBlogRequest): Promise<{ _id: string }> {
		const client = await this.getMongoClient();
		const response = await client.collection(BLOG_COLLECTION_NAME).insertOne(payload);
		logger.info('Blog created');

		return response.insertedId;
	}

	async update(blogID: string, payload: UpdateBlogRequest): Promise<BlogModel> {
		const client = await this.getMongoClient();
		const query = {
			_id: new ObjectId(blogID)
		};

		if (!global['isFromEvent'] && payload.version) {
			const version = payload.version;
			delete payload.version;
			query.version = version;
		}

		await client.collection(BLOG_COLLECTION_NAME)
		.updateOne(
			query,
			{
				$set: { ...payload },
				$inc: { version: 1 }
			},
		);

		return client.collection(BLOG_COLLECTION_NAME).findOne({ _id: new ObjectId(blogID) });
	}

	async delete(id: string) {
		const client = await this.getMongoClient();
		logger.info('Deleting blog');
		return client.collection(BLOG_COLLECTION_NAME).updateOne({ _id: new ObjectId(id) }, {
			$set: {
				isDeleted: true,
				deletedAt: new Date().getTime(),
				},
			$inc: { version: 1 }
		});
	}
}
export default new BlogRepository();
