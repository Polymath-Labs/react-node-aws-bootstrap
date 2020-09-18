/**
 * @swagger
 *
 * definitions:
 *   CreateBlogRequest:
 *     type: object
 */
export interface CreateBlogRequest {
}

/**
 * @swagger
 *
 * definitions:
 *   UpdateBlogRequest:
 *     allOf:
 *       - $ref: '#/definitions/CreateBlogRequest'
 *       - properties:
 *           version:
 *             type: number
 *             minimum: 1
 *       - required:
 *         - version
 */
export interface UpdateBlogRequest extends CreateBlogRequest {
	version: number;
}
