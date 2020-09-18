// @flow
import type { BlogModel } from '@models/BlogModel';
import type { CreateBlogRequest, UpdateBlogRequest } from '@models/requests/Blog.requests';
import Logger from '@utils/logger';
import blogRepository from '@repositories/blog-repository';
import { DatabaseHelper } from '@utils/database-helper';
// eslint-disable-next-line no-unused-vars
import Exception from '@exceptions/exception';

const logger = new Logger('BlogService');

class BlogService {

	// eslint-disable-next-line no-undef
	static async #exist(blogID: string) {
		const blog = await blogRepository.get(blogID);
		if (!blog) {
			logger.error(`Blog with id: ${blogID} does not exist`);
			throw new Exception(404, 'Blog not found');
		} else {
			logger.info(`Found blog with id: ${blogID}`);
		}
	}

	fetch(): Promise<BlogModel[]> {
		logger.info('Getting Blogs');
		return blogRepository.fetch();
	}

	get(blogID: string): Promise<BlogModel> {
		logger.info('Getting  blog');
		logger.debug('Getting  blog with ID:', blogID);
		return blogRepository.get(blogID);
	}

	async create(payload: CreateBlogRequest): Promise<BlogModel> {
		logger.info('Creating blog');
		logger.debug('Creating blog with payload: ', payload);
		DatabaseHelper.SetModified(payload);
		const blog: BlogModel = payload;
		blog._id = await blogRepository.create(payload);

		return blog;
	}

	async patch(blogID: string, payload: UpdateBlogRequest): Promise<BlogModel> {
		await BlogService.#exist(blogID);
		logger.info('Updating blog');
		DatabaseHelper.SetModified(payload);

		await blogRepository.update(blogID, payload);
		return this.get(blogID);
	}

	async delete(blogID: string): Promise<boolean> {
		await BlogService.#exist(blogID);
		logger.info('Deleting blog');
		await blogRepository.delete(blogID);

		return true;
	}
}

export default new BlogService();
