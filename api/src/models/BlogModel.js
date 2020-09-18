// @flow
import { BaseModel } from './BaseModel';

export const BLOG_COLLECTION_NAME = 'blogs';
/**
 * Blog collection
 *
 * @swagger
 *
 * definitions:
 *   BlogModel:
 *     allOf:
 *       - $ref: '#/definitions/BaseModel'
 *       - required:
 *         - _id
 *         - version
 */
export interface BlogModel extends BaseModel {

}
