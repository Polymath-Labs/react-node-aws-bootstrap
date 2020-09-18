// @flow
import { Router } from 'express';
import blogService from '@services/blog-service';
import { GetRouteParam } from '@utils/router-helpers';
import Logger from '@utils/logger';
import ExceptionParser from '@exceptions/exception-parser';

const router = new Router({ mergeParams: true });
export const BLOG_ID_ROUTE_PARAM = ':blogID';

const logger = new Logger('BlogRouter');

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Return list of Blogs
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: List of Blogs
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/BlogModel'
 */
router.get('/', async (request, response) => {
	try {
		const blogs = await blogService.fetch();
		return response.json(blogs);
	} catch (exception) {
		logger.error('Failed to fetch Blogs', exception);
		return response.status(500).send();
	}
});

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new Blog
 *     tags:
 *       - Blogs
 *     parameters:
 *       - name: payload
 *         description: Blog object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/CreateBlogRequest'
 *     responses:
 *       201:
 *         description: Created Blog
 *         schema:
 *           $ref: '#/definitions/BlogModel'
 */
router.post('/', async (request, response) => {
	try {
		const blog = await blogService.create(request.body);
		return response.json(blog);
	} catch (exception) {
		logger.error('Failed to create blog', exception);
		const error = ExceptionParser.toJson(exception);
		return response.status(error.code).json(error);
	}
});

/**
 * @swagger
 * /blogs/{blogID}:
 *   parameters:
 *     - name: blogID
 *       in: path
 *       required: true
 *       type: string
 *   get:
 *     summary: Return requested Blog
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: Requested Blog
 *         schema:
 *           $ref: '#/definitions/BlogModel'
 */
router.get(`/${BLOG_ID_ROUTE_PARAM}`, async (request, response) => {
	try {
		const blog = await blogService.get(GetRouteParam(request.params, BLOG_ID_ROUTE_PARAM));
		return response.json(blog);
	} catch (exception) {
		logger.error('Failed to get blog', exception);
		const error = ExceptionParser.toJson(exception);
		return response.status(error.code).json(error);
	}
});


/**
 * @swagger
 * /blogs/{blogID}:
 *   parameters:
 *     - name: blogID
 *       in: path
 *       required: true
 *       type: string
 *   patch:
 *     parameters:
 *       - name: payload
 *         description: Blog object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/UpdateBlogRequest'
 *     summary: Update Blog
 *     tags:
 *       - Blogs
 *     responses:
 *       200:
 *         description: Updated Blog
 *         schema:
 *           $ref: '#/definitions/BlogModel'
 */
router.patch(`/${BLOG_ID_ROUTE_PARAM}`, async (request, response) => {
  try {
		const blog = await blogService.patch(
			GetRouteParam(request.params, BLOG_ID_ROUTE_PARAM),
			request.body
		);
		return response.json( blog);
  } catch (exception) {
		logger.error('Failed to patch blog', exception);
		const error = ExceptionParser.toJson(exception);
		return response.status(error.code).json(error);
  }
});

/**
 * @swagger
 * /blogs/{blogID}:
 *   parameters:
 *     - name: blogID
 *       in: path
 *       required: true
 *       type: string
 *   delete:
 *     summary: Delete Blog
 *     tags:
 *       - Blogs
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 */
router.delete(`/${BLOG_ID_ROUTE_PARAM}`, async (request, response) => {
	try {
		await blogService.delete(
			GetRouteParam(request.params, BLOG_ID_ROUTE_PARAM)
		);
		return response.status(204).send();
	} catch (exception) {
		logger.error('Failed to delete a blog', exception);
		const error = ExceptionParser.toJson(exception);
		return response.status(error.code).json(error);
	}
});

export default router;
