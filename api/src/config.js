// @flow
import AWS from 'aws-sdk';

const config = {
	AWS,
	documentDB: process.env.DOCUMENT_DB_URI
};

// On AWS, AWS_EXECUTION_ENV will have a variable starting with 'AWS_Lambda_'
if (!(process.env.AWS_EXECUTION_ENV || '').includes('AWS_Lambda_')) {
	// ... we are local
	config.AWS.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION
	});
}

export default config;
