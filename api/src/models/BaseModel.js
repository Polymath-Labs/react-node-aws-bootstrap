// @flow

/**
 * @swagger
 *
 * definitions:
 *   BaseModel:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: Unique ID
 *       createdBy:
 *         type: string
 *         description: ID of user who created the record
 *       createdAt:
 *         type: number
 *         description: Timestamp when record was created
 *       modifiedBy:
 *         type: string
 *         description: ID of user who last modified the record
 *       modifiedAt:
 *         type: number
 *         description: Last modified timestamp
 *       deletedAt:
 *         type: number
 *         description: Deleted timestamp
 *       version:
 *         type: number
 *         minimum: 1
 *         description: Record version
 *
 * @param _id           mongo unique id
 * @param createdBy     user ID who created record
 * @param createdAt     timestamp when record has been created
 * @param modifiedBy    user ID who modified record
 * @param modifiedAt    timestamp of last record update
 * @param deletedAt     timestamp when record has been soft deleted
 * @param version       version of record
 */
export interface BaseModel {
	_id: string;
	createdBy: string;
	createdAt: number;
	modifiedBy: string;
	modifiedAt: number;
	deletedAt?: number;
	version: number;
}
